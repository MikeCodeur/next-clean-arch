import {CreateUser} from '@/services/types/domain/user-types'
import {faker} from '@faker-js/faker'
import {beforeAll, describe, expect, test} from 'vitest'
import {initDrizzle} from '../repositories/management-repository'
import {
  createSessionDao,
  createUserAccountSessionDao,
  createUserDao,
  getUserByEmailDao,
  getUserByIdDao,
  getUsersDao,
} from '../repositories/user-repository'

describe.sequential('Operations for User', () => {
  beforeAll(async () => {
    await initDrizzle() // Assure-toi que la base de données est propre
  })

  test('should create a new user', async () => {
    const newUser: CreateUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'USER',
      image: null,
      emailVerified: null,
    }
    const createdUser = await createUserDao(newUser)
    expect(createdUser).toStrictEqual({
      ...newUser,
      id: createdUser.id,
    })
  })

  test('should read all users', async () => {
    const users = await getUsersDao()
    expect(users.length).toBeGreaterThan(0)
  })

  test('should read a user by ID', async () => {
    const users = await getUsersDao()
    const firstUser = users[0]
    const user = await getUserByIdDao(firstUser.id)
    expect(user).toStrictEqual(firstUser)
  })

  test('should get user by email', async () => {
    const users = await getUsersDao()
    const firstUser = users[0]
    const user = await getUserByEmailDao(firstUser.email as string)
    expect(user).toStrictEqual(firstUser)
  })

  test('should create user , account and session', async () => {
    const newUser: CreateUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'USER',
      image: null,
      emailVerified: null,
    }
    const sessionToken = Math.random().toString(36).slice(2, 15)
    const {accountCreated, session, user} = await createUserAccountSessionDao(
      newUser,
      sessionToken
    )
    expect(accountCreated).not.toBeUndefined()
    expect(accountCreated.userId).toStrictEqual(user.id)
    expect(accountCreated.providerAccountId).toBe(newUser.email)
    expect(session).not.toBeUndefined()
    expect(session.sessionToken).toBe(sessionToken)
    expect(user).not.toBeUndefined()
    expect(user).toStrictEqual({
      ...newUser,
      id: user.id,
    })
  })
  test('should throw error and not create user with transaction', async () => {
    const newUser: CreateUser = {
      name: 'John Doe',
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'USER',
      image: 'fail-image',
      emailVerified: null,
    }
    // pass session already exist and unique
    const users = await getUsersDao()
    const randomUser = users[Math.floor(Math.random() * users.length - 1)]
    const randomSession = {
      userId: randomUser.id,
      sessionToken: Math.random().toString(36).slice(2, 15),
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    }
    const session = await createSessionDao(randomSession)
    console.log('session', session)
    await expect(
      createUserAccountSessionDao(newUser, session?.sessionToken)
    ).rejects.toThrowError()

    const user = await getUserByEmailDao(newUser.email as string)
    expect(user).toBeUndefined()
  })
})
