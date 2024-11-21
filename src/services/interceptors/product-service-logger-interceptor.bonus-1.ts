import {logger} from '@/lib/logger'
import * as productServiceMethods from '../product-service'
import {AuthorizationError} from '@/lib/errors'

// Définition d'un type générique pour les méthodes de service
type ServiceMethods = typeof productServiceMethods

// Créer un Proxy flexible pour intercepter toutes les fonctions
const productServiceInterceptor = new Proxy(productServiceMethods, {
  get(target: ServiceMethods, property: keyof ServiceMethods) {
    const originalMethod = target[property] as unknown

    // Vérifier que la propriété est bien une fonction
    if (typeof originalMethod === 'function') {
      // Retourner une nouvelle fonction qui intercepte les appels
      return async function (...args: unknown[]) {
        logger.info(`Appel de la méthode ${String(property)}`)
        logger.debug(
          `Appel de la méthode ${String(property)} avec les arguments `,
          {args}
        )
        try {
          // Appel de la méthode originale
          const result = await originalMethod.apply(target, args)

          logger.info(`Retour de la méthode ${String(property)}`)
          logger.debug(`Résultat de la méthode ${String(property)} `, result)
          return result
        } catch (error) {
          if (error instanceof AuthorizationError) {
            logger.error(
              `Authorisation Erreur dans la méthode ${String(property)} :`,
              (error as Error).message
            )
          } else {
            logger.error(
              `Erreur dans la méthode ${String(property)} :`,
              (error as Error).message
            )
            logger.debug(
              `Erreur dans la méthode ${String(property)} : ${(error as Error).message}`,
              error
            )
          }

          throw error
        }
      }
    }

    // Retourner la propriété originale si ce n'est pas une fonction
    return originalMethod
  },
})

export default productServiceInterceptor // as ServiceMethods
