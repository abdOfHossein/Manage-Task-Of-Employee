import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { RecieveTypeEnum } from '../enums/file-manager.enum';

export class UpdateFileManagerDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsUUID()
  destination_id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  files: string[];

  @ApiProperty({ default: RecieveTypeEnum.PUBLIC })
  reciverType: RecieveTypeEnum;
}
