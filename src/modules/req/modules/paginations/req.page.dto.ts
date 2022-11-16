import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { ReqFilterDto } from '../filter/req.filter.dto';

export class ReqPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: ReqFilterDto;
}
