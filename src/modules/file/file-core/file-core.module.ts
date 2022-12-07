import { Module } from '@nestjs/common';
import { FileModule } from '../modules/File.module';
import { FileController } from './controller/File.controller';

@Module({
  imports: [FileModule],
  controllers: [FileController],
})
export class FileCoreModule {}
