/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'amit2424',
  database: 'customers',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
