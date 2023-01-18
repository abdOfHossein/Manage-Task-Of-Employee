import crudBackendError from './crud-backend.error';
import crudFrontendError from './crud-frontend.error';
import {
  default as crudMenuError
} from './crud-menu.error';
import departmentRlError from './department-rl.error';
import departmentError from './department.error';
import eventError from './event.error';
import fileManagerError from './file-manager.error';
import fileError from './file.error';
import menuErrors from './menu.errors';
import messageUserError from './message-user.error';
import messageError from './message.error';
import projectError from './project.error';
import publicError from './public.error';
import relTaskError from './rel-task.error';
import reqError from './req.error';
import roleError from './role.error';
import taskBlockOperationError from './task-block-operation.error';
import taskError from './task.error';
import userError from './user.error';

export default {
  crud_frontend: crudFrontendError,
  crud_backend: crudBackendError,
  crud_menu: crudMenuError,
  department_rl: departmentRlError,
  department: departmentError,
  event: eventError,
  file_manager: fileManagerError,
  file: fileError,
  menu: menuErrors,
  message_user: messageUserError,
  message: messageError,
  project: projectError,
  public: publicError,
  rel_task: relTaskError,
  req: reqError,
  role: roleError,
  task_block_operation: taskBlockOperationError,
  task: taskError,
  user: userError,
};
