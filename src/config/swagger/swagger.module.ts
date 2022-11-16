import { Module } from '@nestjs/common';
import { SwaggerService } from './service/swagger.service';

@Module({
  providers: [SwaggerService],
  exports: [SwaggerService],
})
export class SwaggerModule {}
