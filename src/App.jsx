import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ]);

  return (
    <div className="app-container">
      <header>
        <h1>Todo-List</h1>
      </header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="add-button"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);
  const [isEditing, setIsEditing] = useState(false);

  const toggleCompleted = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  const handleEditClick = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? "completed" : "" }>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {isEditing ? (
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          autoFocus />
      ) : (
        <span>{todo.content}</span>
      )}

      <button onClick={() => {
        if (isEditing) {
          handleEditClick();
        } else {
          setIsEditing(true);
        }
      }}
      >

        {isEditing ? '수정 완료' : '수정'}
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
