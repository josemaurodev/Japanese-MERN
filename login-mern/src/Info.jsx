import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Info() {
  return (
    <div className="min-vh-100 text-white text-center">
      <Header></Header>

      <div className="text-center">
        <h1 className="display-4 font-weight-bold mb-4">
          Welcome to the Hiragana Quiz App!
        </h1>
        <br />
        <p>
          This app is designed to help you learn and practice the Japanese
          hiragana and Katakana characters.
        </p>
        <p>
          You can test your knowledge by taking quizzes and track your progress
          over time.
        </p>
        <br />
        <h3>Features:</h3>
        <div className="mx-auto max-w-md text-left">
          <ul className="list-unstyled">
            <li>Interactive quizzes to test your hiragana and katakana knowledge</li>
            <li>Streak tracking to monitor your progress</li>
            <li>
              Dropdown menu to navigate between different sections of hiragana and katakana
            </li>
            <li>Login page for personalized experience (optional)</li>
          </ul>
        </div>
        <br />
        <p>
          Get started by navigating to the "Learn Hiragana" section or take a
          quiz right away!
        </p>
      </div>
    </div>
  );
}

export default Info;
