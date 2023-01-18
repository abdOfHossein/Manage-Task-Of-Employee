import { FileManagerEnum } from "../enums/file-manager.enum";  
export default {
  section: 'file_manager',
  values: {
    FILEMANAGER_NOT_EXISTS: {
      key: 100000,
      value: FileManagerEnum.FILEMANAGER_NOT_EXISTS,
    },
    FILEMANAGER_ALREADY_EXISTS: {
      key: 100001,
      value: FileManagerEnum.FILEMANAGER_ALREADY_EXISTS,
    },
  },
};
