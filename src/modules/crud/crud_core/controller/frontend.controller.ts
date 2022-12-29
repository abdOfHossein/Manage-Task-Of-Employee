import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFrontendDto } from '../../modules/frontend/dtos/create.frontend.dto';
import { UpdateFrontendDto } from '../../modules/frontend/dtos/update.frontend.dto';
import { FrontendPageDto } from '../../modules/frontend/pagination/frontend.page.dto';
import { FrontendService } from '../../modules/frontend/services/frontend.service';

@ApiBearerAuth('access-token')
@ApiTags('frontend')
@ApiHeader({
  name: 'accept-language',
  description: 'language code',
  schema: {
    default: 'fa',
  },
})
@Controller('frontend')
export class FrontendController {
  constructor(private frontendService: FrontendService) {}

  @ApiOperation({ summary: 'page of frontend' })
  @Post('page')
  pagination(@Body() pageDto: FrontendPageDto) {
    return this.frontendService._pagination(pageDto);
  }

  @ApiOperation({ summary: 'create of frontend' })
  @Post()
  create(@Body() createFrontendDto: CreateFrontendDto) {
    return this.frontendService._create(createFrontendDto);
  }

  @ApiOperation({ summary: 'findOne frontend' })
  @Get()
  getOne(@Query('id_frontend') id_frontend: string) {
    return this.frontendService._getOne(id_frontend);
  }

  @ApiOperation({ summary: 'update frontend' })
  @Put()
  update(
    @Query('id_frontend') id_frontend: string,
    @Body() updateFrontendDto: UpdateFrontendDto,
  ) {
    return this.frontendService._update(id_frontend, updateFrontendDto);
  }
}
