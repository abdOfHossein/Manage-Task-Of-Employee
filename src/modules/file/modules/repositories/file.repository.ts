import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepositoryClass } from 'src/common/abstract/abstract.repository.class';
import { PageDto } from 'src/common/dtos/page.dto';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFileDto } from '../dtos/create.file.dto';
import { FindFileDto } from '../dtos/find.file.dto';
import { UpdateFileDto } from '../dtos/update.file.dto';
import { FileEnt } from '../entities/file.entity';
import { StatusFileEnum } from '../enums/status.file.enum';
import { TypeFileEnum } from '../enums/type.file.enum';
import { FilePageDto } from '../paginations/file.page.dto';

export class FileRepo extends AbstractRepositoryClass<
  FileEnt,
  CreateFileDto,
  UpdateFileDto,
  FilePageDto
> {
  constructor(
    @InjectRepository(FileEnt)
    dataSource: DataSource,
    handlerService: HandlerService,
  ) {
    super(dataSource, handlerService);
  }

  _findOneEntity(
    searchDto: string,
    options?: FindOneOptions<any>,
  ): Promise<FileEnt> {
    throw new Error('Method not implemented.');
  }
  _createEntity(
    createDto: CreateFileDto,
    query?: QueryRunner,
  ): Promise<FileEnt> {
    throw new Error('Method not implemented.');
  }
  _updateEntity(
    entity: FileEnt,
    updateDto: UpdateFileDto,
    query?: QueryRunner,
  ): Promise<FileEnt> {
    throw new Error('Method not implemented.');
  }
  _deleteEntity(entity: FileEnt, query?: QueryRunner): Promise<FileEnt> {
    throw new Error('Method not implemented.');
  }
  _paginationEntity(pageDto: FilePageDto): Promise<PageDto<FileEnt>> {
    throw new Error('Method not implemented.');
  }

  async createEntity(
    createDto: CreateFileDto,
    query?: QueryRunner,
  ): Promise<FileEnt> {
    try {
      console.log(333333333333);
      console.log(createDto);

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
    id_file: string,
    options?: Record<string, any>,
  ): Promise<FileEnt> {
    const file = await this.dataSource.manager.findOne(FileEnt, {
      where: { id: id_file },
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
