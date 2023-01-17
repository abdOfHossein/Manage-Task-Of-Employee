import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerError } from 'src/common/class/handler.error';
import { TranslateService } from 'src/utility/translate/translate.service';
import { FileController } from '../file-core/controller/file.controller';
import { FileEnt } from './entities/file.entity';
import { FileRepo } from './repositories/file.repository';
import { FileService } from './service/file.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    TypeOrmModule.forFeature([FileEnt])
  ],
  providers: [FileRepo,FileService,HandlerError,TranslateService],
  exports: [FileService],
})
export class FileModule {}
