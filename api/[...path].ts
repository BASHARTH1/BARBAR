import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { AppModule } from '../backend/src/app.module';

// A single Express instance reused across warm serverless invocations.
const server = express();

// Bootstrap NestJS once and cache the promise so concurrent / subsequent
// invocations reuse the same initialized app.
let ready: Promise<void> | null = null;
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
}

// Catch-all function: Vercel routes every /api/* request here, and Nest's
// global 'api' prefix dispatches to the matching controller.
export default async function handler(req: Request, res: Response) {
  if (!ready) ready = bootstrap();
  await ready;
  server(req, res);
}
