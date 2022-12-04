import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { RoleTypeEnum } from 'src/modules/role/modules/enum/role.enum';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserEnt } from '../entities/user.entity';
import { UserPageDto } from '../paginations/user.page.dto';
import { UserRepo } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource, private userRepo: UserRepo) {}

  async createUser(createDt: CreateUserDto, query?: QueryRunner) {
    try {
      createDt.departmentEnt = await this.dataSource
        .getRepository(DepartmentEnt)
        .findOne({ where: { id: createDt.id_department } });
      if (createDt.role_default_status === true) {
        createDt.roleEnt = await this.dataSource
          .getRepository(RoleEnt)
          .findOne({ where: { role_type: RoleTypeEnum.USER } });
      } else {
        createDt.roleEnt = await this.dataSource
          .getRepository(RoleEnt)
          .findOne({ where: { role_type: RoleTypeEnum.ADMIN } });
      }
      return await this.userRepo.createUser(createDt, query);
    } catch (e) {
      console.log(e);
      if (
        e.message.indexOf('duplicate key value violates unique constraint') == 0
      ) {
        throw new BadRequestException({ message: 'you have a duplicate key' });
      }
      throw e;
    }
  }

  //_createJwt
  async _createJwt(loginUserDto: LoginUserDto) {
    try {
      console.log(loginUserDto.username);

      const user = await this.dataSource.getRepository(UserEnt).findOne({
        where: { username: loginUserDto.username },
        // relations: { role: true },
      });
      console.log(user);

      return await this.userRepo._createJwt(user.id, user.role);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async findOneUser(searchDto: string, options?: FindOneOptions) {
    return await this.userRepo.findOneUser(searchDto, options);
  }

  async updateUser(
    User_Id: string,
    updateDt: UpdateUserDto,
    query?: QueryRunner,
  ) {
    updateDt.departmentEnt = await this.dataSource
      .getRepository(DepartmentEnt)
      .findOne({ where: { id: updateDt.id_department } });
    updateDt.roleEnt = await this.dataSource
      .getRepository(RoleEnt)
      .findOne({ where: { id: updateDt.id_role } });
    const uerEnt = <UserEnt>await this.findOneUser(User_Id);
    return await this.userRepo.updateUser(uerEnt, updateDt, query);
  }

  async paginationUser(pageDto: UserPageDto) {
    return await this.userRepo.paginationUser(pageDto);
  }
}
