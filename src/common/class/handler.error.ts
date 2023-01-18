import { BadRequestException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { CrudBackendEnum } from '../translate/enums/crud-backend.enum';
import { CrudFrontendEnum } from '../translate/enums/crud-frontend.enum';
import { CrudMenuEnum } from '../translate/enums/crud-menu.enum';
import { DepartmentRlEnum } from '../translate/enums/department-rl.enum';
import { DepartmentEnum } from '../translate/enums/department.enum';
import { EventEnum } from '../translate/enums/event.enum';
import { FileManagerEnum } from '../translate/enums/file-manager.enum';
import { FileEnum } from '../translate/enums/file.enum';
import { MenuEnum } from '../translate/enums/menu.enum';
import { MessageUserEnum } from '../translate/enums/message-user.enum';
import { MessageEnum } from '../translate/enums/message.enum';
import { ProjectEnum } from '../translate/enums/project.enum';
import { PublicEnum } from '../translate/enums/public.enum';
import { RelTaskEnum } from '../translate/enums/rel-task.enum';
import { ReqEnum } from '../translate/enums/req.enum';
import { RoleEnum } from '../translate/enums/role.enum';
import { TaskBlockOperationEnum } from '../translate/enums/task-block-operation.enum';
import { TaskEnum } from '../translate/enums/task.enum';
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
        if (
          err.driverError.detail.indexOf(
            '("countryCurrencyRlId", "bankMasterId")',
          ) != -1
        )
          return {
            section: 'crud_backend',
            value: CrudBackendEnum.ROUTE_ALREADY_EXISTS,
          };
        if (
          err.driverError.detail.indexOf('("countryCurrencyRlId", "ipgId")') !=
          -1
        )
          return {
            section: 'crud_frontend',
            value: CrudFrontendEnum.CRUD_FRONTEND_ALREADY_EXISTS,
          };
        if (
          err.driverError.detail.indexOf('("countryId", "userId", mobile)') !=
          -1
        )
          return {
            section: 'department-rl',
            value: DepartmentRlEnum.DEPARTMENT_RL_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('("archId", "cryptoId")') != -1)
          return {
            section: 'event',
            value: EventEnum.EVENT_ALREADY_EXISTS,
          };
        if (
          err.driverError.detail.indexOf('("speedId", "smartContractId")') != -1
        )
          return {
            section: 'department',
            value: DepartmentEnum.DEPARTMENT_ALREADY_EXISTS,
          };
        if (
          err.driverError.detail.indexOf(' ("fromCryptoId", "toCryptoId")') !=
          -1
        )
          return {
            section: 'file_manager',
            value: FileManagerEnum.FILEMANAGER_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('mobile') != -1)
          return {
            section: 'file',
            value: FileEnum.FILE_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('country') != -1)
          return {
            section: 'menu',
            value: MenuEnum.MENU_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso2') != -1)
          return {
            section: 'message-user',
            value: MessageUserEnum.MESSAGE_USER_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'message',
            value: MessageEnum.MESSAGE_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'project',
            value: ProjectEnum.PROJECT_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'rel_task',
            value: RelTaskEnum.REL_TASK_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'req',
            value: ReqEnum.REQ_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'role',
            value: RoleEnum.ROLE_NOT_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'task_block_operation',
            value: TaskBlockOperationEnum.TASK_BLOCK_OPERATION_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'task',
            value: TaskEnum.TASK_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'user',
            value: UserEnum.USER_ALREADY_EXISTS,
          };
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
