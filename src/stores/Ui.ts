import { observable } from 'mobx'
import { Stock, HeaderIcons } from './../types'

type PreviewStockModal = {
    open: boolean,
    stock: Stock | null
}

class Ui {
  @observable previewStockModal: PreviewStockModal = {
    open: false,
    stock: null,
  }
  @observable hideBuyCart: boolean = false 
  @observable headerRightIcon = HeaderIcons.search

  openPreviewStockModal = (stock: Stock) => {
    this.previewStockModal.open = true
    this.previewStockModal.stock = stock
  }
  
  closePreviewStockModal = () => {
    this.previewStockModal.open = false
    this.previewStockModal.stock = null
  }
  
  toggleBuyCart = (isOpen: boolean = false) => {
    this.hideBuyCart = isOpen || !this.hideBuyCart
  }

  setHeaderIcon = (icon: HeaderIcons) => {
    this.headerRightIcon = icon
  }
}

export default Ui