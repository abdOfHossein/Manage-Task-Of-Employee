import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';
import { CreateUserDto } from '../../modules/dtos/create.user.dto';
import { LoginUserDto } from '../../modules/dtos/login.user.dto';
import { UpdateUserDto } from '../../modules/dtos/update.user.dto';
import { UserEnt } from '../../modules/entities/User.entity';
import { RolesGuard } from '../../modules/guard/role.guard';
import { UserPageDto } from '../../modules/paginations/user.page.dto';
import { UserService } from '../../modules/services/User.service';
import { Response } from 'express';
import { ChangePasswordUserDto } from "../../modules/dtos/change-password.user.dto";
import { GetUser } from "../../../../common/decorates/get.user.decorator";
import { UserResponseJWTDto } from "../../../../common/dtos/user.dto";

@ApiTags('User')
@Controller('User')
export class UserController {
  PREFIX_TOKEN_AUTH = 'prefix_auth_token_';
  constructor(private user: UserService) {}

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('/register')
  @ApiOperation({summary: 'sign up user with department'})
  register(
    @Query('id_department') id_department: string,
    @Query('unq_file') unq_file: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEnt> {
    createUserDto.id_department = id_department;
    createUserDto.unq_file = unq_file;
    return this.user.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({summary: 'sign in user by user name and password'})
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const result = await this.user._createJwt(loginUserDto);
    res.status(200).send(result);
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('/protected')
  protected(@Req() req) {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('/block')
  @ApiOperation({summary: 'block user access to app'})
  async blockUser(@Query('id_user') id_user: string) {
    return await this.user.blockUser(id_user);
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('password')
  @ApiOperation({summary: 'change user password'})
  async changePassword(
    @Body() changePasswordUserDto: ChangePasswordUserDto,
    @GetUser() id_user: UserResponseJWTDto
  ) {
    return await this.user.changePassword(id_user, changePasswordUserDto);
  }

  @Put()
  updateUser(
    @Query('id_user') id_user: string,
    @Query('id_department') id_department: string,
    @Query('unq_file') unq_file: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEnt> {
    updateUserDto.id_department = id_department;
    updateUserDto.unq_file = unq_file;
    return this.user.updateUser(id_user, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'pagination for user' })
  @Post('page')
  paginationUser(@Body() pageDto: UserPageDto): Promise<PageDto<UserEnt>> {
    return this.user.paginationUser(pageDto);
  }
}
