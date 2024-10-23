import {CreateTodo, UpdateTodo} from '@/services/types/domain/todo-types'
import db from '../schema'
import {and, eq} from 'drizzle-orm'
import {todos} from '../schema/todos'

export const getTodosDao = async () => {
  const row = await db.query.todos.findMany()
  return row
}

export const getTodoByIdDao = async (id: string) => {
  const row = await db.query.todos.findFirst({
    where: (todo, {eq}) => eq(todo.id, id),
  })
  return row
}

export const createTodoDao = async (todo: CreateTodo) => {
  const row = await db.insert(todos).values(todo).returning()
  return row[0]
}
export const updateTodoDao = async (todo: UpdateTodo) => {
  const row = await db
    .update(todos)
    .set(todo)
    .where(and(eq(todos.id, todo.id)))
    .returning()
  return row[0]
}

export const deleteTodoDao = async (id: string) => {
  await db.delete(todos).where(and(eq(todos.id, id)))
}
