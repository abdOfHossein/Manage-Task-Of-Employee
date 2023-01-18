import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TypePlatformEnum } from '../enum/type.platform.enum';

export class CreateFrontendDto {
  @ApiProperty()
  @IsNotEmpty()
  slug_name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  host: string;

  @IsNotEmpty()
  @ApiProperty()
  route: string;

  @IsNotEmpty()
  @ApiProperty({ default: TypePlatformEnum.WEB })
  type_platform: TypePlatformEnum;
}
