import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/loginAuth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService: Partial<AuthService> = {
    login: (credentials) => Promise.resolve('fake-jwt-token')
  };
  
   const mockUser: LoginAuthDto= {
        email: 'pepito@gmail.com',
        password: '123456',
    }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [JwtService,{provide: AuthService, useValue: mockAuthService}],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('El metodo Login() debe devolver un token para el usuario', async  () =>{
    const userLogin = await controller.login(mockUser)
    expect(userLogin).toBeDefined()
    expect(userLogin).toEqual('fake-jwt-token')
  })
});
