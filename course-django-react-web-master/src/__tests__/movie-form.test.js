import React from "react"
import { render, fireEvent } from "@testing-library/react"
import MovieForm from "../components/movie-form"

const empty_movie = { title: "", description: "" }
const movie = {
  id: 3,
  title: "First movie",
  description: "Description of the first movie",
}

describe("MovieForm component", () => {
  test("should display form elements", () => {
    const { getByLabelText, getByRole } = render(
      <MovieForm movie={empty_movie} />
    )
    expect(getByLabelText(/title/i)).toBeTruthy()
    expect(getByLabelText(/description/i)).toBeTruthy()
    expect(getByRole("button", { name: /create/i })).toBeTruthy()
  })

  test("should display form elements with movie data", () => {
    const { getByLabelText, getByRole, debug } = render(
      <MovieForm movie={movie} />
    )
    // debug(getByLabelText(/title/i))
    expect(getByLabelText(/title/i).value).toBe(movie.title)
    expect(getByLabelText(/description/i).value).toBe(movie.description)
    expect(getByRole("button", { name: /update/i })).toBeTruthy()
  })
})
