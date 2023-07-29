import { Entity } from './Entity'

export class Manager<T extends Entity> {
  items: T[]
  constructor() {
    this.items = []
  }
  setItems(items: T[]) {
    this.items = items
  }
  getItems() {
    return this.items
  }
  removeDestroyed() {
    this.setItems(this.items.filter(item => !item.destroyed))
  }
  addItem(item: T) {
    this.items.push(item)
  }
  resetItems() {
    this.items = []
  }
}
