import { handleRoll } from "./handleAttributeRoll.js"
import { toggleModal } from "./handleModals.js"
import { Toast } from "./handleToast.js"

export const rollForm = {
  radios: document.getElementsByName('attribute-to-roll'),
  rollTimes: document.getElementById('dices-amount'),

  getAttributeToRoll() {
    let value = ''

    for (let i = 0; i < rollForm.radios.length; i++) {
      if (rollForm.radios[i].checked) {
        value = rollForm.radios[i].value
        break;
      }
    }

    return value
  },

  validateRoll() {
    if (`${this.rollTimes.value}`.match(/\D/g, "") ||
      this.rollTimes.value == 0
    ) {
      throw new Error('Por favor, especifique a quantidade de dados a serem rolados. Use somente números inteiros e positivos.')
    }
  },

  clearFields() {
    this.rollTimes.value = ''
  },

  submit(e) {
    e.preventDefault()

    try {
      rollForm.validateRoll()
      handleRoll.resetRoll()
      handleRoll.rollDice(rollForm.rollTimes.value)
      handleRoll.getAttributeTotal(rollForm.getAttributeToRoll())
      handleRoll.checkCrits()
      handleRoll.checkFails()
      handleRoll.buildOutput()
      handleRoll.printOutput()
      rollForm.clearFields()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  cancelRoll() {
    toggleModal(3, 'hide')
    document.getElementById('confirm-roll-test').removeEventListener('click', rollForm.submit)
    document.getElementById('cancel-roll-test').removeEventListener('click', rollForm.cancelRoll)
    handleRoll.clearRollContainer()
  },

  watchRoll() {
    const confirmRollBtn = document.getElementById('confirm-roll-test')
    const cancelRollBtn = document.getElementById('cancel-roll-test')

    confirmRollBtn.addEventListener('click', rollForm.submit)
    cancelRollBtn.addEventListener('click', rollForm.cancelRoll)
  }
}
