import { App } from "../App.js"
import { handleCharItems } from "./handleItems.js"
import { toggleModal } from "./handleModals.js"
import { Toast } from "./handleToast.js"

export const addItemForm = {
  itemName: document.getElementById('item-name'),
  itemType: document.getElementById('item-type'),
  itemRarity: document.getElementById('item-rarity'),

  closeAddItemForm() {
    toggleModal(4, 'hide')
    document.getElementById('cancel-add-item').removeEventListener('click', this.cancelAddItem)
    document.getElementById('confirm-add-item').removeEventListener('click', this.submit)
    addItemForm.clearFields()
  },

  getItemInfo() {
    return {
      name: this.itemName.value,
      type: this.itemType.value,
      rarity: this.itemRarity.value
    }
  },

  validateItem() {
    const { name, type, rarity } = this.getItemInfo()

    if (name.replace(/\s/gi, "") == '' ||
      type.replace(/\s/gi, "") == '' ||
      rarity.replace(/\s/gi, "") == '') {
      throw new Error('Por favor, preencha todos os campos.')
    }
  },

  clearFields() {
    this.itemName.value = ''
    this.itemRarity.value = ''
    this.itemType.value = ''
  },

  submit(e) {
    e.preventDefault()

    try {
      addItemForm.validateItem()
      handleCharItems.addItem(addItemForm.getItemInfo())
      addItemForm.closeAddItemForm()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  watchItemAdd() {
    const cancelBtn = document.getElementById('cancel-add-item')
    const confirmBtn = document.getElementById('confirm-add-item')
    confirmBtn.addEventListener('click', this.submit)
    cancelBtn.addEventListener('click', this.closeAddItemForm)
  }
}
