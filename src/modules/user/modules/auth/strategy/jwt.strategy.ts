import { PassportStrategy } from '@nestjs/passport';

import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    private dataSource: DataSource,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'secret',
    });
  }

  public get cacheManager(): Cache {
    return this._cacheManager;
  }
  public set cacheManager(value: Cache) {
    this._cacheManager = value;
  }

  async validate(payload: any) {
    const result = await this.redisService.getKey(
      `${this.PREFIX_TOKEN_AUTH}${payload.unq}`,
    );

    if (result == null) throw new UnauthorizedException();
    const encryptTextInterface: EncryptTextInterface = {
      text: result.data,
      iv: result.iv,
      key: payload.key,
    };
    const rs: any = await this.hashService.decrypt(encryptTextInterface);
    const user = await this.dataSource.getRepository(UserEnt).findOne({
      where: {
        id: rs,
      },
      relations: {
        role: true,
      },
    });

    return {
      id_User: user.id,
    };
  }
}
