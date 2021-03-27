import { App } from "../App.js";
import { handleChar } from "./handleChar.js";
import { toggleModal } from "./handleModals.js"
import { Toast } from './handleToast.js';

export const arbitraryAttributesForm = {
  arbitraryForm: document.getElementById('arbitrary-attribute-form'),
  arbitraryStr: document.getElementById('arbitrary-str'),
  arbitraryDex: document.getElementById('arbitrary-dex'),
  arbitraryKi: document.getElementById('arbitrary-ki'),
  arbitraryInt: document.getElementById('arbitrary-int'),
  arbitraryRes: document.getElementById('arbitrary-res'),

  getValues() {
    return {
      arbitraryStr: Number(this.arbitraryStr.value),
      arbitraryDex: Number(this.arbitraryDex.value),
      arbitraryKi: Number(this.arbitraryKi.value),
      arbitraryInt: Number(this.arbitraryInt.value),
      arbitraryRes: Number(this.arbitraryRes.value),
    }
  },

  validateArbitraryAttributesModify() {
    const { arbitraryStr, arbitraryDex, arbitraryKi, arbitraryInt, arbitraryRes } = arbitraryAttributesForm.getValues()

    if (!Number.isInteger(arbitraryStr) ||
      !Number.isInteger(arbitraryDex) ||
      !Number.isInteger(arbitraryKi) ||
      !Number.isInteger(arbitraryInt) ||
      !Number.isInteger(arbitraryRes)) { throw new Error('Por favor, indique valores válidos.') }
  },

  submit(e) {
    e.preventDefault()

    try {
      arbitraryAttributesForm.validateArbitraryAttributesModify()
      handleChar.updateArbitraryAttributes(arbitraryAttributesForm.getValues())
      arbitraryAttributesForm.closeArbitraryAttributesForm()
      handleChar.updateCharMaxHP()
      handleChar.updateCharMaxKi()
      handleChar.updateCharMaxSTA()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }

  },

  clearArbitraryAttributesFormFields() {
    arbitraryAttributesForm.arbitraryStr.value = ''
    arbitraryAttributesForm.arbitraryDex.value = ''
    arbitraryAttributesForm.arbitraryKi.value = ''
    arbitraryAttributesForm.arbitraryInt.value = ''
    arbitraryAttributesForm.arbitraryRes.value = ''
  },

  closeArbitraryAttributesForm() {
    const confirmArbitraryModify = document.getElementById('confirm-arbitrary')
    const cancelArbitraryModify = document.getElementById('cancel-arbitrary')

    toggleModal(7, 'hide')
    confirmArbitraryModify.removeEventListener('click', arbitraryAttributesForm.submit)
    cancelArbitraryModify.removeEventListener('click', arbitraryAttributesForm.closeArbitraryAttributesForm)
    arbitraryAttributesForm.clearArbitraryAttributesFormFields()
  },

  watchArbitraryModify() {
    const confirmArbitraryModify = document.getElementById('confirm-arbitrary')
    const cancelArbitraryModify = document.getElementById('cancel-arbitrary')

    confirmArbitraryModify.addEventListener('click', arbitraryAttributesForm.submit)
    cancelArbitraryModify.addEventListener('click', arbitraryAttributesForm.closeArbitraryAttributesForm)
  }
}
