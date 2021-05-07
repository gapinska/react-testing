import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Hello from "./Hello"

test("component hello displays text hello", () => {
  const wrapper = render(<Hello />)
  //   wrapper.debug()
  const myText = wrapper.getByText("Hello")
  expect(myText).toBeTruthy()

  console.log(myText.tagName)
  expect(myText.tagName).toBe("H1")
  console.log(myText.textContent)
})

test("test2 component hello displays text hello", () => {
  const { getByText } = render(<Hello />)
  const myText = getByText("Hello")
  //getBy zwraca element lub błąd
  //queryBy używamy jeżeli podejrzewamy, że element może nie istnieć na stronie --> zwraca null, można użyć metody toBeFalsy
  //findBy --> jest asynchroniczne
  //getAllBy, quesryAllBy, findAllBy
})

test("test3 component hello displays text hello", () => {
  const { getByTestId } = render(<Hello />)
  const myText = getByTestId("my-heading")
  expect(myText.textContent).toBe("Hello")
})

test("btn console.log --> clicked, input test", () => {
  const name = "Mon"
  const { getByRole } = render(<Hello />)
  const button = getByRole("button")
  fireEvent.click(button)
  const input = getByRole("textbox")
  expect(input).toHaveValue("")
  fireEvent.change(input, { target: { value: name } })
  expect(input).toHaveValue(name)
})
