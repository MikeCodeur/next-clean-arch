import dotenv from 'dotenv'
//import path from 'path'

function initDotEnv() {
  const environment = process.env.NODE_ENV || 'development'
  let envFilePath

  // Utilisation d'un switch-case pour choisir le bon fichier .env
  switch (environment) {
    case 'production': {
      envFilePath = '.env.production'
      break
    }
    case 'test': {
      envFilePath = '.env.test'
      break
    }

    default: {
      envFilePath = '.env.development'
      break
    }
  }

  // Chargement du fichier .env correspondant
  const result = dotenv.config({path: envFilePath})

  // Gestion des erreurs
  if (result.error) {
    console.error(
      `Erreur lors du chargement du fichier ${envFilePath}:`,
      result.error
    )
  } else {
    console.log(`Environnement chargé à partir de ${envFilePath}`)
  }
}

export default initDotEnv
