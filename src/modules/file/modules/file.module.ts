import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from '../file-core/controller/file.controller';
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
  ],
  providers: [FileRepo,FileService],
  exports: [FileService],
})
export class FileModule {}
