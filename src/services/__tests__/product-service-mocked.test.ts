import {faker} from '@faker-js/faker'
import {describe, it, vi, expect, beforeEach} from 'vitest'
import * as productRepository from '@/db/repositories/product-repository'
import {AuthUser} from '../authentication/type'
import {RoleEnum} from '../types/domain/user-types'
import {setupUserAuthExtentedMocked} from './helper-service-test'
import {
  createProductService,
  getCategoriesService,
  getProductsService,
  updateProductService,
} from '../product-service'
import {CreateProduct} from '../types/domain/product-types'

vi.mock('@/db/repositories/product-repository', () => ({
  createProductDao: vi.fn(),
  updateProductDao: vi.fn(),
  deleteProductDao: vi.fn(),
  getProductByNameDao: vi.fn(),
  persistProductDao: vi.fn(),
  getProductsDao: vi.fn(),
  getCategoriesDao: vi.fn(),
}))

vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
  getUserAuthExtented: vi.fn(),
}))

const user = {
  role: RoleEnum.USER,
  session: {
    expires: new Date().toDateString(),
    user: {
      email: faker.internet.email(),
      name: faker.person.firstName(),
    },
  },
} satisfies AuthUser

describe('[getProductsService] when called', () => {
  beforeEach(() => {
    vi.mocked(productRepository).getProductsDao.mockResolvedValue([
      {
        id: faker.string.alphanumeric(10),
        category: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        description: faker.lorem.paragraph(),
        image: faker.internet.url(),
        price: faker.number.float(),
        quantity: faker.number.int(),
        title: faker.lorem.word(),
      },
    ])
  })
  it('[Everyone] can get products', async () => {
    await getProductsService()
    expect(productRepository.getProductsDao).toBeCalledTimes(1)
  })
})

describe('[getCategoriesService] when called', () => {
  const categories = [
    {
      id: faker.string.alphanumeric(10),
      name: 'Electronics',
    },
    {
      id: faker.string.alphanumeric(10),
      name: 'Books',
    },
  ]
  beforeEach(() => {
    vi.mocked(productRepository).getCategoriesDao.mockResolvedValue(categories)
  })
  it('[Everyone] can get categories products', async () => {
    const result = await getCategoriesService()
    expect(productRepository.getCategoriesDao).toBeCalledTimes(1)
    expect(result).toHaveLength(2)
    expect(result).toMatchObject(categories)
  })
})

describe('[createProductService] when called', () => {
  const product = {
    title: faker.lorem.word(),
    description: faker.lorem.paragraph(1),
    price: faker.number.float(),
    image: faker.internet.url(),
    quantity: faker.number.int(),
  } satisfies CreateProduct

  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("[USER] can't create a product", async () => {
    setupUserAuthExtentedMocked(user)
    await expect(
      createProductService(product)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Vous n'êtes pas autorisé à effectuer cette action]`
    )
    expect(productRepository.createProductDao).not.toBeCalled()
  })
  it('[ADMIN] can create a product', async () => {
    const userAdmin = {
      ...user,
      role: RoleEnum.ADMIN,
    }
    setupUserAuthExtentedMocked(userAdmin)
    await createProductService(product)
    expect(productRepository.createProductDao).toBeCalledTimes(1)
  })
})

describe('[updateProductService] when called', () => {
  const updateProduct = {
    id: faker.string.alphanumeric(10),
    title: faker.lorem.word(),
  }
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("[USER] can't update a product", async () => {
    setupUserAuthExtentedMocked(user)

    await expect(
      updateProductService(updateProduct)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Vous n'êtes pas autorisé à effectuer cette action]`
    )
    expect(productRepository.updateProductDao).not.toBeCalled()
  })
  it('[ADMIN] can update a product', async () => {
    const userAdmin = {
      ...user,
      role: RoleEnum.ADMIN,
    }
    setupUserAuthExtentedMocked(userAdmin)
    await updateProductService(updateProduct)
    expect(productRepository.updateProductDao).toBeCalledTimes(1)
  })
})
