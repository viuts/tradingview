import StockStore from './StockStore'

class RootStore {
  constructor() {
    this.stockStore = new StockStore(this)
  }
}

export const rootStore = new RootStore()
