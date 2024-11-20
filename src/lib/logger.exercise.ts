import winston from 'winston'

export const logger = winston.createLogger({
  // 🐶 ajoute le niveau de log
  // level: process.env.LOG_LEVEL || 'info',

  // 🐶 ajoute le format de log avec
  // winston.format.combine
  // winston.format.timestamp
  // winston.format.colorize
  // winston.format.printf

  transports: [new winston.transports.Console()],
})
