import { useEffect, useState } from "react";

interface Athlete {
  id: number;
  name?: string;
  results?: any[];
}

function HomePage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then((res) => res.json())
      .then((json) => setAthletes(json))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Avaleht - Kõik sportlased</h2>
      {athletes.length === 0 ? (
        <p>Sportlasi pole veel lisatud.</p>
      ) : (
        <ul>
          {athletes.map((athlete) => (
            <li key={athlete.id}>
              {athlete.name || `Sportlane #${athlete.id}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;