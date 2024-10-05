import { observer } from 'mobx-react-lite';
import { todoStore } from '../../store/TodoStore';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = observer(() => {
  const { todoArray, removeTodo, addTodo, todoTitle, titleHandler, toggleCompleted } = todoStore;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => {
            titleHandler(e.target.value);
          }}
        />
        <input type="submit" value="+" />
      </form>
      {!!todoArray.length
        ? todoArray.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              removeItem={() => {
                removeTodo(item.id);
              }}
              toggleCompleted={toggleCompleted}
            />
          ))
        : 'Пустой списко дел'}
    </div>
  );
});

export default TodoList;
