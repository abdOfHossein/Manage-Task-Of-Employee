// import { QueryFailedError } from "typeorm";
// import { BadRequestException } from "@nestjs/common";
// import { PublicEnum } from "../translate/enums/public.enum";
// import { CountryEnum } from "../translate/enums/country.enum";
// import { IpgEnum } from "../translate/enums/ipg.enum";
// import { IpEnum } from "../translate/enums/ip.enum";
// import { RoleEnum } from "../translate/enums/role.enum";
// import { ChainEnum } from "../translate/enums/chain.enum";
// import { CurrencyEnum } from "../translate/enums/currency.enum";

// export class HandlerError {
//   constructor() {
//   }
//   private static handlerQueryFailedError(err: QueryFailedError) {
//     if (err.driverError) {
//       if (err.driverError.code == "22P02" && err.driverError.file == "uuid.c") return { section: "public", value: PublicEnum.UUID_NOT_MATCH }
//       if (err.driverError.code == "42703") {
//         return { section: "public", value: PublicEnum.COLUMN_NOT_EXISTS }
//       }
//       if (err.driverError.code == "23505") {
//         if (err.driverError.detail.indexOf('("countryCurrencyRlId", "bankMasterId")') != -1) return { section: "currency", value: CurrencyEnum.BANK_ALREADY_EXISTS_IN_CURRENCY }
//         if (err.driverError.detail.indexOf('("countryCurrencyRlId", "ipgId")') != -1) return { section: "ipg", value: IpgEnum.IPG_ALREADY_EXISTS_IN_COUNTRY_CURRENCY }
//         if (err.driverError.detail.indexOf('("countryId", "userId", mobile)') != -1) return { section: "public", value: PublicEnum.PHONE_NUMBER_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('("archId", "cryptoId")') != -1) return { section: "chain", value: ChainEnum.SMART_CONTRACT_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('("speedId", "smartContractId")') != -1) return { section: "chain", value: ChainEnum.SMART_CONTRACT_WITH_SPEED_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf(' ("fromCryptoId", "toCryptoId")') != -1) return { section: "chain", value: ChainEnum.EXCHANGE_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('mobile') != -1) return { section: "public", value: PublicEnum.PHONE_NUMBER_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('country') != -1) return { section: "country", value: CountryEnum.COUNTRY_NAME_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('iso2') != -1) return { section: "country", value: CountryEnum.COUNTRY_ISO2_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('iso3') != -1) return { section: "country", value: CountryEnum.COUNTRY_ISO3_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('name_ipg') != -1) return { section: "ipg", value: IpgEnum.IPG_NAME_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('name_role') != -1) return { section: "role", value: RoleEnum.ROLE_NAME_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('version_crypto') != -1) return { section: "chain", value: ChainEnum.VERSION_CRYPTO_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('(id_smart_contract)') != -1) return { section: "chain", value: ChainEnum.ID_SMART_CONTRACT_ALREADY_EXISTS }
//         if (err.driverError.detail.indexOf('(symbol_crypto)') != -1) return { section: "chain", value: ChainEnum.SYMBOL_CRYPTO_ALREADY_EXIST }


//       }
//       if (err.driverError.code == "23503") {
//         return { section: "public", value: PublicEnum.DELETE_DENAY_RECORD_EXISTS_IN_RELATION }
//       }
//     }

//   }
//   private static handlerStringError(err: String) {
//     if (err.indexOf('Validate TransferContract error, balance is not sufficient') != -1)
//       return { section: "chain", value: ChainEnum.BALANCE_IS_NOT_SUFFICIENT }

//   }


//   private static handlerError(err: Error) {
//     if (err.name == "AddressError") {
//       return { section: "ip", value: IpEnum.IP_ADDRESS_ERROR }
//     } else if (err.name == "Error") return JSON.parse(err.message)


//   }
//   private static handlerBadException(err: BadRequestException) {
//     return err.getResponse()
//   }
//   private static axiosErrorException(err: BadRequestException) { 
//     return { section: "public", value: PublicEnum.PUBLIC_ERROR }
//   }
//   static async errorHandler(err: any) {
   
//     if (err.constructor.name == "QueryFailedError") return this.handlerQueryFailedError(err)
//     if (err.constructor.name == "String") return this.handlerStringError(err)
//     if (err.constructor.name == "Error") return this.handlerError(err)
//     if (err.constructor.name == "BadRequestException") return this.handlerBadException(err)
//     if (err.constructor.name == "AxiosError") return this.axiosErrorException(err);

//   }


// }