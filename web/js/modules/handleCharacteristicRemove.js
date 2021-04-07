import { App } from '../App.js';
import { handleChar } from './handleChar.js';
import { toggleModal } from './handleModals.js';
import { Toast } from './handleToast.js';
import { timeChamberItems } from './Utils.js';

export const handleCharacteristicRemove = {
  getFilterValue() {
    return document.getElementById('characteristic-type').value
  },

  validateCharacteristicRemove() {
    const characteristicName = document.getElementById('characteristic-name').value
    const targetArray = handleCharacteristicRemove.getTargetArray()
    const targeRaceSpecArray = handleCharacteristicRemove.getTargetRaceSpecArray()

    if (characteristicName.replace(/\s/g, "") == '') {
      throw new Error('Por favor, indique um nome válido.')
    }

    if (targetArray.indexOf(characteristicName) == -1) {
      throw new Error(`Você não possui ${characteristicName}.`)
    }

    if (targeRaceSpecArray.indexOf(characteristicName) != -1) {
      throw new Error('Você não pode remover as características de sua raça.')
    }

    return
  },

  closeCharacteristicRemoveModal() {
    const confirmBtn = document.getElementById('confirm-characteristic-remove')
    const cancelBtn = document.getElementById('cancel-characteristic-remove')

    toggleModal(11, 'hide')
    confirmBtn.removeEventListener('click', handleCharacteristicRemove.confirmCharacteristicRemove)
    cancelBtn.removeEventListener('click', handleCharacteristicRemove.closeCharacteristicRemoveModal)
    return
  },

  clearInput() {
    document.getElementById('characteristic-name').value = ''
    return
  },

  watchCharacteristicRemove() {
    const confirmBtn = document.getElementById('confirm-characteristic-remove')
    const cancelBtn = document.getElementById('cancel-characteristic-remove')

    confirmBtn.addEventListener('click', handleCharacteristicRemove.confirmCharacteristicRemove)
    cancelBtn.addEventListener('click', handleCharacteristicRemove.closeCharacteristicRemoveModal)
    return
  },

  getTargetArray() {
    if (handleCharacteristicRemove.getFilterValue() == 'advantage') {
      return handleChar.char.advantages
    }

    if (handleCharacteristicRemove.getFilterValue() == 'disadvantage') {
      return handleChar.char.disadvantages
    }

    if (handleCharacteristicRemove.getFilterValue() == 'technique') {
      return handleChar.char.techniques
    }
  },

  getTargetTimeChamberArray() {
    if (handleCharacteristicRemove.getFilterValue() == 'advantage') {
      return timeChamberItems.advantages
    }

    if (handleCharacteristicRemove.getFilterValue() == 'disadvantage') {
      return timeChamberItems.disadvantages
    }

    if (handleCharacteristicRemove.getFilterValue() == 'technique') {
      return timeChamberItems.techniques
    }
  },

  getTargetRaceSpecArray() {
    if (handleCharacteristicRemove.getFilterValue() == 'advantage') {
      return handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].advantages
    }

    if (handleCharacteristicRemove.getFilterValue() == 'disadvantage') {
      return handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].disadvantages
    }
  },

  removeCharacteristic() {
    const characteristicName = document.getElementById('characteristic-name').value
    const targetArray = handleCharacteristicRemove.getTargetArray()
    const characteristicIndex = targetArray.indexOf(characteristicName)

    targetArray.splice(characteristicIndex, 1)
    return
  },

  recoverApCost() {
    const characteristicName = document.getElementById('characteristic-name').value
    const timeChamberArray = handleCharacteristicRemove.getTargetTimeChamberArray()
    let cost;

    if (characteristicName.includes('Código de Honra')) {
      const vote = characteristicName.replace(/\D/g, "")
      const voteIndex = handleChar.char.codeOfHonorVotes.indexOf(vote)

      handleChar.char.codeOfHonorVoteCount -= 1
      handleChar.char.codeOfHonorVotes.splice(voteIndex, 1)
      handleChar.updateRemainingPA(-1)
      return
    }

    if (characteristicName.includes('Rivalidade')) {
      handleChar.updateRemainingPA(1)
      return
    }

    if (characteristicName.includes('Sentir Ki')) {
      characteristicName.includes('(Aguçado)')
        ? handleChar.updateRemainingPA(2)
        : handleChar.updateRemainingPA(1)
      return
    }

    if (characteristicName.includes('Rivalidade')) {
      handleChar.updateRemainingPA(1)
      return
    }

    for (let i = 0; i < timeChamberArray.length; i++) {

      if (timeChamberArray[i].name == characteristicName) {
        cost = timeChamberArray[i].cost || -timeChamberArray[i].bonus
        break
      }
    }

    handleChar.updateRemainingPA(cost)
    return
  },

  confirmCharacteristicRemove() {
    try {
      handleCharacteristicRemove.validateCharacteristicRemove()
      handleCharacteristicRemove.recoverApCost()
      handleCharacteristicRemove.removeCharacteristic()
      handleCharacteristicRemove.closeCharacteristicRemoveModal()
      handleCharacteristicRemove.clearInput()
      App.reload()
      Toast.open('Característica removida com sucesso! P.A gastos recuperados.')
    } catch (error) {
      Toast.open(error.message)
    }
  }
}
