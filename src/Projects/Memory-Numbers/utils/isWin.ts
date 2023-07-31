export const isWin = (numbers: Array<number>, inputs: Array<number | null>) => {
  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i] !== numbers[i]) return false
  }
  return true
}
