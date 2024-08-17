import "../utils/style-utils/globals.css";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  return (
    <main className="w-[15rem] p-1 bg-white">
      <Header />
      <TodoList />
      <AddTodo />
    </main>
  );
}

export default App;
