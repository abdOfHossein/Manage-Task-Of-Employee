import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { RoleTypeEnum } from 'src/modules/role/modules/enum/role.enum';
import { TaskPageDto } from 'src/modules/task/modules/paginations/task.page.dto';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { ChangePasswordAdminDto } from '../dtos/change-password-admin.dto';
import { ChangePasswordUserDto } from '../dtos/change-password.user.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserEnt } from '../entities/user.entity';
import { UserStatus } from '../enum/user.status';
import { UserPageDto } from '../paginations/user.page.dto';
import { UserRepo } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo, private dataSource: DataSource) {}

  async createUser(createDto: CreateUserDto, query?: QueryRunner) {
    try {
      if (createDto.unq_file) {
        const file = await this.dataSource
          .getRepository(FileEnt)
          .findOne({ where: { unq_file: createDto.unq_file } });
        createDto.file = file;
      }
      createDto.departmentEnt = await this.dataSource
        .getRepository(DepartmentEnt)
        .findOne({ where: { id: createDto.id_department } });
      if (!createDto.id_role) {
        if (createDto.role_default_status === true) {
          const role = await this.dataSource
            .getRepository(RoleEnt)
            .findOne({ where: { role_type: RoleTypeEnum.USER } });
          createDto.roleEnt = [role];
        } else {
          const role = await this.dataSource
            .getRepository(RoleEnt)
            .findOne({ where: { role_type: RoleTypeEnum.ADMIN } });
          createDto.roleEnt = [role];
        }
      } else {
        const roles: any = [];
        for (const id_role of createDto.id_role) {
          let role = await this.dataSource.manager.findOne(RoleEnt, {
            where: { id: id_role },
          });
          roles.push(role);
        }
        createDto.roleEnt = roles;
      }

      return await this.userRepo.createUser(createDto, query);
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

  async getAllUser() {
    return await this.userRepo.getAllUser();
  }

  async createJwtSetRole(id_user: string, id_role: string) {
    try {
      const user = await this.dataSource.getRepository(UserEnt).findOne({
        where: { id: id_user },
      });
      console.log('user.role==>', user);

      const roles: any = await this.dataSource
        .getRepository(RoleEnt)
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.users', 'users')
        .where('users.id = :id_user', { id_user: user.id })
        // .select(['role.id'])
        .getMany();
        let id_roles = [];
      console.log('roles.users ===>',roles );
      for (const role of roles) {
        id_roles.push(role.id)
      }
      console.log('id_roles',id_roles);
      
      if (id_roles.indexOf(id_role) == -1) {
        throw new BadRequestException({
          message: 'you don not have this role',
        });
      }

      const currentRole = await this.dataSource
        .getRepository(RoleEnt)
        .findOne({ where: { id: id_role } });

      if (!user || user.status == UserStatus.BLOCK) {
        throw new BadRequestException('User does not exist');
      }
      return await this.userRepo.createJwtSetRole(
        user.id,
        roles,
        currentRole.id,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async _createJwt(loginUserDto: LoginUserDto) {
    try {
      const user = await this.dataSource.getRepository(UserEnt).findOne({
        where: { username: loginUserDto.username },
      });
      console.log(user);

      const roles = await this.dataSource
        .getRepository(UserEnt)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .where('role = :userRole', { userRole: user.role })
        .select(['role.id'])
        .getMany();
      if (
        !user ||
        !(await user.validatePassword(loginUserDto.password)) ||
        user.status == UserStatus.BLOCK
      ) {
        throw new BadRequestException('User does not exist');
      }
      console.log(roles);

      return await this.userRepo._createJwt(user.id, roles);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOneUser(searchDto: string, options?: FindOneOptions) {
    return await this.userRepo.findOneUser(searchDto, options);
  }

  async updateUser(
    id_user: string,
    updateDt: UpdateUserDto,
    query?: QueryRunner,
  ) {
    try {
      console.log(2222222222);

      const file = await this.dataSource
        .getRepository(FileEnt)
        .findOne({ where: { unq_file: updateDt.unq_file } });
      updateDt.file = file;

      updateDt.departmentEnt = await this.dataSource
        .getRepository(DepartmentEnt)
        .findOne({ where: { id: updateDt.id_department } });
      console.log(33333333);

      let roles = [];
      for (const id_role of updateDt.id_role) {
        const role = await this.dataSource
          .getRepository(RoleEnt)
          .findOne({ where: { id: id_role } });
        roles.push(role);
      }
      console.log(444444444);
      updateDt.roleEnt = roles;
      const uerEnt = <UserEnt>await this.findOneUser(id_user);
      console.log(5555555);
      return await this.userRepo.updateUser(uerEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      throw e;
    }
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
  async changePasswordAdmin(
    id_user: UserResponseJWTDto,
    changePasswordUserDto: ChangePasswordAdminDto,
  ): Promise<UserEnt> {
    try {
      return await this.userRepo.changePasswordAdmin(
        id_user,
        changePasswordUserDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async paginationTask(id_user: string, pageDto: TaskPageDto) {
    return await this.userRepo.paginationTask(id_user, pageDto);
  }

  async paginationTaskWithJwt(id_user: string, pageDto: TaskPageDto) {
    return await this.userRepo.paginationTaskWithJwt(id_user, pageDto);
  }

  async jwtAdmin(id_user: string) {
    try {
      const user = await this.dataSource.getRepository(UserEnt).findOne({
        where: { id: id_user },
      });
      console.log(user);
      const roles = await this.dataSource
        .getRepository(UserEnt)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .where('role = :userRole', { userRole: user.role })
        .select(['role.id'])
        .getMany();
      if (!user || user.status == UserStatus.BLOCK) {
        throw new BadRequestException('User does not exist');
      }
      return await this.userRepo._createJwt(user.id, roles);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getUser(id_user: string) {
    try {
      return await this.userRepo.getUser(id_user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getDepartmentUsers(id_department: string) {
    return await this.userRepo.getDepartmentUsers(id_department);
  }
  async paginationDoneTaskRecentDay(id_user: string, pageDto: TaskPageDto) {
    return await this.userRepo.paginationDoneTaskRecentDay(id_user, pageDto);
  }

  async listOfTaskRecentDay(id_user: string) {
    return await this.userRepo.listOfTaskRecentDay(id_user);
  }

  async deleteUser(id_user: string) {
    try {
      return await this.userRepo.deleteUser(id_user);
    } catch (e) {
      throw e;
    }
  }
}
