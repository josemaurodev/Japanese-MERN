import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function KatakanaDakuten() {
  const katakana = [
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
      <Header title="Learn Katakana Dakuten" />
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

export default KatakanaDakuten;
