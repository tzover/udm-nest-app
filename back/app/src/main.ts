import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './transfrom.interceptor'

async function bootstrap() {
  const logger = new Logger()

  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  })

  const PORT: string = process.env.DEV_PORT || '5000'

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(PORT)
  logger.log(`Application listening on port ${PORT}`)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
