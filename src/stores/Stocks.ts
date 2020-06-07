import { observable } from 'mobx'
import { CategoryStocks } from '../types'
import api from '../api'

class Stocks {
  @observable stocksByCategory: CategoryStocks[] = []
  @observable popular: CategoryStocks = {}

  async fetchStocks() {
    const categories = await api.getCategories()
    this.stocksByCategory = categories
    this.setPopulars()
  }

  setPopulars() {
    const popular = this.stocksByCategory.filter(({ category }) => {
      return category.name.en === 'Popular'
    })

    if (!popular || !popular[0]) {
      this.popular = this.stocksByCategory[0]
    }

    this.popular = popular[0]
  }
}

export default Stocks
