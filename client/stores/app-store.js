import { observable, computed, action } from 'mobx'

export default class AppState {
  constructor({ count } = { count: 0 }) {
    this.count = count
  }

  @observable count

  @computed get msg() {
    return `The counter is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  toJson() {
    return {
      count: this.count,
    }
  }
}
