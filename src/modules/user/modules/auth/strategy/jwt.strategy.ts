import { PassportStrategy } from '@nestjs/passport';

import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HashService } from 'src/modules/hash/hash.service';
import { RedisService } from 'src/modules/redis/redis.service';
import { DataSource } from 'typeorm';
import { UserEnt } from '../../entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  PREFIX_TOKEN_AUTH = 'prefix_auth_token_';
  constructor(
    private hashService: HashService,
    private redisService: RedisService,
    @Inject(CACHE_MANAGER)
    private _cacheManager: Cache,
    @InjectRepository(UserEnt)
    private dataSource: DataSource,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  public get cacheManager(): Cache {
    return this._cacheManager;
  }
  public set cacheManager(value: Cache) {
    this._cacheManager = value;
  }

  async validate(payload: any) {
    console.log(payload);

    const result = await this.redisService.getKey(
      `${this.PREFIX_TOKEN_AUTH}${payload.unq}`,
    );
    console.log(result);

    if (result == null) throw new UnauthorizedException();
    const encryptTextInterface: EncryptTextInterface = {
      text: result.data,
      iv: result.iv,
      key: payload.key,
    };
    const rs: any = await this.hashService.decrypt(encryptTextInterface);
    console.log(rs);

    const user = await this.dataSource.manager.findOne(UserEnt, {
      where: {
        id: rs,
      },
      relations: {
        role: true,
      },
    });
    console.log(user);

    if (result.currentRole) {
      return {
        id_User: user.id,
        roles: user.id,
        currentRole: result.currentRole,
      };
    }
    return {
      id_User: user.id,
      roles: user.id,
    };
  }
}
