import { TaskEnum } from '../enums/task.enum';

export default {
  section: 'task',
  values: {
    TASK_NOT_EXISTS: {
      key: 100000,
      value: TaskEnum.TASK_NOT_EXISTS,
    },
    TASK_ALREADY_EXISTS: {
      key: 100001,
      value: TaskEnum.TASK_ALREADY_EXISTS,
    },
  },
};
