import React from "react";
import { TodoStoreImpl } from "./TodoStore";
import { observer } from "mobx-react";
import InputComponent from "./Components/InputComponent";
import { StyledFooter, Header } from "./StyledComps";
import TaskMap from "./TasksMap";

interface Todolist {
  todoStore: TodoStoreImpl;
}

const TodoList = observer(({ todoStore }: Todolist) => {
  // const [value, setValue] = useState("");

  const status = todoStore.status;
  return (
    <div>
      <Header>TodoList</Header>
      <InputComponent todoStore={todoStore} />
      <TaskMap todoStore={todoStore} />
      <StyledFooter>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
            style={{ float: "right" }}
            onClick={() => null}
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </span>
        <span>Completed : {status.completed} </span>
        <span>Remaining : {status.remaining}</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
            style={{ float: "left" }}
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
          </svg>
        </span>
      </StyledFooter>
    </div>
  );
});

export default TodoList;
