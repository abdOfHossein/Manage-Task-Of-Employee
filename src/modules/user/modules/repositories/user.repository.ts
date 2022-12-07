import { BadGatewayException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { sha512 } from 'js-sha512';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page.meta.dto';
import { PublicFunc } from 'src/common/function/public.func';
import { HashService } from 'src/modules/hash/hash.service';
import { RedisService } from 'src/modules/redis/redis.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { JwtPayloadInterface } from '../auth/interface/jwt-payload.interface';
import { CreateUserDto } from '../dtos/create.user.dto';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserEnt } from '../entities/user.entity';
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

  //create Jwt
  async _createJwt(data: string, roles: any) {
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
    const dataRedis = {
      data: encryptTextInterface.text,
      iv: encryptTextInterface.iv,
      roles: roles,
    };
    const result = this.jwtService.sign(jwtPayloadInterface);
    await this.redisService.setKey(
      `${this.PREFIX_TOKEN_AUTH}${jwtPayloadInterface.unq}`,
      JSON.stringify(dataRedis),
      10000000,
    );
    return result;
  }

  //register
  async createUser(
    createDto: CreateUserDto,
    query: QueryRunner | undefined,
  ): Promise<UserEnt> {
    const userEnt = new UserEnt();
    userEnt.first_name = createDto.first_name;
    userEnt.role = createDto.roleEnt;
    userEnt.email = createDto.email;
    userEnt.last_name = createDto.last_name;
    userEnt.password = createDto.password;
    userEnt.phonenumber = createDto.phonenumber;
    userEnt.username = createDto.username;
    userEnt.department = createDto.departmentEnt;
    if (query) return await query.manager.save(userEnt);
    return await this.dataSource.manager.save(userEnt);
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
    entity.department = updateDto.departmentEnt;
    entity.first_name = updateDto.first_name;
    entity.email = updateDto.email;
    entity.last_name = updateDto.last_name;
    entity.password = updateDto.password;
    entity.role = updateDto.roleEnt;
    entity.phonenumber = updateDto.phonenumber;
    entity.username = updateDto.username;
    if (query) return await query.manager.save(entity);
    return await this.dataSource.manager.save(entity);
  }

  async paginationUser(pageDto: UserPageDto): Promise<PageDto<UserEnt>> {
    const queryBuilder = this.dataSource.manager
      .createQueryBuilder(UserEnt, 'user')
      .innerJoinAndSelect('user.department', 'department')
      .innerJoinAndSelect('department.department_rls', 'department_rls')
      .innerJoinAndSelect('department_rls.tasks', 'tasks');
    console.log(await queryBuilder.getMany());

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
}
