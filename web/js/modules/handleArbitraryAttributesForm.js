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
  arbitraryBaseAtk: document.getElementById('arbitrary-base-atk'),
  arbitraryBaseDef: document.getElementById('arbitrary-base-def'),
  arbitrarySpAtk: document.getElementById('arbitrary-sp-atk'),
  arbitrarySpDef: document.getElementById('arbitrary-sp-def'),

  getValues() {
    return {
      arbitraryStr: Number(this.arbitraryStr.value),
      arbitraryDex: Number(this.arbitraryDex.value),
      arbitraryKi: Number(this.arbitraryKi.value),
      arbitraryInt: Number(this.arbitraryInt.value),
      arbitraryRes: Number(this.arbitraryRes.value),
      arbitraryBaseAtk: Number(this.arbitraryBaseAtk.value),
      arbitraryBaseDef: Number(this.arbitraryBaseDef.value),
      arbitrarySpAtk: Number(this.arbitrarySpAtk.value),
      arbitrarySpDef: Number(this.arbitrarySpDef.value),
    }
  },

  validateArbitraryAttributesModify() {
    const { arbitraryStr, arbitraryDex, arbitraryKi, arbitraryInt, arbitraryRes, arbitraryBaseAtk, arbitraryBaseDef, arbitrarySpAtk, arbitrarySpDef } = arbitraryAttributesForm.getValues()

    if (!Number.isInteger(arbitraryStr) ||
      !Number.isInteger(arbitraryDex) ||
      !Number.isInteger(arbitraryKi) ||
      !Number.isInteger(arbitraryInt) ||
      !Number.isInteger(arbitraryRes) ||
      !Number.isInteger(arbitraryBaseAtk) ||
      !Number.isInteger(arbitraryBaseDef) ||
      !Number.isInteger(arbitrarySpAtk) ||
      !Number.isInteger(arbitrarySpDef)) { throw new Error('Por favor, indique valores válidos.') }
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
      console.log(error)
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
