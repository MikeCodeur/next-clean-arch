import {logger} from '../../../logger'
import * as productServiceMethods from '../product-service'

// Définir le type générique pour une fonction asynchrone
type AsyncFunction<T> = (...args: unknown[]) => Promise<T>

// Wrapper avec interception pour logger avant et après l'exécution d'une fonction asynchrone
const withInterceptor = <T>(
  fn: AsyncFunction<T>,
  functionName: string
): AsyncFunction<T> => {
  return async (...args: unknown[]): Promise<T> => {
    logger.info(
      `Appel de la fonction ${functionName} avec les arguments : ${JSON.stringify(args)}`
    )

    try {
      const result = await fn(...args)
      logger.info(
        `Résultat de la fonction ${functionName} : ${JSON.stringify(result)}`
      )
      return result
    } catch (error) {
      logger.error(
        `Erreur dans la fonction ${functionName} : ${(error as Error).message}`
      )
      throw error
    }
  }
}

// Définition d'un type générique pour les méthodes de service
type ServiceMethods = typeof productServiceMethods

// Créer un Proxy flexible pour intercepter toutes les fonctions
export const serviceInterceptor = new Proxy(productServiceMethods, {
  get(target: ServiceMethods, property: keyof ServiceMethods) {
    const originalMethod = target[property] as unknown

    // Vérifier que la propriété est bien une fonction
    if (typeof originalMethod === 'function') {
      // Retourner une nouvelle fonction qui intercepte les appels
      return async function (...args: unknown[]) {
        // logger.info(
        //   `Appel de la méthode ${String(property)} avec les arguments : ${args}`,
        //   args
        // )
        // logger.info(
        //   `2Appel de la méthode ${String(property)} avec les arguments `,
        //   {message: 'args'}
        // )
        logger.log(
          'info',
          `Appel de la méthode ${String(property)} avec les arguments :%j`,
          args
        )
        try {
          // Appel de la méthode originale
          const result = await originalMethod.apply(target, args)

          // Log du résultat
          // logger.info(
          //   `Résultat de la méthode ${String(property)} :${result}`,
          //   result
          // )
          logger.log(
            'info',
            `Résultat de la méthode ${String(property)} :%j`,
            result
          )
          return result
        } catch (error) {
          logger.error(
            `Erreur dans la méthode ${String(property)} :`,
            (error as Error).message
          )
          throw error
        }
      }
    }

    // Retourner la propriété originale si ce n'est pas une fonction
    return originalMethod
  },
})

export default withInterceptor
