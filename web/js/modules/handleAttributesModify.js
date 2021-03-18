import { handleChar } from './handleChar.js'
import { App } from '../App.js'
import { toggleModal } from './handleModals.js'
import { Toast } from './handleToast.js'

export const attributeForm = {
  editStr: document.querySelector('input#edit-str'),
  editDex: document.querySelector('input#edit-dex'),
  editKi: document.querySelector('input#edit-ki'),
  editInt: document.querySelector('input#edit-int'),
  editRes: document.querySelector('input#edit-res'),
  availableAPContainer: document.getElementById('available-ap'),

  getEditValues() {
    return {
      editStrValue: Number(`${this.editStr.value.replace(/\D/g, "")}`),
      editDexValue: Number(`${this.editDex.value.replace(/\D/g, "")}`),
      editKiValue: Number(`${this.editKi.value.replace(/\D/g, "")}`),
      editIntValue: Number(`${this.editInt.value.replace(/\D/g, "")}`),
      editResValue: Number(`${this.editRes.value.replace(/\D/g, "")}`),
    }
  },

  validateFields() {
    const { editStrValue,
      editDexValue,
      editKiValue,
      editIntValue,
      editResValue
    } = this.getEditValues()

    if (Number(editStrValue + editDexValue + editKiValue + editIntValue + editResValue) > handleChar.char.remainingPA) {
      throw new Error('Pontos de Aptidão (P.A) insuficientes.')
    }
  },

  clearFields() {
    this.editStr.value = ''
    this.editDex.value = ''
    this.editKi.value = ''
    this.editInt.value = ''
    this.editRes.value = ''
  },

  modifyCharAttributes() {
    const { editStrValue,
      editDexValue,
      editKiValue,
      editIntValue,
      editResValue
    } = this.getEditValues()

    handleChar.char.bonusStr += editStrValue
    handleChar.char.bonusDex += editDexValue
    handleChar.char.bonusKi += editKiValue
    handleChar.char.bonusInt += editIntValue
    handleChar.char.bonusRes += editResValue
    handleChar.updateCharMaxHP()
    handleChar.updateCharMaxKi()
    handleChar.updateCharMaxSTA()
    handleChar.updateRemainingPA(-(editStrValue + editDexValue + editKiValue + editIntValue + editResValue))
  },

  submit(e) {
    e.preventDefault()

    try {
      attributeForm.validateFields()
      attributeForm.modifyCharAttributes()
      attributeForm.clearFields()
      attributeForm.closeModifyForm()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  closeModifyForm() {
    toggleModal(1, 'hide')
    document.getElementById('attribute-edit-form').removeEventListener('submit', this.submit)
    document.getElementById('cancel-modify').removeEventListener('click', this.closeModifyForm)
  },

  watchModify() {
    document.getElementById('available-ap').innerHTML = 'P.A disponíveis: ' + handleChar.char.remainingPA
    const attributeEditForm = document.getElementById('attribute-edit-form')
    const cancelBtn = document.getElementById('cancel-modify')

    attributeEditForm.addEventListener('submit', this.submit)
    cancelBtn.addEventListener('click', this.closeModifyForm)
  }
}
