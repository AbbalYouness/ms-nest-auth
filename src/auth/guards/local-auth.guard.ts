import {
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  @Inject()
  private readonly authService: AuthService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToRpc().getData();

    const user = await this.authService.validateUser(data.email, data.password);

    if (!user) {
      throw new RpcException({
        message: 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    return Boolean(user);
  }
}
