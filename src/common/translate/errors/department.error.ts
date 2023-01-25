import { DepartmentEnum } from '../enums/department.enum';

export default {
  section: 'department',
  values: {
    DEPARTMENT_NOT_EXISTS: {
      key: 100000,
      value: DepartmentEnum.DEPARTMENT_NOT_EXISTS,
    },
    DEPARTMENT_ALREADY_EXISTS: {
      key: 100001,
      value: DepartmentEnum.DEPARTMENT_ALREADY_EXISTS,
    },
    DEPARTMENT_HAS_USER: {
      key: 100002,
      value: DepartmentEnum.DEPARTMENT_HAS_USER,
    },
  },
};
