import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { IUserFindResponse } from './interfaces/user-find-response.interface';

@Injectable()
export class AuthService {
  @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy;
  @Inject() private readonly jwtService: JwtService;

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserFindResponse> {
    const user = await this.userServiceClient
      .send('find_user_by_credentials', { email, password })
      .toPromise();

    return user.status === HttpStatus.OK ? user : null;
  }

  login(user) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
