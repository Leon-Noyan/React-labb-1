export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface NewTodo {
  title: string
  completed?: boolean
}
