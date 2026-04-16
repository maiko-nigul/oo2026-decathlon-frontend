import { useState } from "react"

function HomePage() {

    fetch("http://localhost:8080/athletes")
        .then(res =>res.json())
        .then(json=> console.log(json))
  return (
    <div>{athletes}</div>
  )
}

export default HomePage