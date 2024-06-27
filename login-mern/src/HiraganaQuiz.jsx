import { useState, useEffect } from "react";
import "./style.css"
import Header from "./Header";
import hiragana from "./assets/hiragana/hiragana.json"

function HiraganaQuiz() {

  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState(false);

  const setRandomHiragana = () => {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    setCurrent(randomIndex);
  };

  const handleChange = (evt) => {
    setInput(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //Check to see if input is empty
    if (input.trim() === "") {
      setError("You have to type something");
      return; //If input is empty, return early
    }

    if (input.toLowerCase() === hiragana[current].romanji) {
      setStreak(streak + 1);
      setMaxStreak(Math.max(streak + 1, maxStreak));
      setError(false);

      localStorage.setItem(
        "maxStreak", 
        Math.max(streak, maxStreak)
      );
      localStorage.setItem("streak", streak + 1);
    } else {
      setStreak(0);
      setError(
        `Close! The correct answer for ${hiragana[current].hiragana} is ${hiragana[current].romanji}`
      );

      localStorage.setItem("streak", 0);
    }

    setInput("");
    setRandomHiragana();
  };

  const handleNextClick = () => {
    if (current === 0) {
      setCurrent(1);
    } else if (current === hiragana.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    setRandomHiragana();
    setStreak(parseInt(localStorage.getItem("streak")) || 0);
    setMaxStreak(parseInt(localStorage.getItem("maxStreak")) || 0);
  }, []);

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="HIRAGANA QUIZ"></Header>
      <div>
          <p className="text-4xl mb-1">Max Streak</p>
          <p>
            {streak}/{maxStreak}
          </p>
        </div>
      <div className="hiragana-display">
        {hiragana[current].hiragana}
      </div>
  
      <div className="mb-16 mt-16">
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="form-control w-64 mx-auto pb-2 bg-transparent border-b-2 border-white text-center text-white text-4xl"
          />
        </form>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}
      <div className="my-4">
      <button
          onClick={handleSubmit}
          className="btn btn-primary px-4 py-2 m-10 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
  
}

export default HiraganaQuiz;
