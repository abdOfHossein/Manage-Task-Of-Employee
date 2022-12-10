import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import mv from 'mv';
import path from 'path';
import { UserResponseJWTDto } from 'src/common/dtos/user.dto';
import { TypeResultFunctionEnum } from 'src/common/enums/type.result.function.enum';
import { CreateFileDto } from '../dtos/create.file.dto';
import { FindFileDto } from '../dtos/find.file.dto';
import { StatusFileEnum } from '../enums/status.file.enum';
import { FileRepo } from '../repositories/file.repository';
import { FileCuResult } from '../response/file.cu.result';
import { FileGResult } from '../response/file.g.result';

@Injectable()
export class FileService {
  constructor(private fileRepo: FileRepo) {}

  async getOneFilePublic(
    id_file: string,
    param?: TypeResultFunctionEnum,
  ): Promise<FileGResult> {
    try {
      const findFileDto: FindFileDto = { id_file };
      const fileEntity = await this.fileRepo.findOneEntity(findFileDto);
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
      throw e;
    }
  }

  async uploadFilePublic(
    user: UserResponseJWTDto,
    fileMulter: Express.Multer.File,
  ) {
    try {
      const createFileDto: CreateFileDto = {
        file: fileMulter.filename,
        type_file: fileMulter['type_file'],
        size: fileMulter.size,
        mime_type: fileMulter['mimetype'],
        created_by: user.uid,
        original: `${fileMulter.originalname}`,
        file_path: fileMulter['path'],
      };
      const fileEnt = await this.fileRepo.createEntity(createFileDto);
      return new FileCuResult(fileEnt);
    } catch (e) {}
  }

  async downloadFile(
    res: any,
    id_unq_file: string,
    languageInfo: string,
  ): Promise<any> {
    try {
      const fileEntity = await this.getOneFilePublic(
        id_unq_file,
        TypeResultFunctionEnum.ENTITY,
      );
      let tree;
      if (fileEntity.created_by) tree = fileEntity.created_by;
      if (fileEntity.user) tree = fileEntity.user;
      let filePath = path.join(
        process.cwd(),
        'master',
        fileEntity.type_file,
        tree,
        `${fileEntity.original}`,
      );
      res.sendFile(filePath);
    } catch (error) {}
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async cronjob() {
    new Promise(async (resolve, reject) => {
      const repository = this.fileRepo;
      const files = await repository.getAllFile();
      for (const file of files) {
        const oldFile = path.join(process.cwd(), file.file_path);
        let tree;
        if (file.created_by) tree = file.created_by;
        if (file.user) tree = file.user;
        let newFile = path.join(
          process.cwd(),
          'master',
          file.type_file,
          tree,
          `${file.original}`,
        );
        mv(oldFile, newFile, { mkdirp: true }, async function (err) {
          if (err) {
          } else {
            file.status = StatusFileEnum.MASTER;
            await repository.updateFileStatus(file);
          }
        });
      }
    });
  }
}
