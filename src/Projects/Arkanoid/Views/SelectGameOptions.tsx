import { FormEvent } from 'react'
import { Cheats, Difficult, GameUserOptions } from '../types'

interface CustomFormElement extends HTMLFormElement {
  cheats: HTMLSelectElement;
  difficult: HTMLSelectElement;
}

type Props = { start: (options: GameUserOptions) => void }

const isCheat = (str: unknown): str is Cheats => typeof str === 'string' && Object.values(Cheats).some(cheat => cheat === str)
const isDifficult = (str: unknown): str is Difficult => typeof str === 'string' && Object.values(Difficult).some(difficult => difficult === str)

export const SelectGameOptions = ({ start }: Props) => {
  const selectOptions = (e: FormEvent<CustomFormElement>) => {
    e.preventDefault()
    const { currentTarget } = e
    const { cheats, difficult } = currentTarget
    if (!isCheat(cheats.value) || !isDifficult(difficult.value)) return
    const userCheatsOption = cheats.value
    const userDifficultOption = difficult.value
    start({ cheats: userCheatsOption, difficult: userDifficultOption })
  }

  return <form className="Arkanoid-game-options" onSubmit={selectOptions}>
    <div>
      <p>Difficult:</p>
      <select name='difficult' defaultValue={Difficult.easy}>
        {
          Object
            .values(Difficult)
            .map(difficult => (
              <option
                key={difficult}
                value={difficult}
                children={difficult}
              />
            ))
        }
      </select>
    </div>
    <div>
      <select name='cheats' defaultValue={Cheats.off}>
        {
          Object
            .values(Cheats)
            .map(cheat => (
              <option
                key={cheat}
                value={cheat}
                children={cheat}
              />
            ))
        }
      </select>
    </div>
    <p>Con cheats vas a tener vida infinita y poder agregar la cantidad de bolas que quieras</p>
    <button>START</button>
  </form>
}
