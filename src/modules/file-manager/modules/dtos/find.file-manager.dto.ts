import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { RecieveTypeEnum } from '../enums/file-manager.enum';

export class FindFileManagerDto {
  @ApiProperty()
  @IsUUID()
  destination_id: string;

  @ApiProperty({ default: RecieveTypeEnum.PUBLIC })
  reciverType: RecieveTypeEnum;
}
