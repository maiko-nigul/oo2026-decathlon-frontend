import { useEffect, useState } from "react";

interface Result {
  id: number;
  discipline: string;
  value: number;
  points: number;
}

interface Athlete {
  id: number;
  name?: string;
  results?: Result[];
}

function TotalScores() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then((res) => res.json())
      .then((json) => {
        // Sort athletes by total points descending
        const sorted = json.sort((a: Athlete, b: Athlete) => {
          const scoreA = a.results?.reduce((sum, r) => sum + r.points, 0) || 0;
          const scoreB = b.results?.reduce((sum, r) => sum + r.points, 0) || 0;
          return scoreB - scoreA;
        });
        setAthletes(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Kõik skoorid (Edetabel)</h2>
      {athletes.length === 0 ? (
        <p>Sportlasi pole veel lisatud.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Koht</th>
              <th>Nimi</th>
              <th>Koguskoor</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete, index) => {
              const totalScore = athlete.results?.reduce(
                (sum, r) => sum + r.points,
                0
              ) || 0;

              return (
                <tr key={athlete.id}>
                  <td>{index + 1}</td>
                  <td>{athlete.name || `Sportlane #${athlete.id}`}</td>
                  <td>{totalScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TotalScores;