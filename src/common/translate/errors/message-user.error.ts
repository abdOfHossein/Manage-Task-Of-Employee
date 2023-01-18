import { MessageUserEnum } from '../enums/message-user.enum';

export default {
  section: 'message-user',
  values: {
    MESSAGE_USER_NOT_EXISTS: {
      key: 100000,
      value: MessageUserEnum.MESSAGE_USER_NOT_EXISTS,
    },
    MESSAGE_USER_ALREADY_EXISTS: {
      key: 100001,
      value: MessageUserEnum.MESSAGE_USER_ALREADY_EXISTS,
    },
  },
};
