const TodoItem = ({ id, title, completed, removeItem, toggleCompleted }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onClick={() => {
          toggleCompleted(id);
        }}
      />{' '}
      {title}
    </div>
  );
};

export default TodoItem;
