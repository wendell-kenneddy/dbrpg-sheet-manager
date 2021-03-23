import { App } from '../App.js'
import { handleChar } from './handleChar.js'
import { toggleModal } from './handleModals.js'
import { Toast } from './handleToast.js'

export const statusModifyForm = {
  radios: document.getElementsByName('status-to-modify'),
  value: document.getElementById('modify-value'),

  getValues() {
    let status = ''
    const value = statusModifyForm.value.value

    for (let i = 0; i < statusModifyForm.radios.length; i++) {
      if (statusModifyForm.radios[i].checked) {
        status = statusModifyForm.radios[i].value
        break;
      }
    }


    return {
      status,
      value: Number(value),
    }
  },

  checkStatus() {
    const { status, value } = statusModifyForm.getValues()

    if (status == 'hp') {
      handleChar.updateCharActualHP(value)
      return
    } else if (status == 'exp') {
      handleChar.updateCharActualEXP(value)
      return
    } else if (status == 'ki') {
      handleChar.updateCharActualKi(value)
      return
    } else if (status == 'sta') {
      handleChar.updateCharActualSTA(value)
      return
    }
  },

  validateStatusModify() {
    const { status, value } = statusModifyForm.getValues()

    if (status.replace(/\s/g, "") == '' ||
      `${value}`.replace(/\s/g, "") == '') {
      throw new Error('Por favor, indique valores válidos.')
    }
  },

  submit(e) {
    e.preventDefault()

    try {
      statusModifyForm.validateStatusModify()
      statusModifyForm.checkStatus()
      statusModifyForm.closeForm()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  clearFields() {
    statusModifyForm.value.value = ''
  },

  closeForm() {
    toggleModal(6, 'hide')
    document.getElementById('confirm-status-modify').removeEventListener('click', statusModifyForm.submit)
    document.getElementById('cancel-status-modify').removeEventListener('click', statusModifyForm.closeForm)
    statusModifyForm.clearFields()
  },

  watchStatusModify() {
    const btnConfirm = document.getElementById('confirm-status-modify')
    const btnCancel = document.getElementById('cancel-status-modify')

    btnConfirm.addEventListener('click', statusModifyForm.submit)
    btnCancel.addEventListener('click', statusModifyForm.closeForm)
  }
}
