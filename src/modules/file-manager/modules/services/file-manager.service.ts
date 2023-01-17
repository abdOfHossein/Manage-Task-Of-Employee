import { Injectable } from '@nestjs/common';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFileManagerDto } from '../dtos/create.file-manager.dto';
import { FindFileManagerDto } from '../dtos/find.file-manager.dto';
import { FileManagerPageDto } from '../paginations/file-manager.page.dto';
import { FileManagerRepo } from '../repositories/file-manager.repository';

@Injectable()
export class FileManagerService {
  constructor(
    private fileManagerRepo: FileManagerRepo,
    private dataSource: DataSource,
    private handlerService: HandlerService,
  ) {}

  async createFileManager(createDt: CreateFileManagerDto, query?: QueryRunner) {
    try {
      return await this.fileManagerRepo.createFileManager(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneFileManager(
    findFileManagerDto: FindFileManagerDto,
    options?: FindOneOptions,
  ) {
    try {
      return await this.fileManagerRepo.findOneFileManager(
        findFileManagerDto,
        options,
      );
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async deleteFileManager(id_fileManager: string) {
    try {
      return await this.fileManagerRepo.deleteFileManager(id_fileManager);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
  async paginationFileManager(pageDto: FileManagerPageDto) {
    try {
      return await this.fileManagerRepo.paginationFileManager(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
