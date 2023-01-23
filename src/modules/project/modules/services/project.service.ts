import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';
import { HandlerError } from 'src/common/class/handler.error';
import { FileEnum } from 'src/common/translate/enums/file.enum';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { TypeFileEnum } from 'src/modules/file/modules/enums/type.file.enum';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateProjectDto } from '../dtos/create.project.dto';
import { UpdateProjectDto } from '../dtos/update.project.dto';
import { ProjectEnt } from '../entities/project.entity';
import { ProjectPageDto } from '../paginations/project.page.dto';
import { ProjectRepo } from '../repositories/project.repository';

@Injectable()
export class ProjectService extends AbstractServiceClass<
  ProjectEnt,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectPageDto
> {
  public constructor(
    @InjectRepository(FileEnt)
    dataSource: DataSource,
    private projectRepo: ProjectRepo,
    handlerService: HandlerService,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }
  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: ProjectEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateProjectDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: ProjectEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: ProjectEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(role_Id: string, updateDt: UpdateProjectDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: ProjectEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: ProjectPageDto) {
    throw new Error('Method not implemented.');
  }


  async createProject(createDt: CreateProjectDto, query?: QueryRunner) {
    try {
      const file = await this.dataSource.manager.findOne(FileEnt, {
        where: { unq_file: createDt.unq_file, type_file: TypeFileEnum.PROJECT },
      });
      if (!file) {
        throw new Error(
          `${JSON.stringify({
            section: 'file',
            value: FileEnum.FILE_NOT_EXISTS,
          })}`,
        );
      }
      createDt.file = file;
      return await this.projectRepo.createProject(createDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async findOneProject(searchDto: string, options?: FindOneOptions) {
    try {
      return await this.projectRepo.findOneProject(searchDto, options);
    } catch (e) {
      throw e;
    }
  }

  async getAllProject() {
    return await this.projectRepo.getAllProject();
  }

  async updateProject(
    id_project: string,
    updateDt: UpdateProjectDto,
    query?: QueryRunner,
  ) {
    try {
      const projectEnt = await this.dataSource.manager.findOne(ProjectEnt, {
        where: {
          id: id_project,
        },
      });
      return await this.projectRepo.updateProject(projectEnt, updateDt, query);
    } catch (e) {
      throw e;
    }
  }

  async paginationProject(pageDto: ProjectPageDto) {
    try {
      return await this.projectRepo.paginationProject(pageDto);
    } catch (e) {
      throw e;
    }
  }

  async allProjectWithIdUSer(id_user: string) {
    try {
      return await this.projectRepo.allProjectWithIdUSer(id_user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async allProjectWithReq() {
    try {
      return await this.projectRepo.allProjectWithReq();
    } catch (e) {
      throw e;
    }
  }

  async deleteProject(id_projectt: string) {
    try {
      return await this.projectRepo.deleteProject(id_projectt);
    } catch (e) {
      throw e;
    }
  }
}
