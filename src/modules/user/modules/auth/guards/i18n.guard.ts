import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { getI18nContextFromRequest } from "nestjs-i18n";

@Injectable()
export class I18nGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let response = context.switchToHttp().getResponse();
    console.log(request.i18nLang);
    const i18n = getI18nContextFromRequest(request)
    console.log('current language', i18n.lang);

    return true;
  }
}