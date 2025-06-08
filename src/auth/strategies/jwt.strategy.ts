import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DecodedData } from '../interfaces/decoded-data.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('jwtSecret'),
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    });
  }

  // * Always returns decoded data as user, like 'req.user'
  validate(payload: DecodedData): DecodedData {
    return payload;
  }
}
