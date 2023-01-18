import { CrudMenuEnum } from "../enums/crud-menu.enum"; 

export default {
  section: 'crud_menu',
  values: {
    CRUD_MENU_NOT_EXISTS: {
      key: 100000,
      value: CrudMenuEnum.CRUD_MENU_NOT_EXISTS,
    },
    CRUD_MENU_ALREADY_EXISTS: {
      key: 100001,
      value: CrudMenuEnum.CRUD_MENU_ALREADY_EXISTS,
    },
  },
};
