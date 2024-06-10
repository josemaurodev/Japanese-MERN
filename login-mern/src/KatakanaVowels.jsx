import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function KatakanaVowels() {
  const katakana = [
    { romanji: "a", katakana: "ア" },
    { romanji: "i", katakana: "イ" },
    { romanji: "u", katakana: "ウ" },
    { romanji: "e", katakana: "エ" },
    { romanji: "o", katakana: "オ" },
  ];

  const [current, setCurrent] = useState(0);

  const handleNextClick = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === katakana.length - 1 ? 0 : prevCurrent + 1
    );
  };

  useEffect(() => {
    setCurrent(0);
  }, []);

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="LEARN KATAKANA" />
      <div className="text-9xl font-bold mb-8">{katakana[current].katakana}</div>
      <div className="text-9xl font-bold mb-8">{katakana[current].romanji}</div>
      <div className="mb-16 mt-16">
        <button
          onClick={handleNextClick}
          className="btn btn-primary px-4 py-2 m-10 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default KatakanaVowels;
