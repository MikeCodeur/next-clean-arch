import winston from 'winston'
//import {Loggly} from 'winston-loggly-bulk'

// Création d'un logger Winston
export const logger = winston.createLogger({
  level: 'info', // Définit le niveau de log (info, warn, error, etc.)
  format: winston.format.combine(
    winston.format.timestamp(), // Ajoute un timestamp à chaque log
    winston.format.printf(({level, message, timestamp}) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`
    })
  ),
  transports: [
    new winston.transports.Console(), // Utilise la sortie console pour Vercel
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.cli()
      ),
    }),
    // Other logger
    // new Loggly({
    //   token: 'your-loggly-token', // Remplace par ton token Loggly
    //   subdomain: 'your-loggly-subdomain', // Remplace par ton sous-domaine Loggly
    //   tags: ['Winston-NodeJS'], // Ajoute des tags pour identifier les logs
    //   json: true,  // Envoie les logs au format JSON
    // }),
  ],
})
