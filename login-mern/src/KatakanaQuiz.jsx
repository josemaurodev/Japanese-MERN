import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./style.css";
import Header from "./Header";
import katakana from "./assets/katakana/katakana.json";

function KatakanaQuiz() {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [tries, setTries] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [error, setError] = useState("");

  const setRandomKatakana = () => {
    const randomIndex = Math.floor(Math.random() * katakana.length);
    setCurrent(randomIndex);
  };

  const handleChange = (evt) => {
    setInput(evt.target.value);
    setError("");
  };

  const handleSubmit = async (evt) => {
    const userID = localStorage.getItem("userID");
    evt.preventDefault();
  
    if (input.trim() === "") {
      setError("You have to type something");
      return;
    }
  
    let newStreak = streak;
    let newMaxStreak = maxStreak;
    let newTries = tries + 1;
    let newCorrects = corrects;
  
    if (input.toLowerCase() === katakana[current].romanji) {
      newStreak = streak + 1;
      newCorrects = corrects + 1;
      newMaxStreak = Math.max(streak + 1, maxStreak);
      setError("");
    } else {
      newStreak = 0;
      setError(
        `Close! The correct answer for ${katakana[current].katakana} is ${katakana[current].romanji}`
      );
    }
  
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);
    setTries(newTries);
    setCorrects(newCorrects);
  
    try {
      await axios.patch(`http://localhost:3001/gradeKatakana?userID=${userID}`, {
        currentStreakKatakana: newStreak,
        maxStreakKatakana: newMaxStreak,
        countingTriesKatakana: newTries,
        countingCorrectsKatakana: newCorrects,
      });
    } catch (error) {
      console.error("Error updating statistics:", error);
    }
  
    setInput("");
    setRandomKatakana();
  };
  

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/grade?userID=${userID}`);
        const data = response.data;
        if (data.status === "success") {
          setStreak(data.statistics.currentStreakKatakana || 0);
          setMaxStreak(data.statistics.maxStreakKatakana || 0);
          setTries(data.statistics.countingTriesKatakana || 0);
          setCorrects(data.statistics.countingCorrectsKatakana || 0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    setRandomKatakana();
  }, []);

  return (
    <div className="h-100 bg-dark text-white text-center outline-none box-shadow-none">
      <Header title="KATAKANA QUIZ"></Header>
      <div>
        <p className="text-4xl mb-1">
          Current Streak / Max Streak 
        </p>
        <p className="text-4xl mb-1">
          {streak} / {maxStreak} 
        </p>
      </div>
      <div className="katakana-display">{katakana[current].katakana}</div>

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
