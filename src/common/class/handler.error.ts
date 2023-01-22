import { BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { QueryFailedError } from 'typeorm';
import { CrudBackendEnum } from '../translate/enums/crud-backend.enum';
import { CrudFrontendEnum } from '../translate/enums/crud-frontend.enum';
import { PublicEnum } from '../translate/enums/public.enum';
import { UserEnum } from '../translate/enums/user.enum';

export class HandlerError {
  handlerException400(arg0: string, result: any) {
    throw new Error('Method not implemented.');
  }
  constructor() {}
  private static handlerQueryFailedError(err: QueryFailedError) {
    if (err.driverError) {
      if (err.driverError.code == '22P02' && err.driverError.file == 'uuid.c')
        return { section: 'public', value: PublicEnum.UUID_NOT_MATCH };
      if (err.driverError.code == '42703') {
        return { section: 'public', value: PublicEnum.COLUMN_NOT_EXISTS };
      }
      if (err.driverError.code == '23505') {
        console.log(err.driverError.detail);
        console.log(err.driverError.table);

        if (
          err.driverError.detail.indexOf(
            'Key (route)=(string) already exists',
          ) != -1 &&
          err.driverError.table === 'backend'
        ) {
          return {
            section: 'crud_backend',
            value: CrudBackendEnum.ROUTE_ALREADY_EXISTS,
          };
        }
        if (
          err.driverError.detail.indexOf(
            'Key (route)=(string) already exists',
          ) != -1 &&
          err.driverError.table === 'frontend'
        )
          return {
            section: 'crud_frontend',
            value: CrudFrontendEnum.CRUD_FRONTEND_ALREADY_EXISTS,
          };
        if (
          err.driverError.detail.indexOf(
            'already exists',
          ) != -1 &&
          err.driverError.table === 'user'
        ) {
          console.log('hereeeeeeeeeeeeeeee');

          return {
            section: 'user',
            value: UserEnum.USER_ALREADY_EXISTS,
          };
        }
      }

      if (err.driverError.code == '23503') {
        return {
          section: 'public',
          value: PublicEnum.DELETE_DENAY_RECORD_EXISTS_IN_RELATION,
        };
      }

      if (
        err.driverError.code == '22P02' &&
        err.driverError.message.indexOf('invalid input value for enum') != -1
      ) {
        return {
          section: 'public',
          value: PublicEnum.INVALID_INPUT_FOR_ENUM,
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

  private static handlerUnAuthorizedException(err: UnauthorizedException) {
    console.log('herereeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrr');

    return { section: 'public', value: PublicEnum.ACCESS_IS_DENIDE };
  }
  static async errorHandler(err: any) {
    if (err.constructor.name == 'QueryFailedError')
      return this.handlerQueryFailedError(err);
    if (err.constructor.name == 'Error') return this.handlerError(err);
    if (err.constructor.name == 'BadRequestException')
      return this.handlerBadException(err);
    if (err.constructor.name == 'AxiosError')
      return this.axiosErrorException(err);
    if (err.constructor.name == 'Unauthorized')
      return this.handlerUnAuthorizedException(err);
    return this.handlerBadException(err);
  }
}
