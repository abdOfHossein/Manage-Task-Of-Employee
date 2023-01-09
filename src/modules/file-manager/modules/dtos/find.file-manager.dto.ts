import { ApiProperty } from '@nestjs/swagger';
import { RecieveTypeEnum } from '../enums/file-manager.enum';

export class FindFileManagerDto {
  @ApiProperty()
  destination_id: string;

  @ApiProperty({ default: RecieveTypeEnum.PUBLIC })
  reciverType: RecieveTypeEnum;
}
