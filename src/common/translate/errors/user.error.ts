import { UserEnum } from '../enums/user.enum';
export default {
  section: 'user',
  values: {
    USER_NOT_EXISTS: {
      key: 100000,
      value: UserEnum.USER_NOT_EXISTS,
    },
    USER_ALREADY_EXISTS: {
      key: 100001,
      value: UserEnum.USER_ALREADY_EXISTS,
    },
  },
};
