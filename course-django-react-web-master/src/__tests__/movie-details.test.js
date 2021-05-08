import React from "react"
import { render } from "@testing-library/react"
import MovieDetails from "../components/movie-details"

const selectedMovie = {
  title: "First movie",
  description: "comedy",
  avg_rating: 1,
  no_of_ratings: 4,
}

describe("MovieDetails component", () => {
  test("should match the snapshot", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />)
    expect(container).toMatchSnapshot()
  })
})
