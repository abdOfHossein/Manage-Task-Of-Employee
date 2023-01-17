import { BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateFileManagerDto } from '../dtos/create.file-manager.dto';
import { FindFileManagerDto } from '../dtos/find.file-manager.dto';
import { FileManagerEnt } from '../entities/file-manager.entity';
import { FileManagerMapperPagination } from '../mapper/file-manager.mapper.pagination';
import { FileManagerPageDto } from '../paginations/file-manager.page.dto';

export class FileManagerRepo {
  constructor(
    @InjectRepository(FileManagerEnt)
    private dataSource: DataSource,
  ) {}

  async createFileManager(
    createDto: CreateFileManagerDto,
    query: QueryRunner | undefined,
  ): Promise<FileManagerEnt> {
    const fileManagerEnt = new FileManagerEnt();
    fileManagerEnt.title = createDto.title;
    fileManagerEnt.destination_id = createDto.destination_id;
    fileManagerEnt.description = createDto.description;
    fileManagerEnt.files = createDto.files;
    fileManagerEnt.reciverType = createDto.reciverType;
    if (query) return await query.manager.save(fileManagerEnt);
    return await this.dataSource.manager.save(fileManagerEnt);
  }

  async findOneFileManager(
    findFileManagerDto: FindFileManagerDto,
    options?: FindOneOptions,
  ): Promise<FileManagerEnt[]> {
    const fileManager = await this.dataSource.manager
      .createQueryBuilder(FileManagerEnt, 'file_manager')
      .where(
        'file_manager.destination_id = :destination_id AND (file_manager.reciverType = :reciverType)',
        {
          destination_id: findFileManagerDto.destination_id,
          reciverType: findFileManagerDto.reciverType,
        },
      )
      .getMany();
    console.log('fileManager', fileManager);

    if (!fileManager)
      throw new BadGatewayException({ message: 'FileManager does not exits' });
    return fileManager;
  }

  async deleteFileManager(id_fileManager: string) {
    console.log('id_fileManager', id_fileManager);

    const fileManager = await this.dataSource.manager.findOne(FileManagerEnt, {
      where: { id: id_fileManager },
    });

    console.log('fileManager', fileManager);
    fileManager.delete_at = new Date();
    return await this.dataSource.manager.save(fileManager);
  }

  async paginationFileManager(
    pageDto: FileManagerPageDto,
  ): Promise<PageDto<FileManagerEnt>> {
    const queryBuilder = this.dataSource.manager.createQueryBuilder(
      FileManagerEnt,
      'file_manager',
    );
    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }
    if (pageDto.filter) {
      if (pageDto.filter.title) {
        queryBuilder.andWhere('file_manager.title LIKE :title', {
          title: `%${pageDto.filter.title}%`,
        });
      }
      if (pageDto.filter.files) {
        queryBuilder.andWhere('file_manager.files LIKE :files', {
          files: `%${pageDto.filter.files}%`,
        });
      }
      if (pageDto.filter.reciverType) {
        queryBuilder.andWhere('file_manager.reciverType LIKE :reciverType', {
          reciverType: `%${pageDto.filter.reciverType}%`,
        });
      }
    }
    if (pageDto.field) {
      const mapper = FileManagerMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${FileManagerMapperPagination[pageDto.field]}`,
        pageDto.base.order,
      );
    }
    const result = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      baseOptionsDto: pageDto.base,
      itemCount: result[1],
    });
    return new PageDto(result[0], pageMetaDto);
  }
}