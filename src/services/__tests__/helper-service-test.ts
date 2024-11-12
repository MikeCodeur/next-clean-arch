import {type Session} from 'next-auth'
import {vi} from 'vitest'
import {getSession, getUserAuthExtented} from '../authentication/auth-service'
import {AuthUser} from '../authentication/type'

export const setupSessionMocked = async (session: Session | null = null) => {
  return vi.mocked(getSession).mockImplementation(async () => {
    return {session}
  })
}
export const setupUserAuthExtentedMocked = async (
  user: AuthUser | undefined
) => {
  return vi.mocked(getUserAuthExtented).mockImplementation(async () => {
    if (!user) return
    return user
  })
}
