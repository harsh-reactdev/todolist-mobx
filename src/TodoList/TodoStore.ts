import { makeObservable, observable, action, computed } from "mobx";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export class TodoStoreImpl {
  todos: TodoItem[] = [];
  inputVal: string = "";
  constructor() {
    makeObservable(this, {
      inputVal: observable,
      todos: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed,
      deleteTodo: action
    });
  }

  addTodo(inputVal: string) {
    const item: TodoItem = {
      id: Date.now(),
      title: inputVal,
      completed: false
    };
    this.todos.push(item);
    this.inputVal = "";
  }

  toggleTodo(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }

  get status() {
    let completed = 0,
      remaining = 0;

    this.todos.forEach((todo) => {
      if (todo.completed) {
        completed++;
      } else remaining++;
    });
    return { completed, remaining };
  }

  deleteTodo(id: number) {
    for (let todo of this.todos) {
      if (todo.id === id) {
        const indexOf = this.todos.indexOf(todo);
        this.todos.splice(indexOf, 1);
      }
    }
  }
}

export const TodoStore = new TodoStoreImpl();
