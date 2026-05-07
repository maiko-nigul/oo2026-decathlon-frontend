import { useEffect, useState } from "react";
import type { Athlete } from "../models/Athlete";
import type { PageResponse } from "../models/PageResponse";

export const TotalScores = () => {
    const [athletePage, setAthletePage] = useState<PageResponse<Athlete> | null>(null);
    const [page, setPage] = useState(0);
    const [country, setCountry] = useState("");

    useEffect(() => {
        const url = `${import.meta.env.VITE_BACK_URL}/athletes?page=${page}&size=10&sort=totalPoints,desc&country=${country}`;
        
        fetch(url)
            .then(res => res.json())
            .then(json => setAthletePage(json))
            .catch(err => console.error("Viga andmete laadimisel:", err));
    }, [page, country]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Kümnevõistluse edetabel</h1>

            <div style={{ marginBottom: "15px" }}>
                <input 
                    type="text" 
                    placeholder="Filtreeri riigi järgi..." 
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); setPage(0); }}
                    style={{ padding: "8px", width: "200px" }}
                />
            </div>

            <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f0f0f0" }}>
                    <tr>
                        <th>Koht</th>
                        <th>Nimi</th>
                        <th>Riik</th>
                        <th>Punktid</th>
                    </tr>
                </thead>
                <tbody>
                    {athletePage?.content.map((athlete, index) => (
                        <tr key={athlete.id}>
                            <td>{page * 10 + index + 1}.</td>
                            <td><strong>{athlete.name}</strong></td>
                            <td>{athlete.country}</td>
                            <td>{athlete.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: "15px" }}>
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
                <span style={{ margin: "0 15px" }}>Leht {page + 1} / {athletePage?.totalPages || 1}</span>
                <button 
                    disabled={page >= (athletePage?.totalPages || 1) - 1} 
                    onClick={() => setPage(page + 1)}
                >
                    Järgmine
                </button>
            </div>
        </div>
    );
};
export default TotalScores