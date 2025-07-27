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
    getUserByEmail: () => Promise.resolve(mockUser),
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
});
