import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { UsersService } from 'src/Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/Users/enum/role.enum';
import { User } from 'src/Users/enitities/users.entity';

describe('User (e2e)', () => {
  let app: INestApplication<App>;
  let authToken: string;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();         

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UsersService>(UsersService);
    const jwtService = moduleFixture.get<JwtService>(JwtService);

    jest.spyOn(userService, 'getUsers').mockImplementation(async () => {
      return Promise.resolve([
        { id: 'mock-user-id', email: 'pepito@gmail.com', role: Role.Admin }
      ] as User[]);
    });

    authToken = jwtService.sign({
      sub: 'mock-user-id',
      email: 'pepito@gmail.com',
      role: Role.Admin,
    });
  }); 

  afterEach(async () => {
    await app.close();
  });

  it('Get /users deve retornar un array de users y un status ok', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});