import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfiguration from '../configs/app-configuration';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [
        appConfiguration,
        // verificationConfiguration,
        // tokenConfiguration,
        // i18nConfiguration,
        // securityConfiguration,
      ],
      // validationSchema: Joi.object({
      //   // APP_ENV: Joi.string()
      //   //   .valid('debug', 'test', 'release')
      //   //   .required().default('debug'),
      //   APP_NAME: Joi.string().default('no name'),
      //   APP_PORT: Joi.number().default(3000),
      //   APP_API_GLOBAL_PREFIX: Joi.string(),
      // }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
