import { handleChar } from './handleChar.js';
import { toggleModal } from './handleModals.js';
import { Toast } from './handleToast.js';
import { timeChamberItems } from './Utils.js';

export const timeChamber = {
  onFocusSkillName: '',
  onFocusSkillIndex: null,

  getFilterValue() {
    const filter = document.getElementById('filter')

    return filter.value
  },

  getTimeChamberTargetArray() {
    if (timeChamber.getFilterValue() == 'advantages') {
      return timeChamberItems.advantages
    }

    if (timeChamber.getFilterValue() == 'disadvantages') {
      return timeChamberItems.disadvantages
    }

    if (timeChamber.getFilterValue() == 'techniques') {
      return timeChamberItems.techniques
    }
  },

  getCharTargetArray() {
    if (timeChamber.getFilterValue() == 'advantages') {
      return handleChar.char.advantages
    }

    if (timeChamber.getFilterValue() == 'disadvantages') {
      return handleChar.char.disadvantages
    }

    if (timeChamber.getFilterValue() == 'techniques') {
      return handleChar.char.techniques
    }
  },

  filterCharacteristics() {
    timeChamber.clearCharacteristicsList()
    timeChamber.clearDescriptionContainer()
    const targetArray = timeChamber.getTimeChamberTargetArray()

    targetArray.forEach((e, i) => {
      timeChamber.printCharacteristic(timeChamber.buildCharacteristicButton(e)
        , i)
    })

    timeChamber.watchDescription()
  },

  buildCharacteristicButton(characteristic) {
    return `<button class="styled-button">${characteristic.name}</button>`
  },

  printCharacteristic(characteristic, index) {
    const characteristicsList = document.querySelector('ul.available-characteristics')

    const li = document.createElement('li')
    li.innerHTML = characteristic
    li.dataset.index = index
    li.setAttribute('name', 'characteristic')

    characteristicsList.appendChild(li)
  },

  clearCharacteristicsList() {
    const characteristics = document.getElementsByName('characteristic')
    const characteristicsList = document.querySelector('ul.available-characteristics')

    if (characteristics.length) {
      for (let i = 0; i < characteristics.length; i++) {
        characteristics[i].removeEventListener('click', timeChamber.printDescription)
      }
    }

    characteristicsList.innerHTML = ''
  },

  watchDescription() {
    const characteristics = document.getElementsByName('characteristic')

    for (let i = 0; i < characteristics.length; i++) {
      characteristics[i].addEventListener('click', timeChamber.printDescription)
      characteristics[i].addEventListener('click', timeChamber.updateOnFocusSkillInfo)
    }
  },

  updateOnFocusSkillInfo(e) {
    const targetArray = timeChamber.getTimeChamberTargetArray()

    const index = e.currentTarget.dataset.index
    const name = targetArray[index].name

    timeChamber.onFocusSkillName = name
    timeChamber.onFocusSkillIndex = index
  },

  printDescription(e) {
    const descriptionContainer = document.getElementById('characteristic-description')

    if (timeChamber.getFilterValue() == 'advantages') {
      descriptionContainer.innerHTML = timeChamberItems.advantages[e.currentTarget.dataset.index].description
      return
    }

    if (timeChamber.getFilterValue() == 'disadvantages') {
      descriptionContainer.innerHTML = timeChamberItems.disadvantages[e.currentTarget.dataset.index].description
      return
    }

    if (timeChamber.getFilterValue() == 'techniques') {
      descriptionContainer.innerHTML = timeChamberItems.techniques[e.currentTarget.dataset.index].description
      return
    }
  },

  clearDescriptionContainer() {
    const descriptionContainer = document.getElementById('characteristic-description')
    descriptionContainer.innerHTML = ''
    return
  },

  closeTimeChamber() {
    const filterBtn = document.getElementById('apply-filter')
    const cancelBtn = document.getElementById('cancel-buy-characteristic')

    toggleModal(8, 'hide')
    timeChamber.clearCharacteristicsList()
    timeChamber.clearDescriptionContainer()
    filterBtn.removeEventListener('click', timeChamber.filterCharacteristics)
    cancelBtn.removeEventListener('click', timeChamber.closeTimeChamber)
    timeChamber.onFocusSkillName = ''
    timeChamber.onFocusSkillIndex = null
    return
  },

  validateCharacteristic() {
    const targetArray = timeChamber.getTimeChamberTargetArray()
    const targetSkillArray = timeChamber.getCharTargetArray()

    if (timeChamber.onFocusSkillIndex == null && timeChamber.onFocusSkillName == '') {
      throw new Error('Por favor, selecione uma vantagem/desvantagem ou técnica.')
    }

    if (targetArray[timeChamber.onFocusSkillIndex].needCheck) {
      if (targetSkillArray.indexOf(timeChamber.onFocusSkillName) != -1) {
        throw new Error(`Você já possui ${timeChamber.onFocusSkillName}.`)
      }
    }
  },

  buySkill() {
    const targetArray = timeChamber.getTimeChamberTargetArray()

    targetArray[timeChamber.onFocusSkillIndex].sideEffet()
  },

  tryBuy() {
    try {
      timeChamber.validateCharacteristic()
      timeChamber.buySkill()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  watchCharacteristics() {
    const filterBtn = document.getElementById('apply-filter')
    const cancelBtn = document.getElementById('cancel-buy-characteristic')
    const confirmBtn = document.getElementById('confirm-buy-characteristic')

    filterBtn.addEventListener('click', timeChamber.filterCharacteristics)
    cancelBtn.addEventListener('click', timeChamber.closeTimeChamber)
    confirmBtn.addEventListener('click', timeChamber.tryBuy)
  }
}
