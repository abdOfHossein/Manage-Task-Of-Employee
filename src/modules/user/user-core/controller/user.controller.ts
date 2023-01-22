import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { TaskPageDto } from 'src/modules/task/modules/paginations/task.page.dto';
import { GetUser } from '../../../../common/decorates/get.user.decorator';
import { PublicRole } from '../../../../common/decorates/public.role.decorator';
import { UserResponseJWTDto } from '../../../../common/dtos/user.dto';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';
import { ChangePasswordAdminDto } from '../../modules/dtos/change-password-admin.dto';
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
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'sign up user with department' })
  @Post('/register')
  register(
    @Query('id_department') id_department: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEnt> {
    createUserDto.id_department = id_department;
    return this.user.createUser(createUserDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'set Role for user' })
  @Get('setRole')
  async setRole(@Query('id_role') id_role: string, @Req() req: any) {
    return await this.user.createJwtSetRole(req.user.id_User, id_role);
  }

  @Post('login')
  @ApiOperation({ summary: 'sign in user by username and password' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.user._createJwt(loginUserDto);
  }

  @ApiOperation({ summary: 'test Jwt' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Get('/protected')
  protected(
    @Req() req: any,
    // @GetUser() user: UserResponseJWTDto
  ) {
    console.log(req.user);
    
    return req.user;
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Get('/block')
  @ApiOperation({ summary: 'block user access to app' })
  async blockUser(@Query('id_user') id_user: string) {
    return await this.user.blockUser(id_user);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Get('/all')
  @ApiOperation({ summary: 'get all Users just for you baby(hadi<3)' })
  async getAllUser() {
    return await this.user.getAllUser();
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Post('password')
  @ApiOperation({ summary: 'change user password' })
  async changePassword(
    @Body() changePasswordUserDto: ChangePasswordUserDto,
    @GetUser() id_user: UserResponseJWTDto,
  ) {
    return await this.user.changePassword(id_user, changePasswordUserDto);
  }

  @ApiOperation({ summary: 'update user' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Put()
  updateUser(
    @Query('id_user') id_user: string,
    @Query('id_department') id_department: string,
    @Query('unq_file') unq_file: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEnt> {
    console.log(1111111111);

    updateUserDto.id_department = id_department;
    updateUserDto.unq_file = unq_file;
    return this.user.updateUser(id_user, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'pagination for user' })
  @Post('page')
  paginationUser(@Body() pageDto: UserPageDto): Promise<PageDto<UserEnt>> {
    console.log('pageDtoooooooooooooooooooooooo');
    return this.user.paginationUser(pageDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Post('admin/password')
  @ApiOperation({ summary: 'change user password by vadmin' })
  async changePasswordAdmin(
    @Body() changePasswordUserDto: ChangePasswordAdminDto,
    @Query('id_user') id_user: string,
  ) {
    const user = new UserResponseJWTDto();
    user.uid = id_user;
    console.log('usercon');
    console.log(user);

    return await this.user.changePasswordAdmin(user, changePasswordUserDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'pagination for task of user wiht recieve id_user' })
  @Post('page/task/id_user')
  paginationTask(
    @Body() pageDto: TaskPageDto,
    @Query('id_user') id_user: string,
  ): Promise<PageDto<UserEnt>> {
    return this.user.paginationTask(id_user, pageDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'pagination for task of user with JWT' })
  @Post('page/task/withJWT')
  paginationTaskWithJwt(
    @Body() pageDto: TaskPageDto,
    @GetUser() id_user: UserResponseJWTDto,
  ): Promise<PageDto<UserEnt>> {
    return this.user.paginationTaskWithJwt(id_user.uid, pageDto);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'pagination for user' })
  @Get('/admin/jwt')
  jwtAdmin(@Query('id_user') id_user: string, @Req() req: any) {
    return this.user.jwtAdmin(id_user);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get user' })
  @Get('/getUser')
  getUser(@GetUser() user: UserResponseJWTDto) {
    return this.user.getUser(user);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get all users in department' })
  @Get('/users')
  async getDepartmentUsers(
    @Query('id_department') id_department: string,
  ): Promise<UserEnt[]> {
    return this.user.getDepartmentUsers(id_department);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'pagination for tasks are done in previous day' })
  @Post('/page/previousDay')
  paginationDoneTaskRecentDay(
    @GetUser() id_user: UserResponseJWTDto,
    @Body() pageDto: TaskPageDto,
  ) {
    return this.user.paginationDoneTaskRecentDay(id_user.uid, pageDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'find All tasks in previous day' })
  @Post('/lsit/previousDay')
  listOfTaskRecentDay(@GetUser() id_user: UserResponseJWTDto) {
    return this.user.listOfTaskRecentDay(id_user.uid);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'delete User' })
  @Delete()
  deleteUser(@Query('id_user') id_user: string): Promise<UserEnt> {
    return this.user.deleteUser(id_user);
  }
}
