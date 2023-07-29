const colors = ['red', 'orange', 'blue', 'gray', 'black']

export const getRandomBlockColor = () => colors[Math.floor(Math.random() * colors.length)]
