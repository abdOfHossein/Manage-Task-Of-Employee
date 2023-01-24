import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
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
    TypeOrmModule.forFeature([FileEnt]),
  ],
  providers: [
    FileRepo,
    FileService,
    HandlerError,
    TranslateService,
    HandlerService,
  ],
  exports: [FileService],
})
export class FileModule {}
