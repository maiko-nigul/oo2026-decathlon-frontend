import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Athlete {
  id: number;
  name?: string;
}

const DISCIPLINES = [
  "100m",
  "Long Jump",
  "Shot Put",
  "High Jump",
  "400m",
  "110m Hurdles",
  "Discus Throw",
  "Pole Vault",
  "Javelin Throw",
  "1500m",
];

function AddResult() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [athleteId, setAthleteId] = useState("");
  const [discipline, setDiscipline] = useState(DISCIPLINES[0]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then((res) => res.json())
      .then((json) => setAthletes(json))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteId) {
      alert("Palun vali sportlane!");
      return;
    }

    fetch(`http://localhost:8080/athletes/${athleteId}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        discipline,
        value: parseFloat(value),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Tulemus lisatud!");
        navigate("/total-scores");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Lisa tulemus</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="athlete">Sportlane: </label>
          <select
            id="athlete"
            value={athleteId}
            onChange={(e) => setAthleteId(e.target.value)}
            required
          >
            <option value="">-- Vali sportlane --</option>
            {athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name || `Sportlane #${athlete.id}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="discipline">Ala: </label>
          <select
            id="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            required
          >
            {DISCIPLINES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="value">Tulemus: </label>
          <input
            id="value"
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        <button type="submit">Salvesta</button>
      </form>
    </div>
  );
}

export default AddResult;