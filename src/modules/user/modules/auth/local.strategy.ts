import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UserEnt } from '../entities/user.entity';
import { UserService } from '../services/User.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  jwtService: any;
  constructor(private userService: UserService) {
    super(); //config
  }

  async validate(username: string, password: string) {
    try {
      const loginUserDto: LoginUserDto = {
        username,
        password,
      };
      const user = await this.userService._validateUser(loginUserDto);
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
