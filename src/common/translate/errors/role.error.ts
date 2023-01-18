import { RoleEnum } from "../enums/role.enum";  

export default {
  section: 'role',
  values: {
    ROLE_NOT_EXISTS: {
      key: 100000,
      value: RoleEnum.ROLE_NOT_EXISTS,
    },
    ROLE_NOT_ALREADY_EXISTS: {
      key: 100001,
      value: RoleEnum.ROLE_NOT_ALREADY_EXISTS,
    },
  },
};
