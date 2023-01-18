import { MenuEnum } from '../enums/menu.enum';

export default {
  section: 'menu',
  values: {
    MENU_NOT_EXISTS: { key: 100000, value: MenuEnum.MENU_NOT_EXISTS },
    MENU_ALREADY_EXISTS: { key: 100001, value: MenuEnum.MENU_ALREADY_EXISTS },
  },
};
