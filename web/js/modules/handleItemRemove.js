import { toggleModal } from './handleModals.js'
import { handleChar } from './handleChar.js'
import { Toast } from './handleToast.js'
import { handleCharItems } from './handleItems.js'

export const removeItemPrompt = {
  itemName: document.querySelector('input#item-to-remove'),

  watchRemove() {
    const confirmRemove = document.getElementById('confirm-remove-item')
    const cancelRemove = document.getElementById('cancel-remove-item')

    cancelRemove.addEventListener('click', removeItemPrompt.closePrompt)
    confirmRemove.addEventListener('click', removeItemPrompt.confirmRemove)
  },

  closePrompt() {
    toggleModal(5, 'hide')
    document.getElementById('cancel-remove-item').removeEventListener('click', removeItemPrompt.cancelRemove)
    document.getElementById('confirm-remove-item').removeEventListener('click', removeItemPrompt.confirmRemove)
    removeItemPrompt.clearInput()
  },

  checkItemIndex() {
    let index = -1

    for (let i = 0; i < handleChar.char.items.length; i++) {
      if (handleChar.char.items[i].name == removeItemPrompt.itemName.value) {
        index = i
        break;
      }
    }

    return index
  },

  clearInput() {
    this.itemName.value = ''
  },

  validateItem() {
    if (removeItemPrompt.checkItemIndex() == -1) {
      throw new Error('Item inválido ou não existente. Por favor, tente novamente')
    }
  },

  confirmRemove() {
    try {
      removeItemPrompt.validateItem()
      handleCharItems.removeItem(removeItemPrompt.checkItemIndex())
      removeItemPrompt.closePrompt()
      removeItemPrompt.clearInput()
      Toast.open('Item removido com sucesso!')
    } catch (error) {
      Toast.open(error.message)
    }
  }
}
