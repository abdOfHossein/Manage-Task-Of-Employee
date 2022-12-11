import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as mv from 'mv'
import { join } from 'path';
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

  async uploadFilePublic(fileMulter: Express.Multer.File) {
    try {
      console.log('000000');

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
          } 
          else {
            console.log('in else');
            
            file.status = StatusFileEnum.MASTER;
            await repository.updateFileStatus(file);
          }
        });
      }
    });
  }
}
