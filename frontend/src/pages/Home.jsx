import { useState } from 'react'
import ToDo from '../components/ToDo/ToDo';
import CheckBox from '../components/checkbox/CheckBox';
import Button from '../components/buttons/Button';
import './home.css'

let globalId = 0

function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [currentFilter, setCurrentFilter] = useState(0);

    function addTodo(e) {
        e.preventDefault();
        const newTodo = {
            id: ++globalId,
            'title': task,
            'completed': false
        }
        setTask('')
        setTodos(prevTodos => [...prevTodos, newTodo])
    }

    function deleteTodo(itemId) {
        setTodos(oldTodos => oldTodos.filter(todo => todo.id !== itemId));
    }

    function markAsCompleted(itemId) {
        setTodos(oldTodos => oldTodos.map(todo => {
            if (todo.id === itemId) {
                todo.completed = true;
            }
            return todo;
        }))
    }

    let leftTodos = todos.filter(todo => !todo.completed).length;

    function clearAllCompleted() {
        setTodos(oldTodos => oldTodos.filter(todo => !todo.completed));
    }

    function filteredTodos() {
        if (currentFilter === 1) {
            // active results
            return todos.filter(todo => !todo.completed)
        } else if (currentFilter === 2) {
            return todos.filter(todo => todo.completed)
        }
        return todos;
    }

    function activeTodos() {
        setCurrentFilter(1);
        filteredTodos();
    }

    function completedTodos() {
        setCurrentFilter(2);
        filteredTodos();
    }
    function allTodos() {
        setCurrentFilter(0);
        filteredTodos();
    }

    return (
        <>
            <header>
                <h1>Todo</h1>
            </header>
            <main>
                <section className="input-fields">
                    <CheckBox id='checkbox' />
                    <form onSubmit={addTodo}>
                        <input type="text" value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder='Create a new todo...' />
                    </form>
                </section>
                <section className="all-todos">
                    {filteredTodos().map((todo, index) => (
                        <ToDo index={index} todo={todo} onClickMarkAsCompleted={markAsCompleted} onRemove={deleteTodo} key={todo.id} />
                    ))}
                </section>
                <section className="options">
                    <p>{leftTodos} Items left</p>
                    <div className="menu menu-desktop">
                        <Button title={'All'} handleFunction={allTodos} active={currentFilter === 0} />
                        <Button title={'Active'} handleFunction={activeTodos} active={currentFilter === 1} />
                        <Button title={'Completed'} handleFunction={completedTodos} active={currentFilter === 2} />
                    </div>
                    <Button title={'Clear all completed'} handleFunction={clearAllCompleted} />
                </section>
                <section className='all-todos'>
                    <div className="menu menu-mobile">
                        <Button title={'All'} handleFunction={allTodos} active={currentFilter === 0} />
                        <Button title={'Active'} handleFunction={activeTodos} active={currentFilter === 1} />
                        <Button title={'Completed'} handleFunction={completedTodos} active={currentFilter === 2} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;