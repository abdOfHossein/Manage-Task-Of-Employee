import { RelTaskEnum } from '../enums/rel-task.enum';

export default {
  section: 'rel_task',
  values: {
    REL_TASK_NOT_EXISTS: {
      key: 100000,
      value: RelTaskEnum.REL_TASK_NOT_EXISTS,
    },
    REL_TASK_ALREADY_EXISTS: {
      key: 100001,
      value: RelTaskEnum.REL_TASK_ALREADY_EXISTS,
    },
  },
};
