import { useState } from 'react'
import { PlayArkanoidGame, SelectGameOptions } from './Views'
import './styles/main.css'
import { Cheats, Difficult, GameUserOptions } from './types'

/** Arkanoid App Component */
const Arkanoid = () => {
  const [gameOptions, setGameOptions] = useState<{ finished: boolean } & GameUserOptions>({ finished: false, cheats: Cheats.on, difficult: Difficult.easy })
  const start = (options: GameUserOptions) => {
    setGameOptions(prev => ({ ...prev, finished: !prev.finished, ...options }))
  }
  return (
    <main className='Arkanoid-Project'>
      <h1>Arkanoid App</h1>
      {
        gameOptions.finished ?
          <PlayArkanoidGame gameOptions={gameOptions} />
          : <SelectGameOptions start={start} />
      }
    </main >
  )
}

export default Arkanoid
