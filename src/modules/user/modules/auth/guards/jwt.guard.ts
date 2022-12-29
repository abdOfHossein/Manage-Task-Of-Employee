import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  //   constructor(private readonly reflector: Reflector) {
  //     super();
  //   }

  //   canActivate(context: ExecutionContext) {
  //     const allowRoleGuard = this.reflector.get<boolean>(
  //       'allowRoleGuard',
  //       context.getHandler(),
  //     );

  //     if (allowRoleGuard) {
  //       return true;
  //     }

  //     return super.canActivate(context);
  //   }
  // constructor(private reflector: Reflector) {
  //   super();
  // }

  // canActivate(context: ExecutionContext) {
  //   const allowUnauthorizedRequest = this.reflector.get<boolean>(
  //     'allowRoleGuard',
  //     context.getHandler(),
  //   );
  //   if (allowUnauthorizedRequest) {
  //     return allowUnauthorizedRequest;
  //   }
   
  //   return super.canActivate(context);
  // }
}
