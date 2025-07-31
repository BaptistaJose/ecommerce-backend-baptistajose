import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Users/enitities/users.entity';
import { UsersService } from '../Users/users.service';
import { Role } from '../Users/enum/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: User = {
    id: 'iu7676-isis08-ususu880',
      name: 'pepito',
      email: 'pepito@gmail.com',
      password: '123456',
      address: 'akjgbdhajks',
      phone: '3263526',
      country: 'nasj',
      city: 'Ciudad falsa',
      orders: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.User 
  }
  const mockUsersService: Partial<UsersService> ={
    getUserByEmail: (email:string) => {
      if(email === mockUser.email){
        return Promise.resolve(mockUser)
      }
      return Promise.resolve(null)
    },
    createUser: (user: Partial<User>):  Promise<User> => Promise.resolve({
      ...mockUser,
      ...user 
    } )
  } 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService,{
        provide: UsersService,
        useValue: mockUsersService
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("register() debe crear un usuario correctamente y debe tener el rol de User", async ()=>{
        const user = await service.register({
      name: 'pepito',
      email: 'pepito23@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      address: 'akjgbdhajks',
      phone: '3263526',
      country: 'nasj',
      city: 'Ciudad falsa',
    })
    expect(user).toHaveProperty('role', Role.User)
    expect(user).toBeInstanceOf(Object)
  })
});
