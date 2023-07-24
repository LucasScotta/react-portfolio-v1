const generateId = () => {
  let id = 0
  return () => {
    return id += 1
  }
}
export const idGenerator = generateId()
