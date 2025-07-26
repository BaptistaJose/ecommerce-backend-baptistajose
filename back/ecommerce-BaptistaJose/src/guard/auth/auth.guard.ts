import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configservice: ConfigService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    
    try{
      const payload = await this.jwtService.verify(token, {
        secret: this.configservice.get<string>('JWT_SECRET'),
      })
      request['user'] = payload;
    }catch(err){
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
      const authHeader = request.headers.authorization;
      if (!authHeader) return '';

       const [type, token] = authHeader.split(' ');
       return type === 'Bearer' ? token : '';
  }
}
