"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState([]);

  function deleteTodo(id) {
    setTodo((todo) => todo.filter((todo) => todo.id !== id));
  }

  function updateTodo(id) {
    setTodo((todo) =>
      todo.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="flex flex-col  items-center h-screen ">
      <Link
        href="/flashcard"
        className="p-3 bg-red-700 text-white w-full text-center"
      >
        Flashcards Page
      </Link>
      <Logo />
      <Form todo={todo} setTodo={setTodo} />
      <PackingList
        todo={todo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      <Stats todo={todo} />
    </div>
  );
}

function Logo() {
  return (
    <h1 className="text-6xl text-center bg-amber-600 w-full p-5">
      🎋 Far Away✈️
    </h1>
  );
}

function Form({ todo, setTodo }) {
  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState(1);

  function addText(e) {
    const newObj = {
      id: Date.now(),
      description: text,
      quantity: quantity,
      packed: false,
    };

    e.preventDefault();
    if (!text) return;
    setText("");
    setQuantity(1);
    setTodo((prev) => [...prev, newObj]);
  }
  useEffect(() => {
    console.log(todo);
  }, [todo]);

  return (
    <div className=" bg-amber-800 w-full text-center p-5 text-white flex flex-col md:flex-row justify-center items-center gap-3">
      <h3 className="mr-3"> What do you need for your trip</h3>

      <form className="flex w-fit h-fit " onSubmit={addText}>
        <select
          className="text-black px-3 border outline-0 border-white"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="enter"
          className="border border-amber-50 outline-0 ml-3 p-2"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className=" border ml-3 px-2"> Add</button>
      </form>
    </div>
  );
}

function PackingList({ todo, deleteTodo, updateTodo }) {
  return (
    <div className="h-full bg-amber-950 w-full  py-5 text-white md:flex md:justify-center lg:px-[100px] ">
      <ul className="grid gap-5 md:grid-cols-2  justify-center items-start max-w-[800px]">
        {todo.map((item) => (
          <Item
            key={item.id}
            item={item}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, deleteTodo, updateTodo }) {
  return (
    <li className=" relative flex gap-3 border items-center h-fit p-3 cursor-pointer ">
      <input
        type="checkbox"
        onChange={() => updateTodo(item.id)}
        checked={item.packed}
      />
      <span className={item.packed ? "line-through" : ""}>
        {item.quantity} {item.description}
      </span>
      <button className="border" onClick={() => deleteTodo(item.id)}>
        ❌{" "}
      </button>
    </li>
  );
}

function Stats({ todo }) {
  if (!todo.length) {
    return (
      <footer className="p-4 bg-green-500 w-full text-center">
        {" "}
        Get your journey started, Add an Item🚀🚀{" "}
      </footer>
    );
  }

  const todoLength = todo.length;
  const packedItems = todo.filter((item) => item.packed === true).length;
  const percentage =
    todoLength === 0 ? 0 : Math.round((packedItems / todoLength) * 100);
  return (
    <footer className="p-4 bg-green-500 w-full text-center">
      <em>
        {percentage === 100 ? (
          "you are set up and ready to go"
        ) : (
          <>
            ❤️ you have {todoLength} items on your List and you already packed{" "}
            {""}
            {packedItems} ({percentage}%)
          </>
        )}
      </em>
    </footer>
  );
}
