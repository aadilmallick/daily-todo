import "../utils/style-utils/globals.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  return (
    <>
      <div className="w-[15rem] p-1 bg-white">
        <h1 className="text-xl text-blue-400 font-bold text-center">
          Daily Todos
        </h1>
        <TodoList />
        <AddTodo />
      </div>
    </>
  );
}

export default App;
