import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function KatakanaQuiz() {
  const katakana = [
    { romanji: "a", katakana: "ア" },
    { romanji: "i", katakana: "イ" },
    { romanji: "u", katakana: "ウ" },
    { romanji: "e", katakana: "エ" },
    { romanji: "o", katakana: "オ" },
    { romanji: "ka", katakana: "カ" },
    { romanji: "ki", katakana: "キ" },
    { romanji: "ku", katakana: "ク" },
    { romanji: "ke", katakana: "ケ" },
    { romanji: "ko", katakana: "コ" },
    { romanji: "sa", katakana: "サ" },
    { romanji: "shi", katakana: "シ" },
    { romanji: "su", katakana: "ス" },
    { romanji: "se", katakana: "セ" },
    { romanji: "so", katakana: "ソ" },
    { romanji: "ta", katakana: "タ" },
    { romanji: "chi", katakana: "チ" },
    { romanji: "tsu", katakana: "ツ" },
    { romanji: "te", katakana: "テ" },
    { romanji: "to", katakana: "ト" },
    { romanji: "na", katakana: "ナ" },
    { romanji: "ni", katakana: "ニ" },
    { romanji: "nu", katakana: "ヌ" },
    { romanji: "ne", katakana: "ネ" },
    { romanji: "no", katakana: "ノ" },
    { romanji: "ha", katakana: "ハ" },
    { romanji: "hi", katakana: "ヒ" },
    { romanji: "fu", katakana: "フ" },
    { romanji: "he", katakana: "ヘ" },
    { romanji: "ho", katakana: "ホ" },
    { romanji: "ma", katakana: "マ" },
    { romanji: "mi", katakana: "ミ" },
    { romanji: "mu", katakana: "ム" },
    { romanji: "me", katakana: "メ" },
    { romanji: "mo", katakana: "モ" },
    { romanji: "ya", katakana: "ヤ" },
    { romanji: "yu", katakana: "ユ" },
    { romanji: "yo", katakana: "ヨ" },
    { romanji: "ra", katakana: "ラ" },
    { romanji: "ri", katakana: "リ" },
    { romanji: "ru", katakana: "ル" },
    { romanji: "re", katakana: "レ" },
    { romanji: "ro", katakana: "ロ" },
    { romanji: "wa", katakana: "ワ" },
    { romanji: "wo", katakana: "ヲ" },
    { romanji: "n", katakana: "ン" },
    { romanji: "ga", katakana: "ガ" },
    { romanji: "gi", katakana: "ギ" },
    { romanji: "gu", katakana: "グ" },
    { romanji: "ge", katakana: "ゲ" },
    { romanji: "go", katakana: "ゴ" },
    { romanji: "za", katakana: "ザ" },
    { romanji: "ji", katakana: "ジ" },
    { romanji: "zu", katakana: "ズ" },
    { romanji: "ze", katakana: "ゼ" },
    { romanji: "zo", katakana: "ゾ" },
    { romanji: "da", katakana: "ダ" },
    { romanji: "ji", katakana: "ヂ" },
    { romanji: "zu", katakana: "ヅ" },
    { romanji: "de", katakana: "デ" },
    { romanji: "do", katakana: "ド" },
    { romanji: "ba", katakana: "バ" },
    { romanji: "bi", katakana: "ビ" },
    { romanji: "bu", katakana: "ブ" },
    { romanji: "be", katakana: "ベ" },
    { romanji: "bo", katakana: "ボ" },
    { romanji: "pa", katakana: "パ" },
    { romanji: "pi", katakana: "ピ" },
    { romanji: "pu", katakana: "プ" },
    { romanji: "pe", katakana: "ペ" },
    { romanji: "po", katakana: "ポ" },
    { romanji: "kya", katakana: "キャ" },
    { romanji: "kyu", katakana: "キュ" },
    { romanji: "kyo", katakana: "キョ" },
    { romanji: "sha", katakana: "シャ" },
    { romanji: "shu", katakana: "シュ" },
    { romanji: "sho", katakana: "ショ" },
    { romanji: "ja", katakana: "ジャ" },
    { romanji: "ju", katakana: "ジュ" },
    { romanji: "jo", katakana: "ジョ" },
  ];

  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState("");

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

  const handleNextClick = () => {
    setRandomKatakana();
    setError("");
  };

  useEffect(() => {
    setRandomKatakana();
    setStreak(parseInt(localStorage.getItem("streakKatakana")) || 0);
    setMaxStreak(parseInt(localStorage.getItem("maxStreakKatakana")) || 0);
  }, []);

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="KATAKANA QUIZ"></Header>
      <div>
        <p className="text-4xl mb-1">Max Streak</p>
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

      <div className="mt-16 text-3xl text-blue-200 underline">
        <Link to="/hiraganaQuiz">Go to Hiragana Quiz</Link>
      </div>
    </div>
  );
}

export default KatakanaQuiz;
