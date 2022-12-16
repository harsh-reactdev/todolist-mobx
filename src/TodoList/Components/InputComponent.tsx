import { observer } from "mobx-react";
import { KeyboardEvent } from 'react';
import { StyledInput, StyledSubmitBtn } from "../StyledComps";
import { TodoStoreImpl } from "../TodoStore";

interface Todolist {
  todoStore: TodoStoreImpl;
}

const InputComponent = observer(({ todoStore }: Todolist) => {
  return (
    <>
      <StyledInput
        autoFocus
        type="text"
        value={todoStore.inputVal}
        onChange={(event: any) => {
          todoStore.inputVal = event.target.value;
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
          if (e.key === 'Enter') {
            if (todoStore.inputVal) todoStore.addTodo(todoStore.inputVal)
          }
        }}
        placeholder="Task Name..."
      />
      <StyledSubmitBtn
        onClick={() => {
          if (todoStore.inputVal) {
            todoStore.addTodo(todoStore.inputVal);
          }
        }}
      >
        Submit
      </StyledSubmitBtn>
    </>
  );
});

export default InputComponent;
