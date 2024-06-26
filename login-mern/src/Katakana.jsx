import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./Header";

function Katakana() {
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

export default Katakana;
