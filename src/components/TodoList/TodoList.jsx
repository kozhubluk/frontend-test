import { observer } from 'mobx-react-lite';
import { todoStore } from '../../store/TodoStore';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

const TodoList = observer(() => {
  const {
    todoArray,
    removeTodo,
    addTodo,
    updateTodo,
    todoTitle,
    titleHandler,
    removeFirstTodo,
    removeLastTodo,
  } = todoStore;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const handleTitleChange = (e) => {
    titleHandler(e.target.value);
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
      </div>
      <div className={styles.container}>
        {todoArray.length > 0 ? (
          todoArray.map((item) => (
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
