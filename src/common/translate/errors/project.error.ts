import { ProjectEnum } from '../enums/project.enum';

export default {
  section: 'project',
  values: {
    PROJECT_NOT_EXISTS: {
      key: 100000,
      value: ProjectEnum.PROJECT_NOT_EXISTS,
    },
    PROJECT_ALREADY_EXISTS: {
      key: 100001,
      value: ProjectEnum.PROJECT_ALREADY_EXISTS,
    },
  },
};
