import { ApiProperty } from '@nestjs/swagger';
import { FileManagerEnt } from '../entities/file-manager.entity';
import { RecieveTypeEnum } from '../enums/file-manager.enum';
export class FileManagerCUDto {
  @ApiProperty()
  id_file_manager: string;

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

  constructor(init?: Partial<FileManagerEnt>) {
    this.id_file_manager = init.id;
    this.title = init.title;
    this.destination_id = init.destination_id;
    this.description = init.description;
    this.files = init.files;
    this.reciverType = init.reciverType;
  }
}
