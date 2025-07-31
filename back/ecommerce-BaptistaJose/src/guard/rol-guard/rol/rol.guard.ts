import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/Users/enum/role.enum';

@Injectable()
export class RolGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    const request = context.switchToHttp().getRequest()
    const user = request.user;
    const hasRole = () => roles.some(role => user.role === role);
    const valid = user?.role && hasRole()

    if(!valid){
      throw new UnauthorizedException('No tienes permiso para acceder a esta ruta')
    }

    return valid;
  }
}
