const idGenerator = () => {
  let id = 0
  return () => {
    return id += 1
  }
}
export const generateId = idGenerator()
