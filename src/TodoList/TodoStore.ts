import { makeObservable, observable, action, computed } from "mobx";

interface TodoItem {
  index?: number;
  id: number;
  title: string;
  completed: boolean;
}

interface HistoryItem {
  type: string;
  itemIndex: number;
  itemId: number;
}


export class TodoStoreImpl {
  addDelHistory: TodoItem[] = [];
  todos: TodoItem[] = [];
  historyItems: HistoryItem[] = [];
  inputVal: string = "";
  constructor() {
    makeObservable(this, {
      inputVal: observable,
      todos: observable,
      historyItems: observable,
      addDelHistory: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed,
      deleteTodo: action,
      undo: action,
      redo: action,
    });
  }

  addTodo(inputVal: string) {
    const item: TodoItem = {
      id: Date.now(),
      title: inputVal,
      completed: false,
    };
    this.todos.push(item);
    this.addHistoryItem("Add", this.indexFinder(item), item.id);
    console.clear();
    console.log(this.historyItems);
    this.inputVal = "";
  }

  indexFinder = (item: TodoItem) => {
    let itemIndex: number = -1;
    this.todos.forEach((todo) =>
      todo.id === item.id ? (itemIndex = this.todos.indexOf(todo)) : null
    );
    return itemIndex;
  };

  addHistoryItem(type: string, index: number, id: number) {
    // console.log(index)
    this.historyItems.push({
      type: type,
      itemIndex: index,
      itemId: id,
    });
    // return console.log(this.historyItems)
  }

  toggleTodo(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
      // this.addToggleItem(index, id);
      this.addHistoryItem("Toggle", index, id);
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
    let index: number = -1;
    for (let todo of this.todos) {
      if (todo.id === id) {
        index = this.todos.indexOf(todo);
      }
    }
    this.addHistoryItem("Del", index, id);
    this.todos.splice(index, 1);
    // console.clear();
    // console.log(this.historyItems);
  }

  undo() {
    const undoItem: HistoryItem =
      this.historyItems[this.historyItems.length - 1];
    if (undoItem.type === "Add") {
      const delItem: TodoItem = this.todos[undoItem.itemIndex];
      this.addDelHistory.push(delItem);
      this.todos.splice(undoItem.itemIndex, 1);
      this.historyItems.splice(this.historyItems.length - 1, 1);
    } else if (undoItem.type === "Del") {
      const addItem: TodoItem =
        this.addDelHistory[this.addDelHistory.length - 1];
      this.todos.splice(undoItem.itemIndex, 0, addItem);
      this.addDelHistory.splice(this.addDelHistory.length - 1, 1);
      // this.addHistoryItem("Add", undoItem.itemIndex, undoItem.itemId);
      this.historyItems.splice(this.historyItems.length - 1, 1);
    } else if (undoItem.type === "Toggle") {
      this.todos[undoItem.itemIndex].completed =
        !this.todos[undoItem.itemIndex].completed;
      // this.addHistoryItem("Toggle", undoItem.itemIndex, undoItem.itemId);
      // this.toggleTodo(undoItem.itemId);
      this.historyItems.splice(this.historyItems.length - 1, 1);
    }
    // console.clear();
    // console.log(this.historyItems);
  }

  redo() {
    const redoItem: HistoryItem =
      this.historyItems[this.historyItems.length - 1];
    // if (redoItem.type === "Del") {
    //   const addItem: TodoItem =
    //     this.addDelHistory[this.addDelHistory.length - 1];
    //   this.todos.splice(redoItem.itemIndex, 0, addItem);
    //   this.addDelHistory.splice(this.addDelHistory.length - 1, 1);
    //   // this.addHistoryItem("Add", redoItem.itemIndex, redoItem.itemId);
    //   this.historyItems.splice(this.historyItems.length - 1, 1);
    // } else
    if (redoItem.type === "Toggle") {
      this.todos[redoItem.itemIndex].completed =
        !this.todos[redoItem.itemIndex].completed;
      // this.addHistoryItem("Toggle", redoItem.itemIndex, redoItem.itemId);
      // this.toggleTodo(redoItem.itemId);
      this.historyItems.splice(this.historyItems.length - 1, 1);
    }
    console.clear();
    console.log(this.historyItems);
  }
}

export const TodoStore = new TodoStoreImpl();
