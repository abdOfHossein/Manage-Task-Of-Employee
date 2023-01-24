import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { FileFilterDto } from '../filter/file.filter.dto';

export class FilePageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: FileFilterDto;
}
