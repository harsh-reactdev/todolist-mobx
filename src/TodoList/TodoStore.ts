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

interface History {
  undo: HistoryItem[];
  redo: HistoryItem[];
}

export class TodoStoreImpl {
  addDelHistory: TodoItem[] = [];
  todos: TodoItem[] = [];
  historyItems: History = { undo: [], redo: [] };
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
    this.addHistoryItem(
      this.historyItems.undo,
      "Add",
      this.indexFinder(item.id),
      item.id
    );
    console.clear();
    console.log(this.historyItems);
    this.inputVal = "";
  }

  indexFinder = (id: number) => {
    const index = this.todos.findIndex((item) => item.id === id);
    return index;
  };

  addHistoryItem(
    actionArr: HistoryItem[],
    type: string,
    index: number,
    id: number
  ) {
    actionArr.push({
      type: type,
      itemIndex: index,
      itemId: id,
    });
  }

  toggleTodo(id: number) {
    const index = this.indexFinder(id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.addHistoryItem(this.historyItems.undo, "Toggle", index, id);
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
    const index = this.indexFinder(id);
    this.addHistoryItem(this.historyItems.undo, "Del", index, id);
    this.todos.splice(index, 1);
  }

  undo() {

    const undoItem: HistoryItem = this.historyItems.undo[this.historyItems.undo.length -1];
    // const undoItem: HistoryItem =
    //   this.historyItems.undo[this.historyItems.undo.length - 1];
    // if (undoItem.type === "Add") {
    //   const delItem: TodoItem = this.todos[undoItem.itemIndex];
    //   this.addDelHistory.push(delItem);
    //   this.addHistoryItem(this.historyItems.redo, 'Add', undoItem.itemIndex, undoItem.itemId)
    //   this.todos.splice(undoItem.itemIndex, 1);
    //   this.historyItems.undo.splice(this.historyItems.undo.length - 1, 1);
    // } else if (undoItem.type === "Del") {
    //   const addItem: TodoItem =
    //     this.addDelHistory[this.addDelHistory.length - 1];
    //   this.todos.splice(undoItem.itemIndex, 0, addItem);
    //   this.addDelHistory.splice(this.addDelHistory.length - 1, 1);
    //   // this.addHistoryItem("Add", undoItem.itemIndex, undoItem.itemId);
    //   this.historyItems.undo.splice(this.historyItems.undo.length - 1, 1);
    // } else if (undoItem.type === "Toggle") {
    //   this.todos[undoItem.itemIndex].completed =
    //     !this.todos[undoItem.itemIndex].completed;
    //   // this.addHistoryItem("Toggle", undoItem.itemIndex, undoItem.itemId);
    //   // this.toggleTodo(undoItem.itemId);
    //   this.historyItems.undo.splice(this.historyItems.undo.length - 1, 1);
    // }
    // console.clear();
    // console.log(this.historyItems);
  }

  redo() {
    const redoItem: HistoryItem =
      this.historyItems.redo[this.historyItems.redo.length - 1];

    //   if(redoItem.type === 'Add'){
    //     const addItem: TodoItem =
    //     this.addDelHistory[this.addDelHistory.length - 1];
    //     this.todos.splice(redoItem.itemIndex, 0, addItem)
    //   }
    // // if (redoItem.type === "Del") {
    // //   const addItem: TodoItem =
    // //     this.addDelHistory[this.addDelHistory.length - 1];
    // //   this.todos.splice(redoItem.itemIndex, 0, addItem);
    // //   this.addDelHistory.splice(this.addDelHistory.length - 1, 1);
    // //   // this.addHistoryItem("Add", redoItem.itemIndex, redoItem.itemId);
    // //   this.historyItems.splice(this.historyItems.length - 1, 1);
    // // } else
    // if (redoItem.type === "Toggle") {
    //   this.todos[redoItem.itemIndex].completed =
    //     !this.todos[redoItem.itemIndex].completed;
    //   // this.addHistoryItem("Toggle", redoItem.itemIndex, redoItem.itemId);
    //   // this.toggleTodo(redoItem.itemId);
    //   this.historyItems.redo.splice(this.historyItems.redo.length - 1, 1);
    // }
    // console.clear();
    // console.log(this.historyItems);
  }
}

export const TodoStore = new TodoStoreImpl();
