import { useState, useEffect } from 'react'
import { Button } from '../../Components'
import { createNumbers } from './utils'
import { MemoryNumbersGame } from './types'
import './styles/main.css'

const MemoryNumbers = () => {
  const [game, setGame] = useState<MemoryNumbersGame>({
    counter: 3,
    numbers: [],
    userInput: '',
    showNumbers: false,
    points: 0,
    finish: false
  })
  const startGame = () => {
    setGame(prev => {
      const numbers = createNumbers(prev.counter)
      const showNumbers = true
      return { ...prev, numbers, showNumbers, finish: false }
    })
  }
  const resetGame = () => {
    setGame(prev => ({ ...prev, counter: 3, userInput: '', showNumbers: true, points: 0, finish: true }))
    setTimeout(startGame, 2500)
  }
  useEffect(() => {
    console.log('Hey, what are you looking?! Don\'t try to cheat 😡😡')
  }, [])

  useEffect(() => {
    if (!game.numbers.length) return
    if (game.userInput === game.numbers.join('')) {
      setGame(prev => {
        const counter = prev.counter + 1
        const numbers = createNumbers(counter)
        const userInput = ''
        const showNumbers = true
        const points = prev.points + 1
        return { ...prev, counter, numbers, userInput, showNumbers, points }
      })
    }
  }, [game.userInput, game.numbers])

  useEffect(() => {
    if (!game.showNumbers) return
    const timeout = setTimeout(() => setGame(prev => ({ ...prev, showNumbers: false })), 2000)
    return () => clearTimeout(timeout)
  }, [game.showNumbers, game.numbers])

  return <main className='Memory-Numbers-App'>
    <h1>Memory numbers App</h1>
    <p>Memorize the number and repeat it after a few seconds</p>
    <div className='Memory-Game-Container'>
      {
        game.numbers.length
          ? <>
            <div className='number'>
              {
                game.numbers.map((n, i) => <span key={`${n}-${i}`}>{game.showNumbers ? n : '-'}</span>)
              }
            </div>
            <div className="user-input">
              <input type='number' onChange={e => !game.finish && setGame(prev => ({ ...prev, userInput: e.target.value }))} value={game.userInput} />
            </div>
            <p>POINTS: {game.points}</p>
            <Button onClick={resetGame}>I give up</Button>
          </>
          : <Button onClick={startGame}>START</Button>
      }
    </div>
  </main>
}

export default MemoryNumbers
