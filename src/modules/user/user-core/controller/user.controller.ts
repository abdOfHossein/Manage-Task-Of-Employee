import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { TaskEnt } from 'src/modules/task/modules/entities/task.entity';
import { TaskPageDto } from 'src/modules/task/modules/paginations/task.page.dto';
import { GetUser } from '../../../../common/decorates/get.user.decorator';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';
import { ChangePasswordUserDto } from '../../modules/dtos/change-password.user.dto';
import { CreateUserDto } from '../../modules/dtos/create.user.dto';
import { LoginUserDto } from '../../modules/dtos/login.user.dto';
import { UpdateUserDto } from '../../modules/dtos/update.user.dto';
import { UserEnt } from '../../modules/entities/User.entity';
import { RolesGuard } from '../../modules/guard/role.guard';
import { UserPageDto } from '../../modules/paginations/user.page.dto';
import { UserService } from '../../modules/services/User.service';

@ApiTags('User')
@Controller('User')
export class UserController {
  PREFIX_TOKEN_AUTH = 'prefix_auth_token_';
  constructor(private user: UserService) {}

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('/register')
  @ApiOperation({ summary: 'sign up user with department' })
  register(
    @Query('id_department') id_department: string,
    @Query('unq_file') unq_file: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEnt> {
    createUserDto.id_department = id_department;
    createUserDto.unq_file = unq_file;
    return this.user.createUser(createUserDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @ApiOperation({summary:"set Role for user"})
  @Get('setRole')
  async setRole(@Query('id_role') id_role: string,@Req()  req:any) {
    return await this.user.createJwtSetRole(req.user.id_User,id_role);
  }

  @Post('login')
  @ApiOperation({ summary: 'sign in user by username and password' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.user._createJwt(loginUserDto);
  }

  @ApiOperation({ summary: 'test Jwt' })
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
  @ApiOperation({ summary: 'block user access to app' })
  async blockUser(@Query('id_user') id_user: string) {
    return await this.user.blockUser(id_user);
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('password')
  @ApiOperation({ summary: 'change user password' })
  async changePassword(
    @Body() changePasswordUserDto: ChangePasswordUserDto,
    @GetUser() id_user: UserResponseJWTDto,
  ) {
    return await this.user.changePassword(id_user, changePasswordUserDto);
  }

  @ApiOperation({ summary: 'update user' })
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
    console.log(pageDto);
    return this.user.paginationUser(pageDto);
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('admin/password')
  @ApiOperation({ summary: 'change user password by vadmin' })
  async changePasswordAdmin(
    @Body() changePasswordUserDto: ChangePasswordUserDto,
    @Query('id_user') id_user: string,
  ) {
    const user = new UserResponseJWTDto();
    user.uid = id_user;
    console.log('usercon');
    console.log(user);

    return await this.user.changePasswordAdmin(user, changePasswordUserDto);
  }

  @ApiOperation({ summary: 'pagination for task of user' })
  @Post('page/task')
  paginationTask(
    @Body() pageDto: TaskPageDto,
    @Query('id_user') id_user: string,
  ): Promise<PageDto<TaskEnt>> {
    return this.user.paginationTask(id_user, pageDto);
  }

  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'pagination for user' })
  @Get('/admin/jwt')
  jwtAdmin(@Query('id_user') id_user: string, @Req() req: any) {
    return this.user.jwtAdmin(id_user);
  }
}
