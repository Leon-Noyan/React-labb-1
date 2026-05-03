import { useState, useEffect } from 'react'
import './App.css'
import type { Todo, NewTodo } from './type'
import TodoInputs from './components/Inputs.component'
import TodoList from './components/TodoList.component'
import Search from './components/Search.component'

function App() {
    // States
    const [todo, setTodo] = useState<Todo[]>([])
    const [title, setTitle] = useState('')

    const [editId, setEditId] = useState<string | null>(null)
    const [editTitle, setEditTitle] = useState('')

    const [search, setSearch] = useState('')

    const [error, setError] = useState<string | null>(null)

    // Fetches todos from API
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

    // We use this to filter todos based on search
    const filterTodos = todo.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))

    // Adds new todo/ task with POST and updates local state
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
    // Lets user toggle between complete and uncomplete
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

    // Deletes todo/ task with DELETE
    const handleDelete = async (id: string) => {
      // this gives the user a confirmation window before delete is executed
      const confirmDeletion = confirm('Are you sure you want to delete this task?')
      if (!confirmDeletion) return
        try {
            await fetch(
                `https://69e9cda415c7e2d51268cb71.mockapi.io/todos/${id}`,
                {
                    method: 'DELETE'
                }
            )
            // if id does not match, the todo is kept else not included in new state
            setTodo(todo.filter((todo) => todo.id !== id))
            setError(null)
        } catch (error) {
            console.error(error)
            setError('Something went wrong, could not delete todo!')
        }
    }

    // Updates todo title via PUT
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
            // Resets state
            setEditId(null)
            setEditTitle('')
            setError(null)
        } catch (error) {
            console.error(error)
            setError('Something went wrong, could not edit todo!')
        }
    }

    // Used to count completed todos/ tasks
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
            {/* Displays the number of completed tasks/ todos */}
            <p id='task-counter'>{countCompletedTodos} of {totalTodosCount} tasks completed</p>
        </div>
    )
}
export default App
