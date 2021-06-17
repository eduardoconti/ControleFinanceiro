import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ERROR_MESSAGES } from 'src/shared/constants';

@Injectable()
export class UserLoggedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (request.body.user && request.user.userid !== request.body.user) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.USER_TOKEN_NOT_EQUALS_TO_PARAM_URL,
      );
    }
    return true;
  }
}
