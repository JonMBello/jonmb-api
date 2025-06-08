import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApikeyGuard } from './guards/apikey.guard';
import { ApikeyProtected } from './decorators/apikey-protected.decorator';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApikeyProtected('client')
  @UseGuards(ApikeyGuard)
  loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Headers('platform') platform: string,
  ) {
    return this.authService.login(loginUserDto, platform);
  }
}
