import fs = require('fs');
import moment = require('moment');
import bunyan = require('bunyan');

// if (LOG_PATH) {
//   if (!fs.existsSync(LOG_PATH)) {
//     try {
//       fs.mkdirSync(LOG_PATH, { recursive: true });
//     } catch (error) {
//       console.log(error)
//     }
    
//   }
//   if (!fs.existsSync(LOG_PATH + 'info')) {
//     try {
//       fs.mkdirSync(LOG_PATH + 'info');
//     } catch (error) {
//       console.log(error)
//     }
    
//   }
//   if (!fs.existsSync(LOG_PATH + 'error')) {
//     try {
//       fs.mkdirSync(LOG_PATH + 'error');
//     } catch (error) {
//       console.log(error)
//     }
    
//   }
//   if (!fs.existsSync(LOG_PATH + 'warn')) {
//     try {
//       fs.mkdirSync(LOG_PATH + 'warn');
//     } catch (error) {
//       console.log(error)
//     }
    
//   }
//   if (!fs.existsSync(LOG_PATH + 'fatal')) {
//     try {
//       fs.mkdirSync(LOG_PATH + 'fatal');
//     } catch (error) {
      
//     }
    
//   }
// }

const bunyanInfoLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  streams: [{
      level : 'info',
      stream : process.stdout
  }]
  // streams: [
  //   {
  //     level: bunyan.INFO,
  //     path: LOG_PATH + 'info' + '/' + moment().format('YYYYMMDD') + '-info.log',
  //   },
  // ],
});

const bunyanErrorLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  streams: [{
      level : 'error',
      stream : process.stdout
  }]
  // streams: [
  //   {
  //     level: bunyan.ERROR,
  //     path:
  //       LOG_PATH + 'error' + '/' + moment().format('YYYYMMDD') + '-error.log',
  //   },
  // ],
});

const bunyanWarnLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  streams: [{
      level : 'warn',
      stream : process.stdout
  }]
  // streams: [
  //   {
  //     level: bunyan.WARN,
  //     path: LOG_PATH + 'warn' + '/' + moment().format('YYYYMMDD') + '-warn.log',
  //   },
  // ],
});

const bunyanFatalLogger = bunyan.createLogger({
  src: true,
  name: 'Super App',
  timestamp: moment(),
  version: process.env.APP_VERSION,
  env: process.env.ENVIRONMENT,
  streams: [{
      level : 'fatal',
      stream : process.stdout
  }]
  // streams: [
  //   {
  //     level: bunyan.FATAL,
  //     path:
  //       LOG_PATH + 'fatal' + '/' + moment().format('YYYYMMDD') + '-fatal.log',
  //   },
  // ],
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
