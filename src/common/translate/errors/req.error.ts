import { ReqEnum } from '../enums/req.enum';

export default {
  section: 'req',
  values: {
    REQ_NOT_EXISTS: {
      key: 100000,
      value: ReqEnum.REQ_NOT_EXISTS,
    },
    REQ_ALREADY_EXISTS: {
      key: 100001,
      value: ReqEnum.REQ_ALREADY_EXISTS,
    },
  },
};
