import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";

function Grades() {
  const [statistics, setStatistics] = useState(null);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/statistics`, {
          params: { userID }
        });
        setStatistics(response.data.statistics);
      } catch (err) {
        console.error("Failed to fetch statistics:", err);
      }
    };

    fetchStatistics();
  }, [userID]);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-white">
      <Header title="Grades"></Header>
      <h2 className="my-4">Student Grades</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current Streak Katakana</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Max Streak Katakana</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Counting Tries Katakana</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Counting Corrects Katakana</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Grades;
