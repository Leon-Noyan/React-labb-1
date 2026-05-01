import type { Todo } from '../type'
interface TodoListProps {
    todo: Todo[]
    handleToggles: (id: string) => void
    handleDelete: (id: string) => void
    handleEdit: (id: string) => void
    editId: string | null
    editTitle: string
    setEditId: (value: string | null) => void
    setEditTitle: (value: string) => void
}

const TodoList = ({
    todo,
    handleToggles,
    handleDelete,
    handleEdit,
    editId,
    editTitle,
    setEditId,
    setEditTitle
}: TodoListProps) => {
    return (
        <div className="Todo-List">
            <ul style={{ listStyle: 'none' }}>
              {todo.length === 0 && <p>No current tasks...</p>}
                {todo.map((todo) => (
                    <li key={todo.id}>
                        {editId === todo.id ? (
                            <div className="Edit-todo">
                                <input
                                    type="text"
                                    placeholder="Edit task"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    autoFocus
                                />
                                <button onClick={() => handleEdit(todo.id)}>
                                    Save
                                </button>

                                <button
                                    onClick={() => {
                                        setEditId(null)
                                        setEditTitle('')
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="View">
                                <span>
                                    {todo.title} -{' '}
                                    {todo.completed
                                        ? 'Completed'
                                        : 'Not Completed'}
                                </span>
                                <div className='card-buttons'>
                                <button onClick={() => handleToggles(todo.id)}>
                                    Toggle
                                </button>
                                <button
                                    onClick={() => {
                                        setEditId(todo.id)
                                        setEditTitle(todo.title)
                                    }}
                                >
                                    Edit Todo
                                </button>
                                <button onClick={() => handleDelete(todo.id)}>
                                    Delete
                                </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList
