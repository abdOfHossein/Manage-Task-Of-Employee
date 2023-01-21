import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { sha512 } from 'js-sha512';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { HashService } from 'src/modules/hash/hash.service';
import { RedisService } from 'src/modules/redis/redis.service';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { TaskMapperPagination } from 'src/modules/task/modules/mapper/task.mapper.pagination';
import { TaskPageDto } from 'src/modules/task/modules/paginations/task.page.dto';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { JwtPayloadInterface } from '../auth/interface/jwt-payload.interface';
import { ChangePasswordAdminDto } from '../dtos/change-password-admin.dto';
import { ChangePasswordUserDto } from '../dtos/change-password.user.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserEnt } from '../entities/user.entity';
import { UserStatus } from '../enum/user.status';
import { UserMapperPagination } from '../mapper/user.mapper.pagination';
import { UserPageDto } from '../paginations/user.page.dto';
const randomstring = require('randomstring');

export class UserRepo {
  PREFIX_TOKEN_AUTH = 'prefix_auth_token_';
  constructor(
    @InjectRepository(UserEnt)
    private dataSource: DataSource,
    private hashService: HashService,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async _createJwt(data: string, roles: any) {
    console.log(1111111111111111111);

    let jwtPayloadInterface: JwtPayloadInterface = {};
    const encryptTextInterface = await this.hashService.encrypt(data);
    const code = randomstring.generate({
      length: 64,
      charset: process.env.RANDOM_STRING_HASH_JWT,
    });
    console.log(22222222222222);

    jwtPayloadInterface.data = encryptTextInterface.text;
    jwtPayloadInterface.key = encryptTextInterface.key;
    jwtPayloadInterface.unq = sha512(code);
    jwtPayloadInterface.roles = roles;
    const dataRedis = {
      data: encryptTextInterface.text,
      iv: encryptTextInterface.iv,
      roles: roles,
    };
    console.log(3333333333333333);

    const result = this.jwtService.sign(jwtPayloadInterface);
    console.log(result);

    await this.redisService.setKey(
      `${this.PREFIX_TOKEN_AUTH}${jwtPayloadInterface.unq}`,
      JSON.stringify(dataRedis),
      10000000,
    );
    console.log(44444444444444444444);

    return result;
  }

  async createJwtSetRole(data: string, roles: any, currentRole: string) {
    let jwtPayloadInterface: JwtPayloadInterface = {};
    const encryptTextInterface = await this.hashService.encrypt(data);
    const code = randomstring.generate({
      length: 64,
      charset: process.env.RANDOM_STRING_HASH_JWT,
    });
    jwtPayloadInterface.data = encryptTextInterface.text;
    jwtPayloadInterface.key = encryptTextInterface.key;
    jwtPayloadInterface.roles = roles;
    jwtPayloadInterface.unq = sha512(code);
    jwtPayloadInterface.currentRole = currentRole;
    const dataRedis = {
      data: encryptTextInterface.text,
      iv: encryptTextInterface.iv,
      roles: roles,
      currentRole,
    };
    const roleEnt = await this.dataSource.manager
      .createQueryBuilder(RoleEnt, 'role')
      .where('role.id = :id_role', { id_role: currentRole })
      .leftJoinAndSelect('role.menu', 'menu')
      .leftJoinAndSelect('menu.frontend', 'frontend')
      .getMany();
    console.log('roleEnt', roleEnt);

    const tokenJwt = this.jwtService.sign(jwtPayloadInterface);
    console.log('tokenJwt', tokenJwt);
    let result: any = {};
    result.tokenJwt = tokenJwt;
    result.roleEnt = roleEnt[0].menu;
    if (!roleEnt[0].menu == null) {
      result.frontend = roleEnt[0].menu.frontend;
    } else {
      result.frontend = null;
    }
    await this.redisService.setKey(
      `${this.PREFIX_TOKEN_AUTH}${jwtPayloadInterface.unq}`,
      JSON.stringify(dataRedis),
      10000000,
    );
    return result;
  }

  async createUser(
    createDto: CreateUserDto,
    query: QueryRunner | undefined,
  ): Promise<UserEnt> {
    try {
      const userEnt = new UserEnt();
      userEnt.first_name = createDto.first_name;
      userEnt.role = createDto.roleEnt;
      userEnt.email = createDto.email;
      userEnt.last_name = createDto.last_name;
      userEnt.password = createDto.password;
      userEnt.phonenumber = createDto.phonenumber;
      userEnt.username = createDto.username;
      userEnt.department = createDto.departmentEnt;
      userEnt.files = [createDto.file];
      if (query) return await query.manager.save(userEnt);
      return await this.dataSource.manager.save(userEnt);
    } catch (e) {
      console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2');
      console.log(e);
      throw e;
    }
  }

  async validateUser(
    loginUserDto: LoginUserDto,
    options?: FindOneOptions,
  ): Promise<UserEnt> {
    const user = await this.dataSource.manager.findOne(UserEnt, {
      where: { username: loginUserDto.username },
    });
    if (user && loginUserDto.password == user.password) return user;
    return null;
  }

  async loginUser(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOneUser(
    searchDto: string,
    options?: FindOneOptions,
  ): Promise<UserEnt> {
    const result = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: searchDto },
      relations: ['department'],
    });
    console.log(result);

    if (!result)
      throw new BadGatewayException({ message: 'user does not exits' });
    return result;
  }

  async updateUser(
    entity: UserEnt,
    updateDto: UpdateUserDto,
    query?: QueryRunner,
  ): Promise<UserEnt> {
    console.log(66666);
    entity.department = updateDto.departmentEnt;
    entity.first_name = updateDto.first_name;
    entity.email = updateDto.email;
    entity.last_name = updateDto.last_name;
    entity.password = updateDto.password;
    entity.role = updateDto.roleEnt;
    entity.phonenumber = updateDto.phonenumber;
    entity.username = updateDto.username;
    entity.files = [updateDto.file];
    console.log(entity);
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async changePassword(
    id_user: UserResponseJWTDto,
    changePasswordUserDto: ChangePasswordUserDto,
  ): Promise<UserEnt> {
    if (
      changePasswordUserDto.confirm_password != changePasswordUserDto.password
    )
      throw new BadRequestException({
        message: 'confirm password does not match password',
      });
    const userEntity = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: id_user.uid },
    });
    console.log(userEntity);
    if (!userEntity)
      throw new BadRequestException({ message: 'user does not exits' });
    userEntity.password = sha512(changePasswordUserDto.new_password);
    return await this.dataSource.manager.save(userEntity);
  }

  async changePasswordAdmin(
    id_user: UserResponseJWTDto,
    changePasswordUserDto: ChangePasswordAdminDto,
    query?: QueryRunner,
  ): Promise<UserEnt> {
    const userEntity = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: id_user.uid },
    });
    console.log(changePasswordUserDto);
    console.log(id_user);

    if (!userEntity)
      throw new BadRequestException({ message: 'user does not exits' });
    userEntity.password = sha512(changePasswordUserDto.new_password);
    if (query) return await query.manager.save(userEntity);
    return await this.dataSource.manager.save(userEntity);
  }

  async blockUser(id_user: string): Promise<UserEnt> {
    const userEntity = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: id_user },
    });
    if (!userEntity)
      throw new BadGatewayException({ message: 'user does not exits' });
    userEntity.status = UserStatus.BLOCK;
    return await this.dataSource.manager.save(userEntity);
  }

  async paginationUser(pageDto: UserPageDto): Promise<PageDto<UserEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('department.department_rls', 'department_rls')
      .leftJoinAndSelect('department_rls.tasks', 'tasks');
    // .select([
    //   'user.id',
    //   'user.first_name',
    //   'user.last_name',
    //   'user.username',
    //   'user.email',
    //   'user.phonenumber',
    // ]);

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
      if (pageDto.filter.username)
        queryBuilder.andWhere('user.username LIKE :username', {
          username: `%${pageDto.filter.username}%`,
        });
      if (pageDto.filter.first_name)
        queryBuilder.andWhere('user.first_name LIKE :first_name', {
          first_name: `%${pageDto.filter.first_name}%`,
        });
      if (pageDto.filter.username)
        queryBuilder.andWhere('user.last_name LIKE :last_name', {
          last_name: `%${pageDto.filter.last_name}%`,
        });
    }
    if (pageDto.field) {
      const mapper = UserMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${UserMapperPagination[pageDto.field]}`,
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

  async paginationTask(
    id_user: string,
    pageDto: TaskPageDto,
  ): Promise<PageDto<UserEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .where('user.id = :id_user', { id_user })
      .leftJoinAndSelect('user.task', 'task')
      .select([
        'user.id',
        'task.id',
        'task.priority',
        'task.title',
        'task.head_id',
        'task.do_date',
        'task.remain_date',
        'task.type',
        'task.duration',
        'task.status',
      ]);

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
      if (pageDto.filter.priority)
        queryBuilder.andWhere('task.priority LIKE :priority', {
          priority: `%${pageDto.filter.priority}%`,
        });
      if (pageDto.filter.title)
        queryBuilder.andWhere('task.title LIKE :title', {
          title: `%${pageDto.filter.title}%`,
        });
      if (pageDto.filter.type)
        queryBuilder.andWhere('task.type LIKE :type', {
          type: `%${pageDto.filter.type}%`,
        });
      if (pageDto.filter.status)
        queryBuilder.andWhere('task.status LIKE :status', {
          status: `%${pageDto.filter.status}%`,
        });
    }
    if (pageDto.field) {
      const mapper = TaskMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${TaskMapperPagination[pageDto.field]}`,
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

  async getUser(id_user: string, options?: FindOneOptions): Promise<UserEnt> {
    const result = await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id: id_user })
      .getOne();
    console.log(result);

    if (!result)
      throw new BadGatewayException({ message: 'user does not exits' });
    return result;
  }

  async getDepartmentUsers(id_department: string) {
    return await this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .innerJoin('user.department', 'department')
      .where('department.id = :id_department', {
        id_department,
      })
      .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.username',
        'user.email',
        'user.phonenumber',
        'user.status',
        'user.role_default_status',
      ])
      .getMany();
  }

  async paginationTaskWithJwt(
    id_user: string,
    pageDto: TaskPageDto,
  ): Promise<PageDto<UserEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .where('user.id = :id_user', { id_user })
      .leftJoinAndSelect('user.task', 'task')
      .select([
        'user.id',
        'task.id',
        'task.priority',
        'task.title',
        'task.head_id',
        'task.do_date',
        'task.remain_date',
        'task.type',
        'task.duration',
        'task.status',
      ]);

    if (pageDto.base) {
      const row = pageDto.base.row;
      const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
      queryBuilder.skip(skip).take(row);
    }

    if (pageDto.filter) {
      if (pageDto.filter.priority)
        queryBuilder.andWhere('task.priority LIKE :priority', {
          priority: `%${pageDto.filter.priority}%`,
        });
      if (pageDto.filter.title)
        queryBuilder.andWhere('task.title LIKE :title', {
          title: `%${pageDto.filter.title}%`,
        });
      if (pageDto.filter.type)
        queryBuilder.andWhere('task.type LIKE :type', {
          type: `%${pageDto.filter.type}%`,
        });
      if (pageDto.filter.status)
        queryBuilder.andWhere('task.status LIKE :status', {
          status: `%${pageDto.filter.status}%`,
        });
    }
    if (pageDto.field) {
      const mapper = TaskMapperPagination[pageDto.field];
      if (!mapper)
        throw new Error(
          `${JSON.stringify({
            section: 'public',
            value: 'Column Not Exist',
          })}`,
        );
      queryBuilder.addOrderBy(
        `${TaskMapperPagination[pageDto.field]}`,
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

  async paginationDoneTaskRecentDay(
    id_user: string,
    pageDto: TaskPageDto,
  ): Promise<UserEnt[]> {
    return this.dataSource.manager
      .query(`select u.id,u.first_name ,u.last_name , (select  jsonb_agg(jsonb_build_object('id',id,'title',title,'status',status,'type',"type",'priority',priority,'duration',duration)) as text  from public.task t where cast (t."userId" as text) = cast(u.id as text) )  
    from public."user" u where u.status ='active'
    `);
  }

  async listOfTaskRecentDay(id_user: string): Promise<UserEnt[]> {
    let nowDate = new Date(Date.now()).toUTCString();
    const midnight = nowDate.split(' ')[4];
    let previousDay = nowDate.replace(midnight, '00:00:00');
    const result = this.dataSource.manager
      .query(`select  * from  public."user" u 
    left join  public.task t on u.id =t."userId" 
    where  u.id ='${id_user}'
    and t.update_at  between '${previousDay}' and '${nowDate}'
    `);

    return result;
  }

  async deleteUser(id_user: string) {
    const user = await this.dataSource.manager.findOne(UserEnt, {
      where: { id: id_user },
    });
    user.delete_at = new Date();
    return await this.dataSource.manager.save(user);
  }
  async getAllUser() {
    return await this.dataSource.manager.find(UserEnt);
  }
}
