import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import styles from './TodoItem.module.css';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';

const TodoItem = observer(({ id, title, completed, removeItem, updateTodo }) => {
  const [titleValue, setTitleValue] = useState(title);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const handleCheckboxChange = () => {
    updateTodo(id, { completed: !completed });
  };

  const handleTitleChange = (e) => {
    if (!completed) setTitleValue(e.target.value);
  };

  const handleTitleBlur = () => {
    updateTodo(id, { title: titleValue });
    if (!titleValue.trim() || titleValue.trim() === title) {
      setTitleValue(title);
    }
  };

  const handleRemoveClick = () => {
    removeItem(id);
  };

  return (
    <div className={`${styles.todo}${completed ? ' ' + styles.done : ''}`}>
      <input type="checkbox" checked={completed} onChange={handleCheckboxChange} />
      <input type="text" value={titleValue} onChange={handleTitleChange} onBlur={handleTitleBlur} />
      <button className={styles.remove} onClick={handleRemoveClick}>
        <DeleteIcon />
      </button>
    </div>
  );
});

export default TodoItem;
