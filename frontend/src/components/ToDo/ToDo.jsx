import './todo.css'
import Cross from '../../assets/icons/icon-cross.svg';
import CheckBox from '../checkbox/CheckBox';

function ToDo({ todo, onClickMarkAsCompleted, onRemove }) {
    return (
        <div className="todo" key={todo.id}>
            <CheckBox key={todo.id} checked={todo.completed} disabled={todo.completed} onCheckedMarkAsCompleted={() => onClickMarkAsCompleted(todo.id)} id={todo.id} />

            <p className={todo.completed ? 'completed-item' : 'todo-name'}>{todo.title}</p>
            <div className="delete" onClick={() => onRemove(todo.id)}>
                <img src={Cross} alt="Delete Button" />
            </div>
        </div>
    )

}

export default ToDo;