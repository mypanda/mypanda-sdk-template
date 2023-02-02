import { isArray, isPlainObject } from "./index"

export enum LOGGER_TYPE {
  OFF = -1,
  ALL = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

function getColor(type: LOGGER_TYPE) {
  switch (type) {
    case LOGGER_TYPE.INFO: return '\x1b[32;1m'
    case LOGGER_TYPE.ERROR: return '\x1b[31;1m'
    case LOGGER_TYPE.WARN: return '\x1b[33;1m'
    case LOGGER_TYPE.DEBUG: return '\x1b[35;1m'
    default: return '\x1b[0m'
  }
}

export default class Logger {
  private level: LOGGER_TYPE = process.env.NODE_ENV === 'development' ? LOGGER_TYPE.ALL : LOGGER_TYPE.INFO
  static instance: Logger
  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }
  private logger(argv: any, type: LOGGER_TYPE) {
    switch (this.level) {
      case LOGGER_TYPE.OFF: break
      case LOGGER_TYPE.DEBUG: if (type > LOGGER_TYPE.DEBUG) return
      case LOGGER_TYPE.INFO: if (type > LOGGER_TYPE.INFO) return
      case LOGGER_TYPE.WARN: if (type > LOGGER_TYPE.WARN) return
      case LOGGER_TYPE.ERROR: if (type > LOGGER_TYPE.ERROR) return
    }
    this.print(argv, type)
  }
  public print(argv: any[], type: LOGGER_TYPE) {
    argv.unshift(`[${getColor(type)}${LOGGER_TYPE[type]}\x1b[0m]`)

    const str = argv.map(i => {
      if (isPlainObject(i) || isArray(i)) return JSON.stringify(i)
      return i
    })
    window.console.log.apply(window, str)
  }
  public setLevel(level: number) {
    this.level = level
  }
  public log(...argv: any[]) {
    this.logger(argv, LOGGER_TYPE.INFO)
  }
  public debug(...argv: any[]) {
    this.logger(argv, LOGGER_TYPE.DEBUG)
  }
  public info(...argv: any[]) {
    this.logger(argv, LOGGER_TYPE.INFO)
  }
  public warn(...argv: any[]) {
    this.logger(argv, LOGGER_TYPE.WARN)
  }
  public error(...argv: any[]) {
    this.logger(argv, LOGGER_TYPE.ERROR)
  }
}