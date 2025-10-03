import Link from "next/link";
import React from "react";

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
  },
  {
    id: 2,
    question: "What is the purpose of CSS?",
    answer: "It styles and layouts HTML elements on a web page.",
  },
  {
    id: 3,
    question: "What is JavaScript primarily used for?",
    answer: "To make web pages interactive and dynamic.",
  },
  {
    id: 4,
    question: "What does React use to track UI changes?",
    answer: "A virtual DOM.",
  },
  {
    id: 5,
    question: "What does API stand for?",
    answer: "Application Programming Interface.",
  },
  {
    id: 6,
    question: "What does API stand for?",
    answer: "Application Programming Interface.",
  },
  {
    id: 7,
    question: "What does API stand for?",
    answer: "Application Programming Interface.",
  },
];

const Page = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-10 pb-10">
      <div className="bg-red-800 text-center p-3 text-white w-full">
        <Link href="/">HOME</Link>
      </div>

      <Flashcards />
    </div>
  );
};



function Flashcards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-center items-center px-20 ">
      {questions.map((q) => (
        <div
          className=" p-10 py-20  bg-gray-200 rounded-lg shadow-xl"
          key={q.id}
        >
          <p> {q.question}</p>
        </div>
      ))}
    </div>
  );
}

export default Page;
