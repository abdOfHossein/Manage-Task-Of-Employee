import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { ParamResultEnum } from 'src/common/enums/param.result.enum';
import { CreateRoleRlBackendDto } from '../../modules/role-backend-rl/dtos/create-role-rl-backend.dto';
import { UpdateRoleRlBackendDto } from '../../modules/role-backend-rl/dtos/update-role-rl-backend.dto';
import { RoleRlBackendEnt } from '../../modules/role-backend-rl/entities/role-rl-backend.entity';
import { RoleRlBackendPageDto } from '../../modules/role-backend-rl/pagination/country.page.dto';
import { RoleRlBackendService } from '../../modules/role-backend-rl/services/role-rl-backend.service';

@ApiBearerAuth('access-token')
@ApiTags('role-backend')
@ApiHeader({
  name: 'accept-language',
  description: 'language code',
  schema: {
    default: 'fa',
  },
})
@Controller('role-backend')
export class RoleRlBackendController {
  constructor(private roleRlBackendService: RoleRlBackendService) {}

  // @ApiOperation({ summary: 'Pagination role-backend' })
  // @Post('page')
  // pagination(@Body() pageDto: RoleRlBackendPageDto) {
  //   return this.roleRlBackendService.pagination(pageDto)
  // }

  @ApiOperation({ summary: 'Create role_backend' })
  @Post()
  create(@Body() createRoleRlBackendDto: CreateRoleRlBackendDto) {
    return this.roleRlBackendService._create(createRoleRlBackendDto);
  }

  @ApiOperation({ summary: 'Getone role_backend' })
  @Get()
  getOne(@Query('id_role_backend') id_role_backend: string) {
    return this.roleRlBackendService._getOne(id_role_backend);
  }

  @ApiOperation({ summary: 'update role_backend' })
  @Put()
  update(
    @Query('id_role_backend') id_role_backend: string,
    @Body() updateRoleRlBackendDto: UpdateRoleRlBackendDto,
  ) {
    return this.roleRlBackendService._update(
      id_role_backend,
      updateRoleRlBackendDto,
    );
  }

  @ApiOperation({ summary: 'delete role_backend' })
  @Delete()
  delete(@Query('id_role_backend') id_role_backend: string) {
    return this.roleRlBackendService._delete(
      id_role_backend,
    );
  }

  //pagination
  @ApiOperation({ summary: 'pagination for Arch' })
  @Post('page')
  getPaginationArch(
    @Body() pageDto: RoleRlBackendPageDto,
  ): Promise<PageDto<RoleRlBackendEnt>> {
    return this.roleRlBackendService._pagination(pageDto);
  }
}
