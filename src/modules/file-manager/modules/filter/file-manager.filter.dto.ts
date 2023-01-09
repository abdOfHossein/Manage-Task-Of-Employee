import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { RecieveTypeEnum } from '../enums/file-manager.enum';

export class FileManagerFilterDto {
  @ApiProperty()
  @Allow()
  title: string;

  @ApiProperty()
  @Allow()
  files: string[];

  @ApiProperty({ default: RecieveTypeEnum.PUBLIC })
  @Allow()
  reciverType: RecieveTypeEnum;
}
