// we pass down handleAddTodo as a prop to the component, we do this so the child component can use logic in the parent, similar to importing functions
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
                placeholder="Create task"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    )
}

export default TodoInputs
