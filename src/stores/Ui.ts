import { Stock } from './../types'
import { observable } from 'mobx'

type PreviewStockModal = {
    open: boolean,
    stock: Stock | null
}

class Ui {
  @observable previewStockModal: PreviewStockModal = {
    open: false,
    stock: null,
  }

  openPreviewStockModal(stock: Stock) {
    this.previewStockModal.open = true
    this.previewStockModal.stock = stock
  }
  
  closePreviewStockModal() {
    this.previewStockModal.open = false
    this.previewStockModal.stock = null
  }
}

export default Ui