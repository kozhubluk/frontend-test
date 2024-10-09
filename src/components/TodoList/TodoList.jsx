import { observer } from 'mobx-react-lite';
import { todoStore } from '../../store/TodoStore';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';
import { useState } from 'react';

const TodoList = observer(() => {
  const {
    todos,
    removeTodo,
    addTodo,
    updateTodo,
    todoTitle,
    titleHandler,
    removeFirstTodo,
    removeLastTodo,
  } = todoStore;

  const [oddMode, setOddMode] = useState(false);
  const [evenMode, setEvenMode] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const handleTitleChange = (e) => {
    titleHandler(e.target.value);
  };

  const toggleOddMode = () => {
    setOddMode((prev) => !prev);
  };

  const toggleEvenMode = () => {
    setEvenMode((prev) => !prev);
  };

  return (
    <div className={styles['todo-list']}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Введите название..."
          value={todoTitle}
          onChange={handleTitleChange}
        />
        <input type="submit" value="Добавить" />
      </form>
      <div className={styles.buttons}>
        <button onClick={removeFirstTodo}>Удалить с начала</button>
        <button onClick={removeLastTodo}>Удалить с конца</button>
        <button onClick={toggleOddMode}>
          {oddMode ? 'Не подсвечивать нечетные' : 'Подсвечивать нечетные'}
        </button>
        <button onClick={toggleEvenMode}>
          {evenMode ? 'Не подсвечивать четные' : 'Подсвечивать четные'}
        </button>
      </div>
      <div
        className={`${styles.container} ${evenMode ? styles.even : ''} ${
          oddMode ? styles.odd : ''
        }`}>
        {todos.length > 0 ? (
          todos.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              removeItem={removeTodo}
              updateTodo={updateTodo}
            />
          ))
        ) : (
          <p className={styles.empty}>Добавьте новые задачи!</p>
        )}
      </div>
    </div>
  );
});

export default TodoList;
