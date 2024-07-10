import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./style.css";
import Header from "./Header";

function Grades() {
  const [hiraganaStats, setHiraganaStats] = useState({
    corrects: 0,
    tries: 0,
  });
  const [katakanaStats, setKatakanaStats] = useState({
    corrects: 0,
    tries: 0,
  });

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/grade?userID=${userID}`);
        const data = response.data;
        if (data.status === "success") {
          setHiraganaStats({
            corrects: data.statistics.countingCorrectsHiragana || 0,
            tries: data.statistics.countingTriesHiragana || 0,
          });
          setKatakanaStats({
            corrects: data.statistics.countingCorrectsKatakana || 0,
            tries: data.statistics.countingTriesKatakana || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchStatistics();
  }, []);

  const calculatePercentage = (corrects, tries) => {
    return tries > 0 ? ((corrects / tries) * 100).toFixed(2) : 0;
  };

  const hiraganaPercentage = calculatePercentage(
    hiraganaStats.corrects,
    hiraganaStats.tries
  );
  const katakanaPercentage = calculatePercentage(
    katakanaStats.corrects,
    katakanaStats.tries
  );

  const resetHiraganaStats = async () => {
    const userID = localStorage.getItem("userID");
    try {
      await axios.patch(`http://localhost:3001/gradeHiragana?userID=${userID}`, {
        currentStreakHiragana: 0,
        maxStreakHiragana: 0,
        countingTriesHiragana: 0,
        countingCorrectsHiragana: 0,
      });
      setHiraganaStats({ corrects: 0, tries: 0 });
    } catch (error) {
      console.error("Error resetting Hiragana statistics:", error);
    }
  };

  const resetKatakanaStats = async () => {
    const userID = localStorage.getItem("userID");
    try {
      await axios.patch(`http://localhost:3001/gradeKatakana?userID=${userID}`, {
        currentStreakKatakana: 0,
        maxStreakKatakana: 0,
        countingTriesKatakana: 0,
        countingCorrectsKatakana: 0,
      });
      setKatakanaStats({ corrects: 0, tries: 0 });
    } catch (error) {
      console.error("Error resetting Katakana statistics:", error);
    }
  };

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="GRADES"></Header>
      <div className="mt-10">
        <p className="text-4xl mb-5">Your Performance</p>
        <div className="statistics">
          <p className="text-2xl mb-3">Hiragana Quiz</p>
          <p className="text-2xl mb-5">
            Correct Answers: {hiraganaStats.corrects}/{hiraganaStats.tries}
            <br />
            Correct Percentage: {hiraganaPercentage}%
          </p>
          <button
            className="btn btn-primary px-4 py-2 m-10 text-white rounded-md"
            onClick={resetHiraganaStats}
          >
            Reset Hiragana
          </button>
          <p className="text-2xl mb-3"><br />Katakana Quiz</p>
          <p className="text-2xl mb-5">
            Correct Answers: {katakanaStats.corrects}/{katakanaStats.tries}
            <br />
            Correct Percentage: {katakanaPercentage}%
          </p>
          <button
            className="btn btn-primary px-4 py-2 m-10 text-white rounded-md"
            onClick={resetKatakanaStats}
          >
            Reset Katakana
          </button>
        </div>
      </div>
    </div>
  );
}

export default Grades;
