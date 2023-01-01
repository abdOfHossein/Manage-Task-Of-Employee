import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  I18nMiddleware,
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { ResponseInterceptor } from './common/interceptor/respons.interceptor';
import { SwaggerService } from './config/swagger/service/swagger.service';
import { AppModule } from './modules/app/app.module';
import { JwtGuard } from './modules/user/modules/auth/guards/jwt.guard';

async function bootstrap() {
  const nestLogger = new NestLogger('Main_Logger');
  console.log(process.env.DB_HOST);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ exceptionFactory: i18nValidationErrorFactory }),
  );
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtGuard(reflector));
  app.use(I18nMiddleware);
  const swaggerConfig = app.get<SwaggerService>(SwaggerService);
  swaggerConfig.init(app);
  const port = process.env.APP_PORT || 5000;

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
