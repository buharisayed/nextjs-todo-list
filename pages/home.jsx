import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .then(setTodos);
  }, []);

  const handleAddTodo = () => {
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text: newTodo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((addedTodo) => {
        setTodos([...todos, addedTodo]);
        setNewTodo("");
      });
  };
  const handleDeleteTodo = (id) => {
    const deleteUrl = `/api/todos/${id}`;
    console.log("Deleting todo with URL:", deleteUrl);
  
    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setTodos(todos.filter((todo) => todo._id !== id));
        } else {
          console.error(`Failed to delete todo. Response status: ${response.status}`);
          return response.text();  // Get more information from the response
        }
      })
      .then((errorText) => {
        console.error("Additional error details:", errorText);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };
  
  

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="p-4 w-full flex flex-col items-center justify-center">
  <h1 className="text-2xl text-white text-center">Todo List</h1>

  <div className="flex items-center space-x-2">
  <input
    className="input input-bordered input-primary w-full"
    type="text"
    placeholder="Add a new todo..."
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
  />
  <button
    onClick={handleAddTodo}
    className="btn btn-primary"
  >
    Add
  </button>
</div>
<div className="flex items-center justify-center">

  <table className="w-full table-auto">
    <thead>
      <tr>
        <th className="px-4 py-2">Todos</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {todos.map((todo) => (
        <tr key={todo._id}>
          
          <td className="px-4 py-2">{todo.text}</td>
          <td className="px-4 py-2">
            <button
              className="btn btn-success"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Completed
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
</main>

    </>
  );
}
