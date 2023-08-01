import { useState, FormEvent, useRef, ChangeEvent, useEffect, useCallback } from 'react'
import { Button } from '../../Components'
import { isLanguage, words } from './utils'
import './syles/main.css'

type CustomInputs = HTMLFormElement & { language: HTMLSelectElement }

const TypingCounter = () => {
  const [game, setGame] = useState({ start: false, word: '', userInput: '', timer: 0, mistakes: 0, score: 0 })
  const wordsRef = useRef<string[]>([])
  const timeout = useRef<number | void>()

  const startGame = (e: FormEvent<CustomInputs>) => {
    if (game.timer === 0 && timeout.current) {
      timeout.current = clearTimeout(timeout.current)
      return
    }
    const { language } = e.currentTarget
    if (!isLanguage(language.value)) return

    wordsRef.current = words[language.value]
    const word = wordsRef.current[Math.floor(Math.random() * wordsRef.current.length)]
    setGame({ start: true, word, userInput: '', timer: 60, mistakes: 0, score: 0 })
  }

  const restartGame = useCallback(() => {
    const word = wordsRef.current[Math.floor(Math.random() * wordsRef.current.length)]
    setGame(prev => ({ ...prev, timer: 60, mistakes: 0, score: 0, word, userInput: '' }))
  }, [])

  useEffect(() => {
    if (game.timer === 0) {
      if (timeout.current) timeout.current = clearTimeout(timeout.current)
      return
    }
    const timer = setTimeout(() => {
      setGame(prev => ({ ...prev, timer: prev.timer - 1 }))
    }, 1000)
    return () => clearTimeout(timer)
  }, [game.timer])

  const nextWord = () => {
    let word = game.word
    while (word === game.word) {
      word = wordsRef.current[Math.floor(Math.random() * wordsRef.current.length)]
    }
    setGame(prev => ({ ...prev, word, userInput: '', score: prev.score + prev.word.length }))
  }

  const writeWord = (e: ChangeEvent<HTMLInputElement>) => {
    if (!game.timer) return
    const { value } = e.target
    const userInput = value === game.word ? '' : value
    if (value === game.word) {
      return nextWord()
    }
    setGame(prev => {
      if (value.slice(-1) !== prev.word[value.length - 1]) {
        const word = wordsRef.current[Math.floor(Math.random() * wordsRef.current.length)]
        return { ...prev, userInput: '', mistakes: prev.mistakes + 1, word }
      }
      return { ...prev, userInput }
    })
  }

  return (
    <main className="Typing-Counter-Game">
      <h1>Typing Counter</h1>
      <p>This game is simple, you have to write the greatest number of words before the timer reaches 0</p>
      <div className="game">
        {game.start ? (
          <>
            <p>Time remaining: {game.timer}</p>
            <p>{game.word}</p>
            <input autoFocus onChange={writeWord} value={game.userInput} />
            <p><span>ERRORS: {game.mistakes}</span></p>
            {
              !game.timer && <>
                <p>SUCCESS: {game.score}</p>
              </>
            }
            <Button onClick={restartGame}>RESTART</Button>
          </>
        ) : (
          <form onSubmit={startGame}>
            <select name="language">
              {
                Object.keys(words).map(language => <option key={language} value={language}>{language}</option>)
              }
            </select>
            <Button>Start Game</Button>
          </form>
        )}
      </div>
    </main>
  )
}

export default TypingCounter
