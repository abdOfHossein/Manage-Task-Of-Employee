import { Injectable } from '@nestjs/common';
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
    private projectRepo: ProjectRepo,
    private dataSource: DataSource,
  ) {}

  async createProject(createDt: CreateProjectDto, query?: QueryRunner) {
    try {
      const file = await this.dataSource
        .getRepository(FileEnt)
        .findOne({ where: { unq_file: createDt.unq_file } });
      createDt.file = file;
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

  async updateProject(
    Project_Id: string,
    updateDt: UpdateProjectDto,
    query?: QueryRunner,
  ) {
    try {
      const projectEnt = <ProjectEnt>await this.findOneProject(Project_Id);
      const file = await this.dataSource
        .getRepository(FileEnt)
        .findOne({ where: { unq_file: updateDt.unq_file } });
      updateDt.file = file;
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
}
