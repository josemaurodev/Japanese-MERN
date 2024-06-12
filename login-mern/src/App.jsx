// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./Signup";
import Login from "./Login";
import Info from "./Info";
import HiraganaQuiz from "./HiraganaQuiz";
import KatakanaQuiz from "./KatakanaQuiz";
import Hiragana from "./Hiragana";
import HiraganaHandakuten from "./HiraganaHandakuten";
import HiraganaDakuten from "./HiraganaDakuten";
import HiraganaVowels from "./HiraganaVowels";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Katakana from "./Katakana";
import KatakanaVowels from "./KatakanaVowels";
import KatakanaHandakuten from "./KatakanaHandakuten";
import KatakanaDakuten from "./KatakanaDakuten";
import YourAccount from "./YourAccount";
import Schedule from "./Schedule";
import CustomSchedule from "./CustomSchedule";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/info" element={<Info />}></Route>
        <Route path="/HiraganaQuiz" element={<HiraganaQuiz />}></Route>
        <Route path="/KatakanaQuiz" element={<KatakanaQuiz />}></Route>
        <Route path="/Hiragana" element={<Hiragana />}></Route>
        <Route path="/HiraganaVowels" element={<HiraganaVowels />}></Route>
        <Route path="/HiraganaHandakuten" element={<HiraganaHandakuten />}></Route>
        <Route path="/HiraganaDakuten" element={<HiraganaDakuten />}></Route>
        <Route path="/Katakana" element={<Katakana />}></Route>
        <Route path="/KatakanaVowels" element={<KatakanaVowels />}></Route>
        <Route path="/KatakanaHandakuten" element={<KatakanaHandakuten />}></Route>
        <Route path="/KatakanaDakuten" element={<KatakanaDakuten />}></Route>
        <Route path="/YourAccount" element={<YourAccount />}></Route>
        <Route path="/Pre-made-schedule" element={<Schedule />}></Route>
        <Route path="/Custom-schedule" element={<CustomSchedule />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
