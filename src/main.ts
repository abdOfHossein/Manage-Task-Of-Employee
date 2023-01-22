import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptor/respons.interceptor';
import { SwaggerService } from './config/swagger/service/swagger.service';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const nestLogger = new NestLogger('Main_Logger');
  console.log(process.env.DB_HOST);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = app.get<SwaggerService>(SwaggerService);
  swaggerConfig.init(app);
  const port = process.env.APP_PORT || 3804;

  await app.listen(port).then(async () => {
    nestLogger.log(`Running`, 'Swagger');
    nestLogger.log(`http://127.0.0.1:${port}/api/v1`, 'Running Server');
    nestLogger.log(
      `http://127.0.0.1:${port}/${swaggerConfig.preFix}`,
      'Running Swagger',
    );
  });
}
bootstrap();
