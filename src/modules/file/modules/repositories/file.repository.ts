import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateFileDto } from '../dtos/create.file.dto';
import { FindFileDto } from '../dtos/find.file.dto';
import { FileEnt } from '../entities/file.entity';
import { StatusFileEnum } from '../enums/status.file.enum';
import { TypeFileEnum } from '../enums/type.file.enum';

export class FileRepo {
  constructor(
    @InjectRepository(FileEnt)
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createDto: CreateFileDto,
    query?: QueryRunner,
  ): Promise<FileEnt> {
    try {
      console.log(333333333333);

      const fileEnt = new FileEnt();
      fileEnt.file = createDto.file;
      fileEnt.user = createDto.user;
      fileEnt.type_file = TypeFileEnum[createDto.type_file.toString()];
      fileEnt.mime_type = createDto.mime_type;
      fileEnt.file_path = createDto.file_path;
      fileEnt.size = createDto.size;
      fileEnt.original = createDto.original;
      fileEnt.status = StatusFileEnum.SUSPEND;
      console.log(4444444);
      console.log('fileEnt', fileEnt);
      if (query) return await query.manager.save(fileEnt);
      console.log(5555555555);
      const result = await this.dataSource.manager.save(fileEnt);
      console.log(666666666);
      console.log('result', result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  deleteEntity(deleteEntity: any, query?: QueryRunner): Promise<any> {
    return Promise.resolve(undefined);
  }

  async findOneEntity(
    findFileDto: FindFileDto,
    options?: Record<string, any>,
  ): Promise<FileEnt> {
    const file = await this.dataSource.manager.findOne(FileEnt, {
      where: { id: findFileDto.id_file },
    });
    if (!file)
      throw new BadGatewayException({ message: 'Event does not exits' });
    return file;
  }

  updateEntity(entity: any, updateDto: any, query?: QueryRunner): Promise<any> {
    return Promise.resolve(undefined);
  }

  async getAllFile(): Promise<FileEnt[]> {
    return await this.dataSource.manager
      .createQueryBuilder(FileEnt, 'file_manage')
      .where('file_manage.status = :status', {
        status: StatusFileEnum.SUSPEND,
      })
      .getMany();
  }

  async updateFileStatus(FileEnt: FileEnt): Promise<FileEnt> {
    return await this.dataSource.manager.save(FileEnt);
  }
}
