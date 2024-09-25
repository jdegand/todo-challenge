import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import trashcan from './delete-outline.svg';
import whiteTrashcan from './delete-outline-white.svg';

function App() {
  const [todos, setTodos] = useState([{ id: nanoid(), todo: 'Do coding challenges 1', completed: true }, { id: nanoid(), todo: 'Do Coding challenges 2', completed: false }]);

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue) {
      setTodos(prev => [...prev, { id: nanoid(), todo: inputValue, completed: false }])
      setFilter('all')
      allFilter.current.focus()
      setInputValue('')
    }
  }

  const handleChecked = id => {
    if (filter === 'All') {
      const allTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
      setTodos(allTodos)
    }
  }

  const handleDelete = (id) => {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos)
    setFilter(undefined)
  }

  const handleDeleteAll = () => {
    const remainingTodos = todos.filter(todo => !todo.completed);
    setTodos(remainingTodos)
    setFilter('all')
  }

  const handleFilter = (e) => {
    setFilter(e.target.name)
  }

  useEffect(() => {
    switch (filter) {
      case 'Active': {
        setFilteredTodos(todos.filter(todo => !todo.completed))
        break;
      }
      case 'Completed': {
        setFilteredTodos(todos.filter(todo => todo.completed))
        break;
      }
      case 'All': {
        setFilteredTodos(todos)
        break;
      }
      default: {
        setFilteredTodos(todos)
      }
    }

  }, [filter, todos])

  const allFilter = useRef(null);

  useEffect(() => {
    if (allFilter.current) {
      allFilter.current.focus()
    }
  }, []);

  return (
    <main className="App">
      <h1>#todo</h1>
      <div className="wrapper">
        <div>
          <button name="All" onClick={handleFilter} ref={allFilter}>All</button>
          <button name="Active" onClick={handleFilter}>Active</button>
          <button name="Completed" onClick={handleFilter}>Completed</button>
          <hr />
        </div>
        <form>
          <input type="text" placeholder="add details" name="inputValue" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          <button data-testid="submit" className="add-button" type="submit" onClick={handleSubmit}>Add</button>
        </form>
      </div>
      <div className="todos-wrapper">
        {filteredTodos.map(todo => {
          return (
            <div key={todo.id} onClick={() => handleChecked(todo.id)}>
              <input type="checkbox" checked={todo.completed} onChange={() => handleChecked(todo.id)} />
              <span className={todo.completed ? 'line-through' : null}>{todo.todo}</span>
              {filter === 'Completed' ? <span data-testid="todo-delete" onClick={() => handleDelete(todo.id)}><img src={trashcan} alt="delete" /></span> : null}
            </div>
          )
        })}
        {filter === 'Completed' && todos.filter(todo => todo.completed).length > 0 ? <form className="delete-form">
          <button data-testid="delete" className="delete-all-button" type="button" onClick={handleDeleteAll}>
            <img src={whiteTrashcan} alt="" />&nbsp;
            delete all</button></form> : null}
      </div>
    </main>
  );
}

export default App;
