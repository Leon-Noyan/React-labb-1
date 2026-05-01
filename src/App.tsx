import { useState, useEffect } from 'react'
import './App.css'
import type { Todo, NewTodo } from './type'
import TodoInputs from './components/Inputs.component'
import TodoList from './components/TodoList.component'
import Search from './components/Search.component'

function App() {
    const [todo, setTodo] = useState<Todo[]>([])
    const [title, setTitle] = useState('')

    const [editId, setEditId] = useState<string | null>(null)
    const [editTitle, setEditTitle] = useState('')

    const [search, setSearch] = useState('')


    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchingTodos = async () => {
            try {
                const response = await fetch(
                    'https://69e9cda415c7e2d51268cb71.mockapi.io/todos'
                )
                const data: Todo[] = await response.json()
                setTodo(data)
                setError(null)

            } catch (error) {
                console.error(error)
                setError('Something went wrong, could not fetch todos!')
            }
        }
        fetchingTodos()
    }, [])

    const filterTodos = todo.filter((t) =>  t.title.toLowerCase().includes(search.toLowerCase()))

    const handleAddTodo = async () => {
        if (!title) return

        const newTodo: NewTodo = {
            title,
            completed: false
        }

        try {
            const response = await fetch(
                'https://69e9cda415c7e2d51268cb71.mockapi.io/todos',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTodo)
                }
            )
            const savedTodo: Todo = await response.json()
            setTodo([...todo, savedTodo])
            setTitle('')
            setError(null)
        } catch (error) {
            console.error(error)
            setError('Something went wrong, could not create todo!')
        }
    }

    const handleToggles = async (id: string) => {
        const todoTask = todo.find((t) => t.id === id)
        if (!todoTask) return

        try {
            const response = await fetch(
                `https://69e9cda415c7e2d51268cb71.mockapi.io/todos/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...todoTask,
                        completed: !todoTask.completed
                    })
                }
            )
            const updatedTodo: Todo = await response.json()
            setTodo(todo.map((t) => (t.id === id ? updatedTodo : t)))

        } catch (error) {
            console.error(error)
            setError('Something went wrong, could not update toggle!')
        }
    }

    const handleDelete = async (id: string) => {
      const confirmDeletion = confirm('Are you sure you want to delete this task?')
      if (!confirmDeletion) return
        try {
            await fetch(
                `https://69e9cda415c7e2d51268cb71.mockapi.io/todos/${id}`,
                {
                    method: 'DELETE'
                }
            )

            setTodo(todo.filter((todo) => todo.id !== id))
            setError(null)
        } catch (error) {
            console.error(error)
            setError('Something went wrong, could not delete todo!')
        }
    }

    const handleEdit = async (id: string) => {
        if (!editTitle) return
        const todoTask = todo.find((todo) => todo.id === id)
        if (!todoTask) return
        try {
            const response = await fetch(
                `https://69e9cda415c7e2d51268cb71.mockapi.io/todos/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...todoTask,
                        title: editTitle
                    })
                }
            )
            const updatedTodoTitle: Todo = await response.json()

            setTodo(
                todo.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, title: updatedTodoTitle.title }
                    }
                    return todo
                })
            )

            setEditId(null)
            setEditTitle('')
            setError(null)
        } catch (error) {
            console.error(error)
            setError('Something went wrong, could not edit todo!')
        }
    }

    const countCompletedTodos = todo.filter((todo) => todo.completed).length
    const totalTodosCount = todo.length

    return (
        <div className="Todo-App">
            <h1>Todo App</h1>
            {error && <p>{error}</p>}
            {!editId && (
                <TodoInputs
                    title={title}
                    setTitle={setTitle}
                    handleAddTodo={handleAddTodo}
                />
            )}
            <Search search={search} setSearch={setSearch} />

            <TodoList
                todo={filterTodos}
                handleToggles={handleToggles}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editId={editId}
                editTitle={editTitle}
                setEditId={setEditId}
                setEditTitle={setEditTitle}
            />
            <p id='task-counter'>{countCompletedTodos} of {totalTodosCount} tasks completed</p>
        </div>
    )
}
export default App
