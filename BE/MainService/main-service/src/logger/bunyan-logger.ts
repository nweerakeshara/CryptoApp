import fs = require('fs');
import moment = require('moment');
import { LOG_PATH } from '../config/const';
import bunyan = require('bunyan');

if (!fs.existsSync(LOG_PATH)) {
  fs.mkdirSync(LOG_PATH, { recursive: true });
}
if (!fs.existsSync(LOG_PATH + 'info')) {
  fs.mkdirSync(LOG_PATH + 'info');
}
if (!fs.existsSync(LOG_PATH + 'error')) {
  fs.mkdirSync(LOG_PATH + 'error');
}
if (!fs.existsSync(LOG_PATH + 'warn')) {
  fs.mkdirSync(LOG_PATH + 'warn');
}
if (!fs.existsSync(LOG_PATH + 'fatal')) {
  fs.mkdirSync(LOG_PATH + 'fatal');
}

const bunyanInfoLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  // streams: [{
  //     level : 'info',
  //     stream : process.stdout
  // }]
  streams: [
    {
      level: bunyan.INFO,
      path: LOG_PATH + 'info' + '/' + moment().format('YYYYMMDD') + '-info.log',
    },
  ],
});

const bunyanErrorLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  // streams: [{
  //     level : 'error',
  //     stream : process.stdout
  // }]
  streams: [
    {
      level: bunyan.ERROR,
      path:
        LOG_PATH + 'error' + '/' + moment().format('YYYYMMDD') + '-error.log',
    },
  ],
});

const bunyanWarnLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  // streams: [{
  //     level : 'warn',
  //     stream : process.stdout
  // }]
  streams: [
    {
      level: bunyan.WARN,
      path: LOG_PATH + 'warn' + '/' + moment().format('YYYYMMDD') + '-warn.log',
    },
  ],
});

const bunyanFatalLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  // streams: [{
  //     level : 'fatal',
  //     stream : process.stdout
  // }]
  streams: [
    {
      level: bunyan.FATAL,
      path:
        LOG_PATH + 'fatal' + '/' + moment().format('YYYYMMDD') + '-fatal.log',
    },
  ],
});
export class BunyanLogger {
  info(payload: any) {
    bunyanInfoLogger.info({ payload });
  }
  error(payload: any) {
    bunyanErrorLogger.error({ payload });
  }
  warn(payload: any) {
    bunyanWarnLogger.warn({ payload });
  }
  fatal(payload: any) {
    bunyanFatalLogger.fatal({ payload });
  }
}
