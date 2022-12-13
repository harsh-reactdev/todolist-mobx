import "./styles.css";
import TodoList from "./TodoList/TodoList";
import { TodoStore } from "./TodoList/TodoStore";

export default function App() {
  return (
    <div className="App">
      <TodoList todoStore={TodoStore} />
    </div>
  );
}
