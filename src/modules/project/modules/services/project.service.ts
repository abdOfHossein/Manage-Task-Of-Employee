import { Injectable } from '@nestjs/common';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { StatusReqEnum } from 'src/modules/req/modules/enums/req.enum';
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
      const req = this.dataSource.getRepository(ReqEnt).create({
        status: StatusReqEnum.OPEN,
        isDefault: true,
      });
      await this.dataSource.getRepository(ReqEnt).save(req);
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
<<<<<<< HEAD
  
  async allProjectWithIdUSer(id_user: string) {
    try {
      return await this.projectRepo.allProjectWithIdUSer(id_user);
=======

  async allProjectWithReq() {
    try {
      return await this.projectRepo.allProjectWithReq();
>>>>>>> f9fc725b7e98bd95aa8a4aa358e135b1857fcaae
    } catch (e) {
      throw e;
    }
  }
<<<<<<< HEAD
=======

>>>>>>> f9fc725b7e98bd95aa8a4aa358e135b1857fcaae
}
