import { FileEnum } from '../enums/file.enum';
export default {
  section: 'file',
  values: {
    FILE_NOT_EXISTS: {
      key: 100000,
      value: FileEnum.FILE_NOT_EXISTS,
    },
    FILE_ALREADY_EXISTS: {
      key: 100001,
      value: FileEnum.FILE_ALREADY_EXISTS,
    },
  },
};
