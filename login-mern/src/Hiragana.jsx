import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function Hiragana() {
  const hiragana = [
    { romanji: "a", hiragana: "あ" },
    { romanji: "i", hiragana: "い" },
    { romanji: "u", hiragana: "う" },
    { romanji: "e", hiragana: "え" },
    { romanji: "o", hiragana: "お" },
    { romanji: "ka", hiragana: "か" },
    { romanji: "ki", hiragana: "き" },
    { romanji: "ku", hiragana: "く" },
    { romanji: "ke", hiragana: "け" },
    { romanji: "ko", hiragana: "こ" },
    { romanji: "sa", hiragana: "さ" },
    { romanji: "shi", hiragana: "し" },
    { romanji: "su", hiragana: "す" },
    { romanji: "se", hiragana: "せ" },
    { romanji: "so", hiragana: "そ" },
    { romanji: "ta", hiragana: "た" },
    { romanji: "chi", hiragana: "ち" },
    { romanji: "tsu", hiragana: "つ" },
    { romanji: "te", hiragana: "て" },
    { romanji: "to", hiragana: "と" },
    { romanji: "na", hiragana: "な" },
    { romanji: "ni", hiragana: "に" },
    { romanji: "nu", hiragana: "ぬ" },
    { romanji: "ne", hiragana: "ね" },
    { romanji: "no", hiragana: "の" },
    { romanji: "ha", hiragana: "は" },
    { romanji: "hi", hiragana: "ひ" },
    { romanji: "fu", hiragana: "ふ" },
    { romanji: "he", hiragana: "へ" },
    { romanji: "ho", hiragana: "ほ" },
    { romanji: "ma", hiragana: "ま" },
    { romanji: "mi", hiragana: "み" },
    { romanji: "mu", hiragana: "む" },
    { romanji: "me", hiragana: "め" },
    { romanji: "mo", hiragana: "も" },
    { romanji: "ya", hiragana: "や" },
    { romanji: "yu", hiragana: "ゆ" },
    { romanji: "yo", hiragana: "よ" },
    { romanji: "ra", hiragana: "ら" },
    { romanji: "ri", hiragana: "り" },
    { romanji: "ru", hiragana: "る" },
    { romanji: "re", hiragana: "れ" },
    { romanji: "ro", hiragana: "ろ" },
    { romanji: "wa", hiragana: "わ" },
    { romanji: "wo", hiragana: "を" },
    { romanji: "n", hiragana: "ん" },
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
    { romanji: "bo", hiragana: "ぼ" },
    { romanji: "pa", hiragana: "ぱ" },
    { romanji: "pi", hiragana: "ぴ" },
    { romanji: "pu", hiragana: "ぷ" },
    { romanji: "pe", hiragana: "ぺ" },
    { romanji: "po", hiragana: "ぽ" },
    { romanji: "kya", hiragana: "きゃ" },
    { romanji: "kyu", hiragana: "きゅ" },
    { romanji: "kyo", hiragana: "きょ" },
    { romanji: "sha", hiragana: "しゃ" },
    { romanji: "shu", hiragana: "しゅ" },
    { romanji: "sho", hiragana: "しょ" },
    { romanji: "ja", hiragana: "じゃ" },
    { romanji: "ju", hiragana: "じゅ" },
    { romanji: "jo", hiragana: "じょ" },
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

export default Hiragana;
