import winston from 'winston'
import fs from 'node:fs'
import path from 'node:path'
// Définir le chemin du dossier et du fichier log
const logDir = path.resolve('./logs') // Dossier courant /logs
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir) // Crée le dossier "logs" s'il n'existe pas
}
const logFile = path.join(logDir, 'application.log')
const logErrorFile = path.join(logDir, 'error.log')
const logDebugFile = path.join(logDir, 'debug.log')

const createFileFormat = () =>
  winston.format.combine(
    winston.format.timestamp({
      format: () =>
        `${new Date().toLocaleString('fr-FR', {
          timeZone: `Europe/Paris`,
        })} (paris)`,
    }),
    winston.format.printf(({timestamp, level, message, ...metadata}) => {
      const formattedMetadata =
        Object.keys(metadata).length > 0 ? ` | ${JSON.stringify(metadata)}` : ''
      return `${timestamp} [${level.toUpperCase()}]: ${message}${formattedMetadata}`
    })
  )

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.colorize(),
        winston.format.printf(({timestamp, level, message, ...metadata}) => {
          const formattedMetadata =
            Object.keys(metadata).length > 0
              ? ` | ${JSON.stringify(metadata)}`
              : ''
          return ` ${timestamp} [${level}]: ${message} ${formattedMetadata}`
        })
      ),
    }),
    new winston.transports.File({
      filename: logFile,
      level: 'info',
      format: createFileFormat(),
    }),
    new winston.transports.File({
      filename: logErrorFile,
      level: 'error',
      format: createFileFormat(),
    }),

    new winston.transports.File({
      filename: logDebugFile,
      level: 'debug',
      format: createFileFormat(),
    }),
  ],
})
