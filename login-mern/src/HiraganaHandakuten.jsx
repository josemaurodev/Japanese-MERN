import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function HiraganaHandakuten() {
  const hiragana = [
    { romanji: "pa", hiragana: "ぱ" },
    { romanji: "pi", hiragana: "ぴ" },
    { romanji: "pu", hiragana: "ぷ" },
    { romanji: "pe", hiragana: "ぺ" },
    { romanji: "po", hiragana: "ぽ" },
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
      <Header title="LEARN HIRAGANA" />
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

export default HiraganaHandakuten;
