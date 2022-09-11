import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'amit',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  //To configure Fastify, which is Express competitor:
  // const app = await NestFactory.create<NestFastifyApplication>(
  // AppModule,
  // new FastifyAdapter(),
  // );
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(3100);
}
bootstrap();
