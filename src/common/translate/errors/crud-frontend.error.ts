import { CrudFrontendEnum } from '../enums/crud-frontend.enum';

export default {
  section: 'crud_frontend',
  values: {
    CRUD_FRONTEND_NOT_EXISTS: {
      key: 100000,
      value: CrudFrontendEnum.CRUD_FRONTEND_NOT_EXISTS,
    },
    CRUD_FRONTEND_ALREADY_EXISTS: {
      key: 100001,
      value: CrudFrontendEnum.CRUD_FRONTEND_ALREADY_EXISTS,
    },
  },
};
