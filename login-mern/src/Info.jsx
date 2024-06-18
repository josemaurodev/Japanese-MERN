import { Link } from "react-router-dom";
import tasks from "./assets/task.json";
import Header from "./Header";
import axios from "axios";

function Info() {
  const setFixedSchedule = () => {
    const id = localStorage.getItem("userID");
    axios
    //se o usuario clicar em predefinied schedule ele envia o 
    //id do usuario e as tasks pre definidas 
    //para o back
      .patch(`http://localhost:3001/schedule?userID=${id}`, {
        preDefinedTasks: tasks,
      })
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-vh-100 text-white text-center">
      <Header />

      <div className="text-center">
        <h1 className="display-4 font-weight-bold">
          Welcome to the Hiragana Quiz App!
        </h1>
        <br />
        <p>
          This app is designed to help you learn and practice the Japanese
          hiragana and katakana characters.
        </p>
        <p>
          You can test your knowledge by taking quizzes and track your progress
          over time.
        </p>
        <br />
        <h3>Features:</h3>
        <div className="mx-auto max-w-md text-left">
          <ul className="list-unstyled">
            <li>
              Interactive quizzes to test your hiragana and katakana knowledge
            </li>
            <li>Streak tracking to monitor your progress</li>
            <li>
              Dropdown menu to navigate between different sections of hiragana
              and katakana
            </li>
            <li>Login page for personalized experience (optional)</li>
          </ul>
        </div>
        <br />
        <p>
          Get started by navigating to the *Learn Hiragana* section or take a
          quiz right away!
        </p>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/schedule" 
          className="btn btn-primary mx-2"
          >
            Create Your Custom Schedule
          </Link>
          <Link
          //navega pra pre-made-schedule
            to="/schedule"
            className="btn btn-secondary mx-2"
            //ao clicar, depois de navegar, vai inserir na pagina pre-made-schedule o que voltar do back
            onClick={() => setFixedSchedule()}
          >
            Generate Pre-Made Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Info;
