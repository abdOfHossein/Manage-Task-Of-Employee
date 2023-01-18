import { DepartmentRlEnum } from '../enums/department-rl.enum';

export default {
  section: 'department-rl',
  values: {
    DEPARTMENT_RL_NOT_EXISTS: {
      key: 100000,
      value: DepartmentRlEnum.DEPARTMENT_RL_NOT_EXISTS,
    },
    DEPARTMENT_RL_ALREADY_EXISTS: {
      key: 100001,
      value: DepartmentRlEnum.DEPARTMENT_RL_ALREADY_EXISTS,
    },
  },
};
