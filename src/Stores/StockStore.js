import { observable, action } from 'mobx'

import papaparse from 'papaparse'

class StockStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable headers = []

  @observable data = []

  @action addByCsv = (csv) => {
    const data = papaparse.parse(csv, {
      header: true,
    })

    this.headers = Object.keys(data[0])

    this.data = data
  }
}

export default StockStore
