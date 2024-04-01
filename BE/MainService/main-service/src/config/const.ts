import 'dotenv/config';
export const LOG_PATH = process.env.LOG_PATH;
export const MIFE_TOKEN = process.env.MIFE_TOKEN;
export const MIFE_BASE_URL = process.env.MIFE_BASE_URL;
export const MIFE_BASIC_TOKEN = process.env.MIFE_BASIC_TOKEN;
export const MIFE_STG_BASE_URL = process.env.MIFE_STG_BASE_URL;
export const MEGA_GAMES_URL = process.env.MEGA_GAMES_URL;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const SUPPER_APP_REF = 'SUPER_APP'
export const EXPIRATION_DURATION = 3600;

export const STATUS_CODE = {
  MANDATORY_PARAM_MISS: {
    HTTP_CODE: 400,
    STATUS_CODE: 9000,
    MESSAGE: 'Mandatory parameter missing !',
  },
};

export const END_POINT = {
  VERIFY_OTP: '/api/user/verify-otp-code',
  MIFE_AUTH : 'apicall/dialog-loyalty-common-auth/authenticate/1.0',
  MIFE_TOKEN : 'apicall/token',
  MIFE_FREEZONE_AUTH:'authRequest'
};

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const VALIDATIONS = {
  SL_COUNTRY_CODE: '+94',
  INVALID_MOBILE: 'Invalid Mobile number',
  VERIFIED_MOB: 'Fetch verified mobile',
  DTO_VALIDATION_ERROR: 'Error in DTO validation',
  USER_EXIST : 'User already exist',
  APP_NOT_EXIST : 'Invalid Application',
  INVALID_PARAMS : 'Invalid parameters',
};

export const ERRORS = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  REDIS_CONNECTION_ERROR: 'Redis connection error',
};

export const LOG_TYPE = {
  AUTHENTICATION_REQ: 'authentication_request',
  LOGIN_ERROR: 'login_error',
};

export const LOG_MSG = {
  AUTH_MINI_APP: 'Mini App authentication',
};

export const STRING = {
  USERNAME: 'username',
  PASSWORD: 'password',
  SUCCESS: 'Success',
  FAIL: 'fail',
  CREATE : 'Create',
  USER : 'User',
  AUTH : 'Authentication',
  ERROR: 'Error'
};

export const CHANNELS ={
  MOBILE:'MOBILE',
  WEB : 'WEB'
}

export const MSISDN_FORMAT_TYPE ={
  COMMON:'COMMON',
  MIFE:'MIFE'
}
export const MIFE_REQUEST ={
  AUTH_BODY : {'grant_type': 'client_credentials' }
}