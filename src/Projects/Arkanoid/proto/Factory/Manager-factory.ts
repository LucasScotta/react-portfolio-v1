import { Entity, Manager } from '..'

export const createManager = <T extends Entity>() => new Manager<T>()

