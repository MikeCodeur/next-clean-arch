import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import {initDrizzle} from '../repositories/management-repository'
import {
  createProductDao,
  updateProductDao,
  deleteProductDao,
  getProductByNameDao,
  getProductsDao,
} from '../repositories/product-repository'
import {
  CreateEditProduct,
  UpdateProduct,
} from '@/services/types/domain/product-types'
import {createCategoryDao} from '../repositories/category-repository'

describe('CRUD operations for Product', () => {
  beforeAll(async () => {
    await initDrizzle() // Initialise la base de données
  })

  afterAll(async () => {
    console.log('afterAll')
  })

  it('should create a new product with category', async () => {
    const newCategory = {name: 'Test Category'}
    const categoryCreated = await createCategoryDao({name: 'Test Category'})
    expect(categoryCreated).toMatchObject(newCategory)

    const newProduct: CreateEditProduct = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 100,
      image: 'image_url',
      category: categoryCreated.id,
      quantity: 10,
    }

    const createdProduct = await createProductDao(newProduct)
    expect(createdProduct).toMatchObject(newProduct)
  })

  it('should read a product by name', async () => {
    const products = await getProductsDao()
    const product = await getProductByNameDao(products[0].title || '')

    expect(product).toBeDefined()
    expect(product[0]?.title).toBe('Test Product')
  })

  it('should update a product', async () => {
    const products = await getProductsDao()
    const productToUpdate = products[0]

    const updatedData: UpdateProduct = {
      id: productToUpdate.id,
      title: 'Updated Product Title',
      description: 'Updated product description',
      price: 120,
      image: 'updated_image_url',
      // category: productToUpdate.category?.id ?? '',
      quantity: 15,
    }

    const updatedProduct = await updateProductDao(updatedData)
    expect(updatedProduct.title).toBe('Updated Product Title')
    expect(updatedProduct.price).toBe(120)
  })

  it('should delete a product', async () => {
    const products = await getProductsDao()
    const productToDelete = {id: products[0].id}

    await deleteProductDao(productToDelete)

    const deletedProduct = await getProductByNameDao(productToDelete.id || '')
    expect(deletedProduct).toEqual([]) // Le produit ne devrait plus exister
  })
})
