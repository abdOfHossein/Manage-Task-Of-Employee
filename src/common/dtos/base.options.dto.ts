import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TypeSortEnum } from '../enums/type.sort.enum';

export class BaseOptionsDto {
  @ApiPropertyOptional({ enum: TypeSortEnum, default: TypeSortEnum.ASC })
  readonly order?: TypeSortEnum = TypeSortEnum.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  readonly row: number = 10;
}
