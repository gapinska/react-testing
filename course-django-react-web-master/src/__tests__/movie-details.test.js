import React from "react"
import { render, fireEvent } from "@testing-library/react"
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

  test("should display title and description", () => {
    const { queryByText } = render(<MovieDetails movie={selectedMovie} />)
    expect(queryByText(selectedMovie.title)).toBeTruthy()
  })

  test("should display color stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />)
    const selected_stars = container.querySelectorAll(".orange")
    expect(selected_stars.length).toBe(selectedMovie.avg_rating)
  })

  test("should display number of ratings", () => {
    const { getByTestId } = render(<MovieDetails movie={selectedMovie} />)
    expect(getByTestId("no_ratings").innerHTML).toBe(
      `(${selectedMovie.no_of_ratings})`
    )
  })

  test("mouseover should highlight the stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />)
    const stars = container.querySelectorAll(".rate--container svg")
    stars.forEach((star, index) => {
      fireEvent.mouseOver(star)
      const highlighted_stars = container.querySelectorAll(".purple")
      expect(highlighted_stars.length).toBe(index + 1)
    })
  })

  test("mouseover should unhighlight the stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />)
    const stars = container.querySelectorAll(".rate--container svg")
    stars.forEach((star) => {
      fireEvent.mouseOver(star)
      fireEvent.mouseOut(star)
      const highlighted_stars = container.querySelectorAll(".purple")
      expect(highlighted_stars.length).toBe(0)
    })
  })

  test("click star should trigger rating function to update", () => {
    const loadMovie = jest.fn()
    const { container } = render(
      <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
    )
    const stars = container.querySelectorAll(".rate--container svg")
    stars.forEach((star) => {
      fireEvent.click(star)
      setTimeout(() => {
        expect(loadMovie).toBeCalledTomes(5)
      })
    })
  })
})
