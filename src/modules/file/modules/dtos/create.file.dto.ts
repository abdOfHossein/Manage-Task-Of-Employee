import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { TypeFileEnum } from '../enums/type.file.enum';

export class CreateFileDto {
  size: number;
  file: string;
  type_file: TypeFileEnum;
  user?: UserEnt;
  original: string;
  mime_type: string;
  created_by?: string;
  file_path: string;
}
