import React, { useState } from "react"

const Hello = () => {
  const [name, setName] = useState("")
  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <div>
      <h1 data-testid="my-heading">Hello</h1>
      <button onClick={handleClick}>Click me</button>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
    </div>
  )
}

export default Hello
