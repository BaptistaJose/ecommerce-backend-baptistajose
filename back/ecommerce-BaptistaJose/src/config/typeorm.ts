import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from "dotenv"
import { registerAs } from "@nestjs/config";

dotenvConfig({path: './.env.development'})

const config: DataSourceOptions = 
    {
      type: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: true,
      entities:['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.js,.ts}'],
      ssl: false,
      //dropSchema: true
      }

export const typeormConfig = registerAs("typeorm", () => config);

export const connectionSource = new DataSource(config)