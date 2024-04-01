import { VALIDATIONS,MSISDN_FORMAT_TYPE } from '../const';

export class Common {
  convertToInternationalMobile(mobile: string) {
    return `${VALIDATIONS.SL_COUNTRY_CODE}${mobile.substring(
      mobile.length - 9,
      mobile.length,
    )}`;
  }

  generateURLParam(params) {
    return new URLSearchParams(params).toString();
  }

  validateMobileNumber(value) {
    const status = true;
    const mob = /^((947)(0|1|2|4|5|6|7|8)[0-9]{7})$/;
    if (!value) {
      return !status;
    }
    const mobile = this.convertToInternationalMobile(value);
    const splitMob = mobile.split('+');
    
    if (!mob.test(splitMob[1])) {
      return !status;
    } else {
      return status;
    }
  }
  formatHelperName(value){
    return value.replace(/\s+/g, '').toLowerCase();
  }

  formatMobile(msisdn:string,type){
    const mobile = this.convertToInternationalMobile(msisdn);
    const splitMob = (type === MSISDN_FORMAT_TYPE.MIFE) ? mobile.split('+94') :mobile.split('+');
    return splitMob[1];
  }

  validateApplicationDto(appId, deviceId) {
    const status = true;
    if (!appId) {
      return !status;
    } else if (!deviceId) {
      return !status;
    } else {
      return status;
    }
  }
}
