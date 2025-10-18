import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(request: Request) {
  const headerAuth = request.headers['authorization'];
  if (!headerAuth)
    throw new UnauthorizedException('Falta el header Authorization');

  const credentials = headerAuth.split(' ')[1];

  const [email, password] = credentials.split(':');
  if (!email || !password)
    throw new UnauthorizedException('Formato inválido: falta email o password');

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
