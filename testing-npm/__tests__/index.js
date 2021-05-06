let num = 1

function add(x, y) {
  return x + y
}

beforeEach(() => console.log("before test"))
afterEach(() => console.log("after test"))
beforeAll(() => console.log("before all"))
afterAll(() => console.log("after all"))

describe("testing", () => {
  test("First test", () => {
    expect(2 + 3).toBe(5)
    expect(1 + 1).toBe(2)
  })

  test("Second test", () => {
    expect(add(1, 2)).toBe(3)
  })
})

describe("testing-1", () => {
  it("First test", () => {
    expect(2 + 3).toBe(5)
    expect(1 + 1).toBe(2)
  })

  it("Second test", () => {
    expect(2 + 2).toBe(4)
  })
})
