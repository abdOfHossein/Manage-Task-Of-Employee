import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../../../../common/dtos/page.option.dto';
import { FileManagerFilterDto } from '../filter/file-manager.filter.dto';

export class FileManagerPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: FileManagerFilterDto;
}
