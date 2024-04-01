import * as dotenv from 'dotenv';
import { getEnvPath } from '../config/env.helper';
const envFilePath: string = getEnvPath(`./envfiles`);
dotenv.config({ path: envFilePath });
import exp = require('constants');
import * as moment from 'moment';
export const LOG_PATH = process.env.LOG_PATH;
export const CID_BASE_URL = process.env.CID_BASE_URL;
export const CID_GRANT_TYPE = process.env.CID_GRANT_TYPE;
export const CID_CLIENT_ID = process.env.CID_CLIENT_ID;
export const CID_CLIENT_SECRET = process.env.CID_CLIENT_SECRET;
export const CID_REDIRECT_URL = process.env.CID_REDIRECT_URL;
export const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY_PATH;
export const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY_PATH;
export const TOKEN_EXP = process.env.JWT_TOKEN_EXP; //days

export const MIFE_BASIC_TOKEN = process.env.MIFE_BASIC_TOKEN;
export const MIFE_STG_BASE_URL = process.env.MIFE_STG_BASE_URL;

export const STATUS_CODE = {
  SUCCESS: 200,
  MANDATORY_PARAM_MISS: {
    HTTP_CODE: 400,
    STATUS_CODE: 9000,
    MESSAGE: 'Mandatory parameter missing !',
  },
};

export const END_POINT = {
  VERIFY_OTP: '/api/user/verify-otp-code',
  CID_TOKEN: 'oauth2/token',
  CID_LOG_OUT: 'authproxy/logout', 
  NOTIFICATION_SERVICE_SEND_OTP: 'apicall/superapp-notification-service/0.0.1',
  MIFE_TOKEN: 'apicall/token',
  FREEZONE_BONUS: 'apicall/customermgt/0.0.1/reward/external/provision',
  SELFCARE_CX_CONNECTION:
    'apicall/crm/Sc/Cx/v1.0.0/customer/connectionReference/',
};

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const VALIDATIONS = {
  INVALID_PHONE_NUMBER: 'Invalid phone number',

  SL_COUNTRY_CODE: '+94',
  INVALID_MOBILE: 'Invalid Mobile number',
  VERIFIED_MOB: 'Fetch verified mobile',
  DTO_VALIDATION_ERROR: 'Error in DTO validation',
  USER_EXIST: 'User already exist',
  USER_NOT_EXIST: 'User does not exist',
  NO_CACHE: 'Cannot find cached data',
  INAVALID_LENGTH: 'Invalid mobile number length ',
  INVALID_MSISDN: 'Invalid msisdn number',
  OTP_RETRY_WAIT: 'Waiting time to resend OTP',
};

export const ERRORS = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

export const LOG_TYPE = {
  LOGIN_REQ: 'login_request',
  LOGIN_ERROR: 'login_error',
  UPDATE_SUCCESS: 'update_success',
  UPDATE_FAIL: 'update_fail',
  RETRIEVE_REQ: 'retrieve_request',
  RETRIEVE_ERROR: 'retrieve_error',
  LOG_OUT_ERROR: 'logout_error',
  OTP_REQUEST: 'OTP_request',
};

export const LOG_MSG = {
  VERIFY_MOBILE: 'verify mobile request',
  UPDATE_USER: 'user successfully updated',
  UPDATE_UNSUCCESFULL: 'failed to update',
  GET_USER: 'get user request',
  CID_AUTH: 'user authentication request',
  LOG_OUT: 'User logout request',
  OPT_GENERATION_SUCCESS: 'OTP generation success'
};

export const STRING = {
  USERNAME: 'username',
  PASSWORD: 'password',
  SUCCESS: 'Success',
  FAIL: 'Fail',
  CREATE: 'Create',
  UPDATE: 'Update',
  USER: 'User',
  RETRIEVE: 'Retrieve',
  INVALID_USER: 'User not exist',
  AUTHENTICATE: 'Authenticate',
  LOG_OUT: 'Logout',
  CLAIM_BONUS: 'Bonus claim',
  MSISDN_LENGTH: 10,
  SECONDS: 'Seconds',
  OTP: 'OTP',
  OTP_RETRY_INTERVAL: 45,
  NO_CONNECTION_FOUND: 'No connection found',
};

export const PLATFORMS = ['WEB', 'MOBILE'];
export const MIFE_REQUEST = {
  AUTH_BODY: { grant_type: 'client_credentials' },
};

export const FREEZONE_BONUS = {
  SUCCESS_STRING: '200',
  CHANNEL: 'super-app',
  CAMPAIGN: 'Awrudu_campaign',
  BONUS: '10 SMS',
  BONUS_DESC: '10 SMS free for any network',
  EXPIRE: moment().add(7, 'd').format('YYYY-MM-DD'),
};

export const OTP_GENERATION = {
  NumberOne: 1000,
  NumberTwo: 9000,
};