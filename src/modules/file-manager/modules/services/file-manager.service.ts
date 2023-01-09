import { Injectable } from '@nestjs/common';
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
  ) {}

  async createFileManager(createDt: CreateFileManagerDto, query?: QueryRunner) {
    try {
      return await this.fileManagerRepo.createFileManager(createDt, query);
    } catch (e) {
      console.log(e);
      throw e;
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
      throw e;
    }
  }

  async deleteFileManager(id_fileManager: string) {
    try {
      return await this.fileManagerRepo.deleteFileManager(id_fileManager);
    } catch (e) {
      throw e;
    }
  }
  async paginationFileManager(pageDto: FileManagerPageDto) {
    try {
      return await this.fileManagerRepo.paginationFileManager(pageDto);
    } catch (e) {
      throw e;
    }
  }
}
