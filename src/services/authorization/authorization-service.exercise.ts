import {User} from '@/types/user-types'
import {getAuthUser, hasRequiredRole} from '../authentification/auth-service'
import {RoleEnum} from '../authentification/type'
import {getBankAccountByIdDao} from '@/db/repositories/user-repository'

//🐶 Implémente les 3 fonctions
const isAdminOrOwner = (authUser: User, ownerId: string): boolean => {
  // Cette fonction sera utile dans les fonctions suivantes
  //
  // 🐶 Utilise 'hasRoleAdmin' pour vérifier si l'utilisateur est un admin
  // 🐶 Vérifie si l'utilisateur est le propriétaire de la ressource
  return true
}

export const canReadOwn = async (resourceOwnerId?: string) => {
  // 🐶 Implemente une fonction qui verifie si la ressource 'resourceOwnerId'
  // appartient au user connecté

  // 🐶 Utilise 'getAuthUser' pour récupérer l'utilisateur connecté
  // 🐶 Utilise 'isAdminOrOwner' pour vérifier si l'utilisateur est admin ou propri
  return true
}

export const canReadBankAccount = async (bankAccountId?: string) => {
  // 🐶 Implémente un fonction qui vérifie
  // si le user connecté peut lire un compte bancaire particulier
  // 🐶 Utilise 'getBankAccountByIdDao' pour récupérer le compte bancaire
  // 🐶 Utilise 'canReadOwn' pour vérifier si l'utilisateur peut lire le compte
  return true
}

export const hasRoleAdmin = (authUser: User) => {
  return hasRequiredRole(authUser as User, RoleEnum.ADMIN)
}
