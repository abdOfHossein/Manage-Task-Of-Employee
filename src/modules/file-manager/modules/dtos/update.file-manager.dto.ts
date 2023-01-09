import { ApiProperty } from '@nestjs/swagger';
import { RecieveTypeEnum } from '../enums/file-manager.enum';

export class UpdateFileManagerDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  destination_id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  files: string[];

  @ApiProperty({ default: RecieveTypeEnum.PUBLIC })
  reciverType: RecieveTypeEnum;
}
