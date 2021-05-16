import React from "react"
import {
  render,
  fireEvent,
  waitForElement,
  getByLabelText,
  screen,
  act,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import App from "../App"
import { isElementOfType } from "react-dom/test-utils"

global.fetch = require("jest-fetch-mock")

const movies = [
  {
    id: 3,
    title: "First movie",
    description: "Description of the first movie",
  },
  {
    id: 4,
    title: "Second movie",
    description: "Description of the second movie",
  },
]

describe("App component", () => {
  test("should display and hide loading", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies))
    act(() => {
      render(<App />)
    })
    expect(screen.getByTestId("loading")).toBeTruthy()
    await waitForElement(() => () => screen.getByTestId("list"))
    expect(screen.queryByTestId("loading")).toBeFalsy()
  })

  test("should display error on bad request", async () => {
    fetch.mockResponseOnce(null, { status: 500 })
    act(() => {
      render(<App />)
    })
    expect(screen.getByTestId("loading")).toBeTruthy()
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"))
    expect(screen.queryByText(/Error loading movies/i)).toBeTruthy()
  })

  test("should display list of movies after API request", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies))
    act(() => {
      render(<App />)
    })
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"))
    const list = screen.getByTestId("list")
    expect(list).toBeTruthy()
    expect(list.children.length).toBe(2)
  })

  test("new movie btn should be present and trigger form", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies))
    act(() => {
      render(<App />)
    })
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"))
    const btn = screen.getByRole("button", { name: "New movie" })
    fireEvent.click(btn)
    await wait(() => {
      expect(screen.getByTestId("movie-form")).toBeTruthy()
    })
  })

  test("should display movie details when clicked on heading", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies))
    act(() => {
      render(<App />)
    })
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"))
    const headings = screen.getAllByTestId("heading")
    fireEvent.click(headings[0])
    await wait(() => {
      expect(screen.getByText(movies[0].description)).toBeTruthy()
    })
    fireEvent.click(headings[1])
    await wait(() => {
      expect(screen.queryByText(movies[0].description)).toBeFalsy()
      expect(screen.getByText(movies[1].description)).toBeTruthy()
    })
  })
})
