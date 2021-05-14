import React from "react"
import {
  render,
  fireEvent,
  wait,
  getByLabelText,
  screen,
} from "@testing-library/react"
import MovieForm from "../components/movie-form"

global.fetch = require("jest-fetch-mock")

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

  test("should trigger API request when clicked on button", async () => {
    const updatedMovie = jest.fn()
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(movie),
      })
    )
    const { getByLabelText, getByRole, debug } = render(
      <MovieForm movie={movie} updatedMovie={updatedMovie} />
    )
    const submitButton = getByRole("button", { name: /update/i })
    fireEvent.click(submitButton)
    await wait(() => {
      expect(updatedMovie).toBeCalledTimes(1)
    })
  })

  test("shouldn't trigger API request when clicked on button on empty form", async () => {
    const updatedMovie = jest.fn()
    fetch.mockResponseOnce(JSON.stringify(movie))
    const { getByLabelText, getByRole, debug } = render(
      <MovieForm movie={empty_movie} updatedMovie={updatedMovie} />
    )
    const submitButton = getByRole("button", { name: /create/i })
    fireEvent.click(submitButton)
    await wait(() => {
      expect(updatedMovie).toBeCalledTimes(0)
    })
  })

  test("should trigger API call when click new movie btn", async () => {
    const movieCreated = jest.fn()
    fetch.mockResponseOnce(JSON.stringify(movie))
    const { getByRole } = render(
      <MovieForm movie={empty_movie} movieCreated={movieCreated} />
    )
    const submitButton = getByRole("button", { name: /create/i })
    const titleInput = screen.getByLabelText(/title/i)
    const descInput = screen.getByLabelText(/description/i)
    fireEvent.change(titleInput, { target: { value: "Title1" } })
    fireEvent.change(descInput, { target: { value: "Description of title" } })

    fireEvent.click(submitButton)

    await wait(() => {
      console.log(movieCreated.mock.calls)
    })
  })
})
