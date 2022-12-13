import { observer } from "mobx-react";
import TodoCardComp from "./Components/TodoCardComp";
import { TodoStoreImpl } from "./TodoStore";

interface Todolist {
  todoStore: TodoStoreImpl;
}

const TaskMap = observer(({ todoStore }: Todolist) => {
  const taskList = todoStore.todos.map((todo, index) => {
    return (
      <TodoCardComp
        todoStore={todoStore}
        title={todo.title}
        completed={todo.completed}
        id={todo.id}
      />
    );
  });

  return <div>{taskList}</div>;
});

export default TaskMap;
