import { Controller, Inject, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @MessagePattern('auth_user')
  login(user: any) {
    return this.authService.login(user);
  }

  @MessagePattern('auth_user_check')
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
