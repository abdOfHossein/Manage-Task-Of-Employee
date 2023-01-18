import { TaskBlockOperationEnum } from '../enums/task-block-operation.enum';

export default {
  section: 'task_block_operation',
  values: {
    TASK_BLOCK_OPERATION_NOT_EXISTS: {
      key: 100000,
      value: TaskBlockOperationEnum.TASK_BLOCK_OPERATION_NOT_EXISTS,
    },
    TASK_BLOCK_OPERATION_ALREADY_EXISTS: {
      key: 100001,
      value: TaskBlockOperationEnum.TASK_BLOCK_OPERATION_ALREADY_EXISTS,
    },
  },
};
