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
    return { completed, remaining };
  }

  deleteTodo(id: number) {
    const index = this.indexFinder(id);
    this.addHistoryItem(this.historyItems.undo, "Del", index, id);
    this.addDelHistory.push(this.todos[index]);
    this.todos.splice(index, 1);
    console.log(this.historyItems.undo);
    console.log(this.addDelHistory);
  }

  spliceUndoItem() {
    this.historyItems.undo.splice(this.historyItems.undo.length - 1, 1)
  }

  spliceRedoItem() {
    this.historyItems.redo.splice(this.historyItems.redo.length - 1, 1)
  }

  spliceTodoBackupItem() {
    this.addDelHistory.splice(this.addDelHistory.length - 1, 1)
  }

  undo() {

    const undoItem: HistoryItem = this.historyItems.undo[this.historyItems.undo.length - 1];

    if (undoItem.type === 'Add') {
      const item: TodoItem = this.todos[undoItem.itemIndex];
      this.addDelHistory.push(item);
      this.addHistoryItem(this.historyItems.redo, 'undoAdd', undoItem.itemIndex, undoItem.itemId)
      this.todos.splice(undoItem.itemIndex, 1);
      this.spliceUndoItem();
      console.log(this.historyItems.undo);
    }

    else if (undoItem.type === 'Del') {
      const item: TodoItem = this.addDelHistory[this.addDelHistory.length - 1];
      this.todos.splice(undoItem.itemIndex, 0, item);
      this.addHistoryItem(this.historyItems.redo, 'undoDel', undoItem.itemIndex, undoItem.itemId)
      this.spliceTodoBackupItem();
      this.spliceUndoItem();
      console.log(this.historyItems.undo);
    }

    else if (undoItem.type === 'Toggle') {
      const index = this.indexFinder(undoItem.itemId);
      this.todos[index].completed = !this.todos[index].completed;

      this.addHistoryItem(this.historyItems.redo, 'undoToggle', undoItem.itemIndex, undoItem.itemId);
      this.spliceUndoItem();
      console.log(this.historyItems.undo);
    }
  }

  redo() {
    const redoItem: HistoryItem =
      this.historyItems.redo[this.historyItems.redo.length - 1];

    if (redoItem.type === 'undoAdd') {
      const item = this.addDelHistory[this.addDelHistory.length - 1];
      this.todos.splice(redoItem.itemIndex, 0, item);
      this.spliceRedoItem();
      this.spliceTodoBackupItem();
      console.log(this.historyItems.redo);
    }

    if (redoItem.type === 'undoDel') {
      this.todos.splice(redoItem.itemIndex, 1);
      this.spliceRedoItem();
      console.log(this.historyItems.redo);
    }

    if (redoItem.type === 'undoToggle') {
      const index = this.indexFinder(redoItem.itemId);
      this.todos[index].completed = !this.todos[index].completed;
      this.spliceRedoItem();
      console.log(this.historyItems.redo);
    }
  }
}

export const TodoStore = new TodoStoreImpl();
