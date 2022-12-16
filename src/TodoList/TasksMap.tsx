import { observer } from "mobx-react";
import TodoCardComp from "./Components/TodoCardComp";
import { TodoStoreImpl } from "./TodoStore";

interface Todolist {
  todoStore: TodoStoreImpl;
}

const TaskMap = observer(({ todoStore }: Todolist) => {
  const taskList = todoStore.todos.map((todo) => {
    return (
      <TodoCardComp
        todoStore={todoStore}
        todo={todo}
      />
    );
  });

  return <div>{taskList}</div>;
});

export default TaskMap;
