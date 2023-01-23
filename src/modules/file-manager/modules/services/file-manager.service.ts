import { Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFileManagerDto } from '../dtos/create.file-manager.dto';
import { FindFileManagerDto } from '../dtos/find.file-manager.dto';
import { UpdateFileManagerDto } from '../dtos/update.file-manager.dto';
import { FileManagerEnt } from '../entities/file-manager.entity';
import { FileManagerPageDto } from '../paginations/file-manager.page.dto';
import { FileManagerRepo } from '../repositories/file-manager.repository';

@Injectable()
export class FileManagerService extends AbstractServiceClass<
  FileManagerEnt,
  CreateFileManagerDto,
  UpdateFileManagerDto,
  FileManagerPageDto
> {
  public constructor(
    private fileManagerRepo: FileManagerRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: FileManagerEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateFileManagerDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: FileManagerEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: FileManagerEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateFileManagerDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: FileManagerEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: FileManagerPageDto) {
    throw new Error('Method not implemented.');
  }

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
