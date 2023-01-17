import { QueryFailedError } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { PublicEnum } from '../translate/enums/public.enum';
import { CrudEnum } from '../translate/enums/crud.enum';

export class HandlerError {
  constructor() {}
  private static handlerQueryFailedError(err: QueryFailedError) {
    if (err.driverError) {
      if (err.driverError.code == '22P02' && err.driverError.file == 'uuid.c')
        return { section: 'public', value: PublicEnum.UUID_NOT_MATCH };
      if (err.driverError.code == '42703') {
        return { section: 'public', value: PublicEnum.COLUMN_NOT_EXISTS };
      }
      if (err.driverError.code == '23503') {
        return {
          section: 'public',
          value: PublicEnum.DELETE_DENAY_RECORD_EXISTS_IN_RELATION,
        };
      }
    }
  }
  private static handlerError(err: Error) {
    if (err.name == 'Error') return JSON.parse(err.message);
  }
  private static handlerBadException(err: BadRequestException) {
    return err.getResponse();
  }
  private static axiosErrorException(err: BadRequestException) {
    return { section: 'public', value: PublicEnum.PUBLIC_ERROR };
  }
  
  static async errorHandler(err: any) {
    if (err.constructor.name == 'QueryFailedError')
      return this.handlerQueryFailedError(err);
    if (err.constructor.name == 'Error') return this.handlerError(err);
    if (err.constructor.name == 'BadRequestException')
      return this.handlerBadException(err);
    if (err.constructor.name == 'AxiosError')
      return this.axiosErrorException(err);
  }
}
