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
  country?: string;
  results?: Result[];
}

function TotalScores() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [country, setCountry] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    // Construed backend query URL based on requested parameters
    const url = new URL("http://localhost:8080/athletes");
    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", "10");
    
    if (country) {
      url.searchParams.append("country", country);
    }
    
    // Standard Spring Data JPA sorting format. Adjust field name 'score' if backend uses a different name (e.g. 'totalScore')
    url.searchParams.append("sort", `score,${sortOrder}`);

    fetch(url.toString())
      .then((res) => res.json())
      .then((json) => {
        // Handle both Spring Page object and simple array responses
        if (json.content) {
          setAthletes(json.content);
          setTotalPages(json.totalPages || 1);
        } else if (Array.isArray(json)) {
          setAthletes(json);
        }
      })
      .catch((err) => console.error(err));
  }, [page, country, sortOrder]);

  return (
    <div>
      <h2>Kõik skoorid (Edetabel)</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Filtreeri riigi järgi:
          <input 
            type="text" 
            value={country} 
            onChange={(e) => {
              setCountry(e.target.value);
              setPage(0); // Reset to first page when filtering
            }} 
            placeholder="nt. EST" 
            style={{ marginLeft: "10px", marginRight: "20px" }}
          />
        </label>

        <label>
          Sorteeri tulemuse alusel:
          <select 
            value={sortOrder} 
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(0); // Reset to first page when sorting changes
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="desc">Kahanevalt (Suurem skoor esimesena)</option>
            <option value="asc">Kasvavalt (Väiksem skoor esimesena)</option>
          </select>
        </label>
      </div>

      {athletes.length === 0 ? (
        <p>Sportlasi pole veel lisatud või ei leitud antud riigiga.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Nimi</th>
              <th>Riik</th>
              <th>Koguskoor</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => {
              const totalScore = athlete.results?.reduce(
                (sum, r) => sum + r.points,
                0
              ) || 0;

              return (
                <tr key={athlete.id}>
                  <td>{athlete.name || `Sportlane #${athlete.id}`}</td>
                  <td>{athlete.country || "-"}</td>
                  <td>{totalScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={() => setPage(p => Math.max(0, p - 1))} 
          disabled={page === 0}
        >
          Eelmine
        </button>
        <span style={{ margin: "0 15px" }}>Lehekülg {page + 1}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={athletes.length < 10 && page + 1 >= totalPages}
        >
          Järgmine
        </button>
      </div>
    </div>
  );
}

export default TotalScores;