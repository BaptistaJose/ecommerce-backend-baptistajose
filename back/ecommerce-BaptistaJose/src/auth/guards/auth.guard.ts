import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { config as dotenvConfig } from 'dotenv';
import { JwtService } from '@nestjs/jwt';
dotenvConfig({ path: './.env.development' });

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private readonly jwstService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Se requiere un token');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwstService.verify(token, {secret})
      request.user = payload;
      return true
    } catch (error) {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
