import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateBackendDto } from '../../modules/backend/dtos/create.backend.dto';
import { UpdateBackendDto } from '../../modules/backend/dtos/update.backend.dto';
import { BackendPageDto } from '../../modules/backend/pagination/backend.page.dto';
import { BackendService } from '../../modules/backend/services/backend.service';

@ApiBearerAuth('access-token')
@ApiTags('backend')
@ApiHeader({
  name: 'accept-language',
  description: 'language code',
  schema: {
    default: 'fa',
  },
})
@Controller('backend')
export class BackendController {
  constructor(private backendService: BackendService) {}

  @Post('page')
  pagination(@Body() pageDto: BackendPageDto) {
    return this.backendService._pagination(pageDto);
  }

  @Post()
  create(@Body() createBackendDto: CreateBackendDto) {
    return this.backendService._create(createBackendDto);
  }

  @Get()
  getOne(@Query('id_backend') id_backend: string) {
    return this.backendService._getOne(id_backend);
  }

  @Put()
  update(
    @Query('id_backend') id_backend: string,
    @Body() updateBackendDto: UpdateBackendDto,
  ) {
    return this.backendService._update(id_backend, updateBackendDto);
  }
}
