import { getRandomNumber } from '.'

export const createNumbers = (n: number) => {
  const numbers = []
  for (let i = 0; i < n; i += 1) {
    numbers.push(getRandomNumber())
  }
  return numbers
}
