import { makeObservable, observable, action, computed } from "mobx";

interface TodoItem {
  type: "TodoItem";
  index?: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ToggleItem {
  type: "ToggleItem";
  itemIndex: number;
  itemId: number;
}

export class TodoStoreImpl {
  past: (TodoItem | ToggleItem)[] = [];
  todos: TodoItem[] = [];
  future: (TodoItem | ToggleItem)[] = [];
  inputVal: string = "";
  constructor() {
    makeObservable(this, {
      inputVal: observable,
      past: observable,
      todos: observable,
      future: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed,
      deleteTodo: action,
      undo: action,
      redo: action,
      addToggleItem: action,
    });
  }

  addTodo(inputVal: string) {
    const item: TodoItem = {
      type: "TodoItem",
      id: Date.now(),
      title: inputVal,
      completed: false,
    };
    this.todos.push(item);
    this.inputVal = "";
  }

  addToggleItem(index: number, id: number) {
    const toggleItem: ToggleItem = {
      type: "ToggleItem",
      itemIndex: index,
      itemId: id,
    };
    this.future.push(toggleItem);
    // console.log(this.future);
  }

  toggleTodo(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.addToggleItem(index, id);
    }
  }

  get status() {
    let completed = 0,
      remaining = 0;

    completed = this.todos.filter((todo) => todo.completed).length;
    remaining = this.todos.length - completed;
    // console.log(completed, remaining);
    return { completed, remaining };
  }

  deleteTodo(id: number) {
    for (let todo of this.todos) {
      if (todo.id === id) {
        const indexOf = this.todos.indexOf(todo);
        const futureItem = todo;
        futureItem.index = indexOf;
        this.future.push(futureItem);
        this.todos.splice(indexOf, 1);
      }
    }
  }

  undo() {
    const item: any = this.future[this.future.length - 1];
    const itemType: string = this.future[this.future.length - 1].type;
    if (itemType === "TodoItem") {
      this.todos.splice(item.index, 0, item);
    } else {
      let itemIndex: number = -1;
      this.todos.forEach((todo) =>
        todo.id === item.itemId ? (itemIndex = this.todos.indexOf(todo)) : null
      );
      // console.log(itemIndex);
      this.todos[itemIndex].completed = !this.todos[itemIndex].completed;
    }
    this.past.push(item);
    this.future.splice(this.future.length - 1, 1);
  }

  redo() {
    const item: any = this.past[this.past.length - 1];
    const itemType: string = this.past[this.past.length - 1].type;
    let itemIndex: number = -1;
    this.todos.forEach((todo) =>
      todo.id === item.itemId ? (itemIndex = this.todos.indexOf(todo)) : null
    );

    if (itemType === "TodoItem") {
      this.deleteTodo(item.id);
    } else {
      this.todos[itemIndex].completed = !this.todos[itemIndex].completed;
      this.addToggleItem(itemIndex, this.todos[itemIndex].id);
    }
    this.past.splice(this.past.length - 1, 1);
  }
}

export const TodoStore = new TodoStoreImpl();
