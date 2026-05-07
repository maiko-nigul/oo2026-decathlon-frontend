import { useEffect, useState } from "react"
import type { Athlete } from "../../models/Athlete";
import type { PageResponse } from "../../models/PageResponse";

function ManageAthletes() {
  const [athletePage, setAthletePage] = useState<PageResponse<Athlete> | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACK_URL}/athletes?page=${page}&size=10&sort=totalPoints,desc`)
      .then(res => res.json())
      .then(json => setAthletePage(json)); 
  }, [page]);

  const deleteAthlete = (id: number) => {
    fetch(`${import.meta.env.VITE_BACK_URL}/athletes/${id}`, {
      method: "DELETE"
    }).then(() => {
      refreshData();
    });
  }

  const refreshData = () => {
    fetch(`${import.meta.env.VITE_BACK_URL}/athletes?page=${page}&size=10&sort=totalPoints,desc`)
      .then(res => res.json())
      .then(json => setAthletePage(json));
  }

  return (
    <div>
      <h1>Sportlaste haldamine</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nimi</th>
            <th>Riik</th>
            <th>Punktid</th>
            <th>Muuda</th>
            <th>Kustuta</th>
          </tr>
        </thead>
        <tbody>
          {/* Kasutame athletePage.content.map, sest andmed on 'content' sees */}
          {athletePage?.content.map(athlete => 
            <tr key={athlete.id}>
              <td>{athlete.id}</td>
              <td>{athlete.name}</td>
              <td>{athlete.country}</td>
              <td>{athlete.totalPoints}</td>
              <td><button>Edit</button></td>
              <td><button onClick={() => deleteAthlete(Number(athlete.id))}>x</button></td>
            </tr>)}
        </tbody>
      </table>

      {/* Paginatsiooni nupud */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
        <span>Leht {page + 1} / {athletePage?.totalPages}</span>
        <button 
          disabled={page >= (athletePage?.totalPages || 1) - 1} 
          onClick={() => setPage(page + 1)}
        >
          Järgmine
        </button>
      </div>
    </div>
  )
}

export default ManageAthletes;