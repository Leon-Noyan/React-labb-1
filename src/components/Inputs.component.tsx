interface InputsProps {
    title: string
    setTitle: (value: string) => void
    handleAddTodo: () => void
}

const TodoInputs = ({ title, setTitle, handleAddTodo }: InputsProps) => {
    return (
        <div className="Todo-App-Input">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New text"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    )
}

export default TodoInputs
