import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from '../../modules/auth/local-auth.guard';
import { CreateUserDto } from '../../modules/dtos/create.user.dto';
import { UpdateUserDto } from '../../modules/dtos/update.user.dto';
import { UserEnt } from '../../modules/entities/User.entity';
import { UserPageDto } from '../../modules/paginations/user.page.dto';
import { UserService } from '../../modules/services/User.service';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private user: UserService) {}

  @Post('/register')
  register(
    @Query('id_department') id_department: string,
    @Query('id_role') id_role: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEnt> {
    createUserDto.id_department = id_department;
    createUserDto.id_role = id_role;
    return this.user.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('loginUser')
  login(@Request() req): Promise<{ access_token: string }> {
    return this.user.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth()
  @Get('/protected')
  sayHello(@Request() req): string {
    return req.user;
  }

  @Put()
  updateUser(
    @Query('id_user') id_user: string,
    @Query('id_department') id_department: string,
    @Query('id_role') id_role: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEnt> {
    updateUserDto.id_department = id_department;
    updateUserDto.id_role = id_role;
    return this.user.updateUser(id_user, updateUserDto);
  }

  @ApiOperation({ summary: 'pagination for user' })
  @Post('page')
  paginationUser(@Body() pageDto: UserPageDto): Promise<PageDto<UserEnt>> {
    return this.user.paginationUser(pageDto);
  }
}
