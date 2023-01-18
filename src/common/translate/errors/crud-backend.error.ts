import { CrudBackendEnum } from '../enums/crud-backend.enum';

export default {
  section: 'crud_backend',
  values: {
    CRUD_BACKEND_NOT_EXISTS: {
      key: 100000,
      value: CrudBackendEnum.CRUD_BACKEND_NOT_EXISTS,
    },
    ROUTE_ALREADY_EXISTS: {
      key: 100001,
      value: CrudBackendEnum.ROUTE_ALREADY_EXISTS,
    },
  },
};
