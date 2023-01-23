import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as mv from 'mv';
import { join } from 'path';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { TypeResultFunctionEnum } from 'src/common/enums/type.result.function.enum';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFileDto } from '../dtos/create.file.dto';
import { UpdateFileDto } from '../dtos/update.file.dto';
import { FileEnt } from '../entities/file.entity';
import { StatusFileEnum } from '../enums/status.file.enum';
import { FilePageDto } from '../paginations/file.page.dto';
import { FileRepo } from '../repositories/file.repository';
import { FileCuResult } from '../response/file.cu.result';
import { FileGResult } from '../response/file.g.result';

@Injectable()
export class FileService extends AbstractServiceClass<
  FileEnt,
  CreateFileDto,
  UpdateFileDto,
  FilePageDto
> {
  public constructor(
    private fileRepo: FileRepo,
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: FileEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateFileDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: FileEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: FileEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateFileDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: FileEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: FilePageDto) {
    throw new Error('Method not implemented.');
  }

  async getOneFilePublic(
    id_file: string,
    param?: TypeResultFunctionEnum,
  ): Promise<FileGResult> {
    try {
      const fileEntity = await this.fileRepo.findOneEntity(id_file);
      if (!fileEntity) {
        throw new Error(
          `${JSON.stringify({
            section: 'file',
            value: 'File Does Not Exist',
          })}`,
        );
      }
      if (param == undefined || param == TypeResultFunctionEnum.ENTITY)
        return fileEntity;
      return new FileGResult(fileEntity);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async uploadFilePublic(fileMulter: Express.Multer.File) {
    try {
      console.log('000000');
      console.log(fileMulter);

      const createFileDto: CreateFileDto = {
        file: fileMulter.filename,
        type_file: fileMulter['type_file'],
        size: fileMulter.size,
        mime_type: fileMulter['mimetype'],
        original: `${fileMulter.originalname}`,
        file_path: fileMulter['path'],
      };
      console.log(1111);

      const fileEnt = await this.fileRepo.createEntity(createFileDto);
      console.log('fileEnt', fileEnt);
      console.log(6666666);

      return new FileCuResult(fileEnt);
    } catch (e) {}
  }

  async downloadFile(
    res: any,
    unq_file: string,
    languageInfo: string,
  ): Promise<any> {
    try {
      const fileEntity = await this.getOneFilePublic(
        unq_file,
        TypeResultFunctionEnum.ENTITY,
      );

      let filePath = join(process.cwd(), 'master', `${fileEntity.original}`);
      res.sendFile(filePath);
    } catch (error) {}
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async cronjob() {
    new Promise(async (resolve, reject) => {
      const repository = this.fileRepo;
      const files = await repository.getAllFile();
      for (const file of files) {
        const oldFile = join(process.cwd(), file.file_path);
        console.log(oldFile);
        let newFile = join(process.cwd(), 'master', `${file.original}`);
        console.log(newFile);
        mv(oldFile, newFile, { mkdirp: true }, async function (err) {
          if (err) {
            console.log('here');

            console.log(err);
          } else {
            console.log('in else');

            file.status = StatusFileEnum.MASTER;
            await repository.updateFileStatus(file);
          }
        });
      }
    });
  }
}
