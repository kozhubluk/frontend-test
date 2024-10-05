import { makeAutoObservable } from 'mobx';

class TodoStore {
  todoArray = localStorage.todos ? JSON.parse(localStorage.todos) : [];
  todoTitle = '';

  constructor() {
    makeAutoObservable(this);
  }

  titleHandler = (title) => {
    this.todoTitle = title;
  };

  descriptionHandler = (description) => {
    this.todoDescription = description;
  };

  addTodo = () => {
    if (this.todoTitle.trim()) {
      const id = this.todoArray.length > 0 ? this.todoArray.at(-1).id + 1 : 0;

      this.todoArray.push({
        id,
        title: this.todoTitle.trim(),
        completed: false,
      });

      localStorage.setItem('todos', JSON.stringify(this.todoArray));
      this.todoTitle = '';
    }
  };

  removeTodo = (id) => {
    this.todoArray = this.todoArray.filter((item) => item.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  };

  toggleCompleted = (id) => {
    this.todoArray = this.todoArray.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  };

  completeAll = () => {
    this.todoArray = this.todoArray.map((item) => ({ ...item, completed: true }));
    localStorage.removeItem('todos');
  };
}

export const todoStore = new TodoStore();
