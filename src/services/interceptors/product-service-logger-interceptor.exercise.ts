import {logger} from '@/lib/logger'
import * as productServiceMethods from '../product-service'

type ServiceMethods = typeof productServiceMethods

const productServiceInterceptor = new Proxy(productServiceMethods, {
  get(target: ServiceMethods, property: keyof ServiceMethods) {
    const originalMethod = target[property] as unknown

    if (typeof originalMethod === 'function') {
      return async function (...args: unknown[]) {
        // 🐶 originalMethod.apply est l'apppel à la fonction
        // target est l'objet sur lequel la méthode est appelée
        // args est un tableau des arguments passés à la méthode

        // 🐶1.  Dans un premier temps log l'appelle de la fonction en info
        // et en debug avec les arguements
        // 🤖
        // logger.info(`Appel de la méthode ${String(property)}`)
        // logger.debug(
        //   `Appel de la méthode ${String(property)} avec les arguments `,
        //   {args}
        // )
        return originalMethod.apply(target, args)
        // 🐶 2. Ensuite wrappe dans un try catch et log en error les error si error
        // Log le resultat de la fonction en info et debug (avec les data)

        // En bonus tu opeux differencier les erreur de types AuthorizationErrors
      }
    }
    return originalMethod
  },
})

export default productServiceInterceptor // as ServiceMethods
