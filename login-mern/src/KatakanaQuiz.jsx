import { useState, useEffect } from "react";
import "./style.css";
import Header from "./Header";
import katakana from "./assets/katakana/katakana.json"

function KatakanaQuiz() {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState("");
  //faltava o tries, criamos
  //na realidade o tries pode ser pego só na pagina do grades
  //a linha ta pronta, pega aq
  //const [tries, setTries] = useState(0);
  //vai colocar o que tu pegou do banco nos useState;

  const setRandomKatakana = () => {
    const randomIndex = Math.floor(Math.random() * katakana.length);
    setCurrent(randomIndex);
  };

  const handleChange = (evt) => {
    setInput(evt.target.value);
    setError("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (input.trim() === "") {
      setError("You have to type something");
      return;
    }

    if (input.toLowerCase() === katakana[current].romanji) {
      setStreak(streak + 1);
      setMaxStreak(Math.max(streak + 1, maxStreak));
      setError("");
      //ao inves de salvar no storage salva no banco
      //e tem que aumentar as tries tb
      localStorage.setItem("maxStreakKatakana", Math.max(streak + 1, maxStreak));
      localStorage.setItem("streakKatakana", streak + 1);
    } else {
      setStreak(0);
      setError(`Close! The correct answer for ${katakana[current].katakana} is ${katakana[current].romanji}`);
      localStorage.setItem("streakKatakana", 0);
    }

    setInput("");
    setRandomKatakana();
  };

  // const handleNextClick = () => {
  //   setRandomKatakana(); aaaaa
  //   setError("");
  // };

  useEffect(() => {
    setRandomKatakana();
    //pegar do banco os valores de  
    //currentStreakHiraga: { type: Number, default: 0 },
    //maxStreakHiragana: { type: Number, default: 0 },
    //countingTriesHiragana: { type: Number, default: 0 },
    //countingCorrectsHiragana: { type: Number, default: 0 },
    //colocar nos estados

    setStreak(parseInt(localStorage.getItem("streakKatakana")) || 0);
    setMaxStreak(parseInt(localStorage.getItem("maxStreakKatakana")) || 0);
  }, []);

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="KATAKANA QUIZ"></Header>
      <div>
        <p className="text-4xl mb-1">Current Streak / Max Streak</p>
        <p>
          {streak}/{maxStreak}   
        </p>
      </div>
      <div className="katakana-display">
        {katakana[current].katakana}
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
      <div className="flex justify-center">
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

export default KatakanaQuiz;
