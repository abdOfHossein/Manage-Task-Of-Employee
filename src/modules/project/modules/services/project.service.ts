import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateProjectDto } from '../dtos/create.project.dto';
import { UpdateProjectDto } from '../dtos/update.project.dto';
import { ProjectEnt } from '../entities/project.entity';
import { ProjectPageDto } from '../paginations/project.page.dto';
import { ProjectRepo } from '../repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(FileEnt)
    private dataSource: DataSource,
    private projectRepo: ProjectRepo,

  ) {}

  async createProject(createDt: CreateProjectDto, query?: QueryRunner) {
    try {
      return await this.projectRepo.createProject(createDt, query);
    } catch (e) {
      throw e;
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
