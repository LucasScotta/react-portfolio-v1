import { Player } from '../constants'

export const SwitchTurn = (player: Player) => player === Player.X ? Player.O : Player.X
