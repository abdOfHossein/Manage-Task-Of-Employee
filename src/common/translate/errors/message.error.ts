import { MessageEnum } from '../enums/message.enum';

export default {
  section: 'message',
  values: {
    MESSAGE_NOT_EXISTS: {
      key: 100000,
      value: MessageEnum.MESSAGE_NOT_EXISTS,
    },
    MESSAGE_ALREADY_EXISTS: {
      key: 100001,
      value: MessageEnum.MESSAGE_ALREADY_EXISTS,
    },
  },
};
