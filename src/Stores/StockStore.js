import { observable, action, computed } from 'mobx'
import { orderBy } from 'lodash-es'

import papaparse from 'papaparse'

class StockStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable sort = 'TICKER'

  @observable direction = 'asc'

  @observable current = null

  @observable selected = []

  @observable columns = []

  @observable data = []

  @computed get items() {
    return orderBy(this.data, this.sort, this.direction)
  }

  @action setSort = (field) => {
    this.sort = field
  }

  @action setDirection = (direction) => {
    this.direction = direction
  }

  @action setCurrent = (current) => {
    this.current = current
  }

  @action setSelected = (selected) => {
    this.selected = selected
  }

  @action addByCsv = (csv) => {
    const { data } = papaparse.parse(csv, {
      header: true,
    })

    this.columns = Object.keys(data[0]).map((key) => {
      return {
        field: key,
        name: key,
        sortable: true,
      }
    })

    this.data = data
  }
}

export default StockStore
