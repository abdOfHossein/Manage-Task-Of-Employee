import { ApiProperty } from '@nestjs/swagger';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { FileEnt } from '../entities/file.entity'; 
import { StatusFileEnum } from '../enums/status.file.enum';
import { TypeFileEnum } from '../enums/type.file.enum';

export class FileGResult {
  @ApiProperty()
  id: string;

  @ApiProperty()
  unq_file: string;

  @ApiProperty()
  mime_type: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  file: string;

  @ApiProperty()
  file_path: string;

  @ApiProperty()
  original: string;

  @ApiProperty()
  type_file: TypeFileEnum;

  @ApiProperty()
  status: StatusFileEnum;

  @ApiProperty()
  user: UserEnt;

  constructor(init?: Partial<FileEnt>) {
    this.id = init.id;
    this.mime_type = init.mime_type;
    this.size = init.size;
    this.file = init.file;
    this.file_path = init.file_path;
    this.original = init.original;
    this.type_file = init.type_file;
    this.status = init.status;
    this.unq_file = init.unq_file;
    this.user = init.user;
  }
}
