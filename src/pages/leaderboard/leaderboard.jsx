import React, { useEffect, useState } from "react";
import "./leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();

        // Sort by wins (DESC)
        const sorted = data.sort((a, b) => b.wins - a.wins);
        setUsers(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="loading">Loading leaderboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>
      <p className="subtitle">
        Top performers ranked by number of contest wins
      </p>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Wins</th>
            <th>Total Contests</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const winRate = (
              (user.wins / user.totalContests) *
              100
            ).toFixed(1);

            return (
              <tr key={user._id} className={index < 3 ? "top-rank" : ""}>
                <td>#{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.wins}</td>
                <td>{user.totalContests}</td>
                <td>{winRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
