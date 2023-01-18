import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import errors from 'src/common/translate/errors/index';
import { Translate } from 'src/common/translate/translate.class';
import { MapperLanguageEnum } from '../../common/enums/mapper.language.enum';

@Injectable()
export class TranslateService {
  constructor(private readonly i18nService: I18nService) {}
  getErrors(section: string, value: string): Record<string, any> | boolean {
    console.log('errors', errors);
    console.log('errors[section]', errors[section]);
    console.log('errors[section].values[value]', errors[section].values[value]);
    console.log('errors[section].values[value]', errors[section].values[value]);
    if (errors[section] == undefined) return false;
    if (errors[section].values[value] == undefined) return false;
    return errors[section].values[value];
  }

  async translateError(
    section: string,
    property: any,
    lang: string,
    args: any = null,
  ): Promise<Object> {
    
    const errors = this.getErrors(section, property);
    console.log('errors', errors);
    const translate = new Translate();
    console.log('translate', translate);
    translate.code = errors['value'];
    console.log('translate', translate);

    const i18n = `i18n.${section}.${errors['value']}`;
    console.log('lang',lang);
    console.log('MapperLanguageEnum[lang]',MapperLanguageEnum[lang]);
    translate.message = await this.i18nService.translate(i18n, {
      lang: MapperLanguageEnum[lang],
      args,
    });
    console.log('i18n', i18n);
    return { section, key: errors['key'], message: translate.message };
  }

  async throwError(
    section: string,
    lang: string,
    error_code: string,
  ): Promise<boolean> {
    const result = await this.translateError(section, error_code, lang);
    throw new BadRequestException(result);
  }
}
