import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <div style={{ 
            padding: "50px", 
            textAlign: "center", 
            backgroundColor: "#f9f9f9", 
            minHeight: "80vh" 
        }}>
            <h1>Tere tulemast Kümnevõistluse Portaali! 🏃‍♂️🏆</h1>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>
                Siit leiad värskeimad tulemused ja ametliku edetabeli.
            </p>

            <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
                <Link to="/scores">
                    <button style={{ padding: "15px 30px", fontSize: "1rem", cursor: "pointer" }}>
                        Vaata edetabelit
                    </button>
                </Link>
                <Link to="/admin/manage-athletes">
                    <button style={{ padding: "15px 30px", fontSize: "1rem", cursor: "pointer", backgroundColor: "#333", color: "white" }}>
                        Admini paneel
                    </button>
                </Link>
            </div>

            <div style={{ marginTop: "50px" }}>
                <h3>Kümnevõistluse alad:</h3>
                <p>100m • Kaugushüpe • Kuulitõuge • Kõrgushüpe • 400m • 110m tõkked • Kettaheide • Teivashüpe • Odavise • 1500m</p>
            </div>
        </div>
    );
};

export default HomePage