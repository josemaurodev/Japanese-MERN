import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function HiraganaDakuten() {
  const hiragana = [
    { romanji: "ga", hiragana: "が" },
    { romanji: "gi", hiragana: "ぎ" },
    { romanji: "gu", hiragana: "ぐ" },
    { romanji: "ge", hiragana: "げ" },
    { romanji: "go", hiragana: "ご" },
    { romanji: "za", hiragana: "ざ" },
    { romanji: "ji", hiragana: "じ" },
    { romanji: "zu", hiragana: "ず" },
    { romanji: "ze", hiragana: "ぜ" },
    { romanji: "zo", hiragana: "ぞ" },
    { romanji: "da", hiragana: "だ" },
    { romanji: "ji", hiragana: "ぢ" },
    { romanji: "zu", hiragana: "づ" },
    { romanji: "de", hiragana: "で" },
    { romanji: "do", hiragana: "ど" },
    { romanji: "ba", hiragana: "ば" },
    { romanji: "bi", hiragana: "び" },
    { romanji: "bu", hiragana: "ぶ" },
    { romanji: "be", hiragana: "べ" },
  ];

  const [current, setCurrent] = useState(0);

  const handleNextClick = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === hiragana.length - 1 ? 0 : prevCurrent + 1
    );
  };

  useEffect(() => {
    setCurrent(0);
  }, []);

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="LEARN HIRAGANA DAKUTEN" />
      <div className="text-9xl font-bold mb-8">{hiragana[current].hiragana}</div>
      <div className="text-9xl font-bold mb-8">{hiragana[current].romanji}</div>
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

export default HiraganaDakuten;
