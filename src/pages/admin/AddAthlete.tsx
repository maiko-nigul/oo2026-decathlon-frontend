import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddAthlete = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newAthlete = { name, country };

        fetch(import.meta.env.VITE_BACK_URL + "/athletes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAthlete)
        })
        .then(res => {
            if (res.ok) {
                alert("Sportlane lisatud!");
                navigate("/admin/manage-athletes"); // Suunab tagasi haldusvaatesse
            }
        })
        .catch(err => console.error("Viga:", err));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Lisa uus sportlane</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nimi: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <br />
                <div>
                    <label>Riik: </label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <br />
                <button type="submit">Salvesta sportlane</button>
            </form>
        </div>
    );
};
export default AddAthlete;