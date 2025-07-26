import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from './config/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [CloudinaryModule,OrdersModule,CategoriesModule,UsersModule, ProductsModule, AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService): TypeOrmModuleOptions => {
        const config = ConfigService.get('typeorm');
         if(!config){
          throw  new Error ('No se encontró la configuración de TypeORM');
         }
         return config;
      },
  }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    JwtModule.registerAsync({
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const secret = configService.get<string>('JWT_SECRET');
 
    return {
      secret,
      signOptions: {
        expiresIn: '1h',
      },
    };
  },
})
],
  controllers: [],
  providers: [],
})
export class AppModule {}
