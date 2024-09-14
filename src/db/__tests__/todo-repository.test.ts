import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import {initDrizzle} from '../repositories/management-repository'
import {
  createTodoDao,
  getTodoByIdDao,
  getTodosDao,
  updateTodoDao,
} from '../repositories/todo-repository'
import {CreateTodo} from '@/services/types/domain/todo-types'

describe('CRUD operations for Todo', () => {
  beforeAll(async () => {
    await initDrizzle() // Assure-toi que la base de données est propre
  })
  it('should return true to confirm Vitest is working', () => {
    expect(true).toBe(true)
  })

  afterAll(async () => {
    //await truncateTables() // Nettoie la base de données après les tests
  })

  it('should create a new todo', async () => {
    const newTodo: CreateTodo = {
      title: 'Test Create Todo',
      isCompleted: false,
      createdAt: new Date('2024-08-12'),
      updatedAt: new Date('2024-08-12'),
    }

    const createdTodo = await createTodoDao(newTodo)
    console.log('createdTodo:', createdTodo)
    console.log('newTodo:', newTodo)
    expect(createdTodo).toMatchObject(newTodo)
  })

  it('should read a todo by ID', async () => {
    const todos = await getTodosDao()
    const todo = await getTodoByIdDao(`${todos[0].id}`)

    expect(todo).toBeDefined()
    expect(todo?.title).toBe('Test Create Todo')
  })

  it('should update a todo', async () => {
    const todos = await getTodosDao()
    const todoToUpdate = todos[0]

    const updatedData = {
      ...todoToUpdate,
      title: 'Updated Todo Title',
      isCompleted: true,
    }

    const updatedTodo = await updateTodoDao(updatedData)
    expect(updatedTodo.title).toBe('Updated Todo Title')
    expect(updatedTodo.isCompleted).toBe(true)
  })
})
