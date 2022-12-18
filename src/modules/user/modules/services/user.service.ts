import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { RoleTypeEnum } from 'src/modules/role/modules/enum/role.enum';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { ChangePasswordUserDto } from '../dtos/change-password.user.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { LoginUserDto } from '../dtos/login.user.dto';
import { ChangePasswordAdmin } from '../dtos/password-admin.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserEnt } from '../entities/user.entity';
import { UserPageDto } from '../paginations/user.page.dto';
import { UserRepo } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource, private userRepo: UserRepo) {}

  async createUser(createDt: CreateUserDto, query?: QueryRunner) {
    try {
      const file = await this.dataSource
        .getRepository(FileEnt)
        .findOne({ where: { unq_file: createDt.unq_file } });
      createDt.file = file;
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
      const user = await this.dataSource.getRepository(UserEnt).findOne({
        where: { username: loginUserDto.username },
      });
      console.log(user);

      if (
        !user ||
        !(await user.validatePassword(loginUserDto.password))
        //  ||  user.status == UserStatus.BLOCK
      ) {
        throw new BadRequestException('User does not exist');
      }
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
    const file = await this.dataSource
      .getRepository(FileEnt)
      .findOne({ where: { unq_file: updateDt.unq_file } });
    updateDt.file = file;
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

  async blockUser(id_user: string): Promise<UserEnt> {
    try {
      return await this.userRepo.blockUser(id_user);
    } catch (e) {
      console.log(e);
    }
  }

  async changePassword(
    id_user: UserResponseJWTDto,
    changePasswordUserDto: ChangePasswordUserDto,
  ): Promise<UserEnt> {
    console.log('x');
    return await this.userRepo.changePassword(id_user, changePasswordUserDto);
  }

  async changePasswordAdmin(    id_user: UserResponseJWTDto,
    changePasswordUserDto: ChangePasswordAdmin): Promise<UserEnt> {
    try {
      return await this.userRepo.changePasswordAdmin(id_user, changePasswordUserDto);
    } catch (error) {
      console.log("error");
      console.log(error);
      
    }
  }

}
