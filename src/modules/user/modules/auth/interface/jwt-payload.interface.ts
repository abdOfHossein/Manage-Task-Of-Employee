export interface JwtPayloadInterface {
  data?: string;
  key?: string;
  roles?: any[];
  unq?: string;
  currentRole?: string;
}
