import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/login-user.entity';
import { DecodedData } from './interfaces/decoded-data.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto, platform?: string) {
    try {
      const { password, username } = loginUserDto;
      const user = await this.userModel.findOne({
        username,
        status: { $in: ['enabled', 'disabled'] },
      });
      if (!user) throw new UnauthorizedException("entity doesn't exists");
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException("entity doesn't exists");
      const isDisabled = this.validateUserDisabled(user);
      if (isDisabled) throw new UnprocessableEntityException(isDisabled);
      const now = new Date().toISOString();
      await this.userModel.updateOne(
        { _id: user._id },
        { $set: { updatedDate: now, lastLogin: now } },
      );
      return {
        isChangePasswordRequired: user.isChangePasswordRequired,
        token: this.getJWToken(platform, {
          uid: (user._id as Types.ObjectId).toHexString(),
          fullName: user.fullName,
          roles: user.roles || [],
        }),
      };
    } catch (err) {
      this.handleDBErrors(err);
    }
  }

  private getJWToken(platform: string, payload: DecodedData) {
    const token = this.jwtService.sign(payload, {
      expiresIn:
        platform === 'web'
          ? this.configService.get('jwtExpires')
          : this.configService.get('mobileJwtExpires'),
    });
    return token;
  }

  private validateUserDisabled(
    user: User,
  ): { title: string; msg: string } | boolean {
    if (user.status === 'disabled') {
      const title = 'Usuario deshabilitado';
      const msg = 'El usuario no está habilitado';
      const customError = {
        title: title,
        msg: msg,
      };
      return customError;
    }
    return false;
  }

  private handleDBErrors(err: any): never {
    if (err.code === '23505') throw new BadRequestException(err.detail);
    if (err.status === 401 || err.status === 400) {
      const error = { status: 400, code: 49, message: err.message };
      throw new BadRequestException({ error });
    }
    if (err.status === 422) {
      const error = { status: 422, code: 255, message: err.response.title };
      const details = err.response.msg;
      throw new UnprocessableEntityException({ error, details });
    }
    console.log(err);
    throw new InternalServerErrorException('Please check server logs');
  }
}
