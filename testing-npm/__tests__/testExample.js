const num = 2
const nums = [1, 2, 3]
const nums2 = [
  [1, 3, 4],
  [2, 3, 5],
]
const word = "Zuzia"
const animals = ["lion", "tiger", "fish"]

function add(x, y) {
  return x + y
}

// jest.setTimeout(15000)
// test.only("first test", () => {
//   expect(num).toBe(2)
// })

test("second test", () => {
  console.log("second test")
})

test.each(nums)("add 2 to %i", (number) => {
  expect(add(2, number)).toBe(number + 2)
})

test.each(nums2)("add %i to %i", (x, y, result) => {
  expect(add(x, y)).toBe(result)
})

test("third test", () => {
  expect(word).toMatch("Zuzia")
  expect(animals).toContain("lion")
})
