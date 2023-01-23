import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandlerError } from 'src/common/class/handler.error';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { TaskPageDto } from 'src/modules/task/modules/paginations/task.page.dto';
import { HandlerService } from 'src/utility/handler/handler.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { ChangePasswordAdminDto } from '../dtos/change-password-admin.dto';
import { ChangePasswordUserDto } from '../dtos/change-password.user.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserEnt } from '../entities/user.entity';
import { UserEnum } from '../../../../common/translate/enums/user.enum';
import { UserStatus } from '../enum/user.status';
import { UserPageDto } from '../paginations/user.page.dto';
import { UserRepo } from '../repositories/user.repository';
import { PublicEnum } from 'src/common/translate/enums/public.enum';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service.class';

@Injectable()
export class UserService extends AbstractServiceClass<
  UserEnt,
  CreateUserDto,
  UpdateUserDto,
  UserPageDto
> {
  public constructor(
    private userRepo: UserRepo,
    @InjectRepository(FileEnt)
    @InjectRepository(UserEnt)
    @InjectRepository(RoleEnt)
    @InjectRepository(DepartmentEnt)
    handlerService: HandlerService,
    dataSource: DataSource,
  ) {
    super(dataSource, handlerService);
    this.className = this.constructor.name;
  }

  protected _getOne(searchDto: string, options?: FindOneOptions<any>) {
    throw new Error('Method not implemented.');
  }
  _resultGetOneDto(ent: UserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _create(createDt: CreateUserDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultCreateDto(ent: UserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(ent: UserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _update(
    role_Id: string,
    updateDt: UpdateUserDto,
    query?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(ent: UserEnt) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: UserPageDto) {
    throw new Error('Method not implemented.');
  }

  async createUser(createDto: CreateUserDto, query?: QueryRunner) {
    try {
      if (createDto.unq_file) {
        const file = await this.dataSource.manager.findOne(FileEnt, {
          where: { unq_file: createDto.unq_file },
        });
        createDto.file = file;
      }
      createDto.departmentEnt = await this.dataSource.manager.findOne(
        DepartmentEnt,
        { where: { id: createDto.id_department } },
      );
      const roles: any = [];
      for (const id_role of createDto.id_role) {
        let role = await this.dataSource.manager.findOne(RoleEnt, {
          where: { id: id_role },
        });
        roles.push(role);
      }
      createDto.roleEnt = roles;
      return await this.userRepo.createUser(createDto, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getAllUser() {
    try {
      return await this.userRepo.getAllUser();
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async createJwtSetRole(id_user: string, id_role: string) {
    try {
      const user = await this.dataSource.manager.findOne(UserEnt, {
        where: { id: id_user },
      });
      console.log('user.role==>', user);

      const rolesEnt: any = await this.dataSource.manager
        .createQueryBuilder(RoleEnt, 'role')
        .leftJoinAndSelect('role.users', 'users')
        .where('users.id = :id_user', { id_user: user.id })
        .getMany();
      let roles = [];
      let id_roles = [];
      console.log('roles.users ===>', rolesEnt);
      for (const role of rolesEnt) {
        roles.push({ id: role.id, title: role.role_type });
        id_roles.push(role.id);
      }
      console.log('id_roles', roles);

      if (id_roles.indexOf(id_role) == -1) {
        throw new Error(
          `${JSON.stringify({
            section: 'user',
            value: UserEnum.USER_DOES_NOT_HAVE_THIS_ROLE,
          })}`,
        );
      }

      const currentRole = await this.dataSource.manager.findOne(RoleEnt, {
        where: { id: id_role },
      });

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
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async _createJwt(loginUserDto: LoginUserDto) {
    try {
      const user = await this.dataSource.manager.findOne(UserEnt, {
        where: { username: loginUserDto.username },
      });
      if (
        !user ||
        !(await user.validatePassword(loginUserDto.password)) ||
        user.status == UserStatus.BLOCK
      ) {
        throw new BadRequestException('User does not exist');
      }
      const rolesEnt: any = await this.dataSource.manager
        .createQueryBuilder(RoleEnt, 'role')
        .leftJoinAndSelect('role.users', 'users')
        .where('users.id = :id_user', { id_user: user.id })
        .getMany();
      let roles = [];
      console.log('roles.users ===>', roles);
      for (const role of rolesEnt) {
        roles.push({ id: role.id, title: role.role_type });
      }

      console.log(roles);

      return await this.userRepo._createJwt(user.id, roles);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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

      const file = await this.dataSource.manager.findOne(FileEnt, {
        where: { unq_file: updateDt.unq_file },
      });
      updateDt.file = file;

      updateDt.departmentEnt = await this.dataSource.manager.findOne(
        DepartmentEnt,
        { where: { id: updateDt.id_department } },
      );
      console.log(33333333);

      let roles = [];
      for (const id_role of updateDt.id_role) {
        const role = await this.dataSource.manager.findOne(RoleEnt, {
          where: { id: id_role },
        });
        roles.push(role);
      }
      console.log(444444444);
      updateDt.roleEnt = roles;
      const uerEnt = <UserEnt>await this.findOneUser(id_user);
      console.log(5555555);
      return await this.userRepo.updateUser(uerEnt, updateDt, query);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationUser(pageDto: UserPageDto) {
    try {
      return await this.userRepo.paginationUser(pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async blockUser(id_user: string): Promise<UserEnt> {
    try {
      return await this.userRepo.blockUser(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationTask(id_user: string, pageDto: TaskPageDto) {
    try {
      return await this.userRepo.paginationTask(id_user, pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationTaskWithJwt(id_user: string, pageDto: TaskPageDto) {
    try {
      return await this.userRepo.paginationTaskWithJwt(id_user, pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async jwtAdmin(id_user: string) {
    try {
      const user = await this.dataSource.manager.findOne(UserEnt, {
        where: { id: id_user },
      });

      const rolesEnt: any = await this.dataSource.manager
        .createQueryBuilder(RoleEnt, 'role')
        .leftJoinAndSelect('role.users', 'users')
        .where('users.id = :id_user', { id_user: user.id })
        .getMany();
      let roles = [];
      console.log('roles.users ===>', rolesEnt);
      for (const role of rolesEnt) {
        roles.push({ id: role.id, title: role.role_type });
      }
      if (!user || user.status == UserStatus.BLOCK) {
        throw new BadRequestException(
          `${JSON.stringify({
            section: 'public',
            value: PublicEnum.USER_NOT_EXISTS,
          })}`,
        );
      }
      return await this.userRepo._createJwt(user.id, roles);
    } catch (e) {
      console.log(e);
      console.log('in eeeeeeeeeeeee');

      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getUser(user: UserResponseJWTDto) {
    try {
      return await this.userRepo.getUser(user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getDepartmentUsers(id_department: string) {
    try {
      return await this.userRepo.getDepartmentUsers(id_department);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async paginationDoneTaskRecentDay(id_user: string, pageDto: TaskPageDto) {
    try {
      return await this.userRepo.paginationDoneTaskRecentDay(id_user, pageDto);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async listOfTaskRecentDay(id_user: string) {
    try {
      return await this.userRepo.listOfTaskRecentDay(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async deleteUser(id_user: string) {
    try {
      return await this.userRepo.deleteUser(id_user);
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
