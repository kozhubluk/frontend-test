import { makeAutoObservable } from 'mobx';

class TodoStore {
  todoArray = localStorage.todos ? JSON.parse(localStorage.todos) : [];
  todoTitle = '';

  constructor() {
    makeAutoObservable(this);
  }

  get todos() {
    return [...this.todoArray].sort((a, b) => a.completed - b.completed);
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

  updateTodo = (id, newProperties) => {
    let target = this.todoArray.findIndex((item) => item.id === id);

    if (target !== -1) {
      if (newProperties.hasOwnProperty('title'))
        newProperties.title.trim()
          ? (newProperties.title = newProperties.title.trim())
          : delete newProperties.title;
      this.todoArray[target] = { ...this.todoArray[target], ...newProperties };
      localStorage.setItem('todos', JSON.stringify(this.todoArray));
    }
  };

  removeTodo = (id) => {
    this.todoArray = this.todoArray.filter((item) => item.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  };

  removeFirstTodo = () => {
    this.todoArray = this.todos.slice(1);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  };

  removeLastTodo = () => {
    this.todoArray = this.todos.slice(0, -1);
    localStorage.setItem('todos', JSON.stringify(this.todoArray));
  };

  completeAll = () => {
    this.todoArray = this.todoArray.map((item) => ({ ...item, completed: true }));
    localStorage.removeItem('todos');
  };
}

export const todoStore = new TodoStore();
