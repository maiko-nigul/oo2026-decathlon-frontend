import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAthlete() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:8080/athletes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Sportlane lisatud!");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Lisa sportlane</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Nimi: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvesta</button>
      </form>
    </div>
  );
}

export default AddAthlete;