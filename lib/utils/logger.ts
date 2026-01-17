/**
 * Simple logger utility for application-wide logging
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

class Logger {
  private prefix: string

  constructor(prefix: string = 'FrankX') {
    this.prefix = prefix
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString()
    const formattedMessage = `[${timestamp}] [${this.prefix}] [${level.toUpperCase()}] ${message}`

    switch (level) {
      case 'error':
        console.error(formattedMessage, ...args)
        break
      case 'warn':
        console.warn(formattedMessage, ...args)
        break
      case 'debug':
        if (process.env.NODE_ENV === 'development') {
          console.debug(formattedMessage, ...args)
        }
        break
      case 'info':
      default:
        console.log(formattedMessage, ...args)
    }
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args)
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args)
  }

  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args)
  }
}

export const logger = new Logger()
export default logger
