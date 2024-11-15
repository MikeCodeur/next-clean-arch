import {UserModel, UserAddModel, DeleteUserModel} from '@/db/schema/users'

export type User = UserModel
export type AddUser = UserAddModel
export type DeleteUser = DeleteUserModel
export type UpdateUser = Partial<User>
