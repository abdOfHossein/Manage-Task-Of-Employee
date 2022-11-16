import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException ,CACHE_MANAGER, Inject} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HashService } from 'src/modules/hash/hash.service';
import { RedisService } from 'src/modules/redis/redis.service';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 
  PREFIX_TOKEN_AUTH = 'prefix_auth_token_';
  constructor(
    private hashService: HashService,
    private redisService: RedisService,
    @Inject(CACHE_MANAGER)
    private _cacheManager: Cache
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
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
    const rs = await this.hashService.decrypt(encryptTextInterface);
    return {
      id_User: JSON.parse(<string>rs).id_User,
      roles: JSON.parse(<string>rs).roles,
    };
  }
}
