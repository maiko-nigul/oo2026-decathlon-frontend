import { useEffect, useState } from "react";

interface Athlete {
  id: number;
  name?: string;
  country?: string;
  results?: any[];
}

function HomePage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const url = new URL("http://localhost:8080/athletes");
    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", "10");

    fetch(url.toString())
      .then((res) => res.json())
      .then((json) => {
        if (json.content) {
          setAthletes(json.content);
          setTotalPages(json.totalPages || 1);
        } else if (Array.isArray(json)) {
          setAthletes(json);
        }
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div>
      <h2>Avaleht - Kõik sportlased</h2>
      {athletes.length === 0 ? (
        <p>Sportlasi pole veel lisatud.</p>
      ) : (
        <>
          <ul>
            {athletes.map((athlete) => (
              <li key={athlete.id}>
                {athlete.name || `Sportlane #${athlete.id}`} {athlete.country ? `(${athlete.country})` : ""}
              </li>
            ))}
          </ul>
          
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
        </>
      )}
    </div>
  );
}

export default HomePage;