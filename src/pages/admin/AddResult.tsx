import { useState, useEffect } from "react";
import type { Athlete } from "../../models/Athlete";
import type { PageResponse } from "../../models/PageResponse";

export const AddResult = () => {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [selectedAthleteId, setSelectedAthleteId] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [points, setPoints] = useState<number>(0);

    // Laadime sportlased, et neid valikus näidata
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/athletes?size=100")
            .then(res => res.json())
            .then((data: PageResponse<Athlete>) => setAthletes(data.content));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAthleteId) {
            alert("Palun vali sportlane!");
            return;
        }

        const resultData = {
            discipline: discipline,
            points: points
        };

        fetch(`${import.meta.env.VITE_BACK_URL}/athletes/${selectedAthleteId}/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resultData)
        })
        .then(res => {
            if (res.ok) {
                alert("Tulemus edukalt lisatud!");
                setDiscipline("");
                setPoints(0);
            }
        })
        .catch(err => console.error("Viga tulemuse lisamisel:", err));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Lisa tulemus</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vali sportlane: </label>
                    <select 
                        value={selectedAthleteId} 
                        onChange={(e) => setSelectedAthleteId(e.target.value)}
                        required
                    >
                        <option value="">-- Vali sportlane --</option>
                        {athletes.map(a => (
                            <option key={a.id} value={a.id}>{a.name} ({a.country})</option>
                        ))}
                    </select>
                </div>
                <br />
                <div>
                    <label>Ala nimi: </label>
                    <input 
                        type="text" 
                        placeholder="nt. 100m jooks" 
                        value={discipline} 
                        onChange={(e) => setDiscipline(e.target.value)} 
                        required 
                    />
                </div>
                <br />
                <div>
                    <label>Punktid: </label>
                    <input 
                        type="number" 
                        value={points} 
                        onChange={(e) => setPoints(Number(e.target.value))} 
                        required 
                    />
                </div>
                <br />
                <button type="submit">Lisa tulemus</button>
            </form>
        </div>
    );
};
export default AddResult;