import { handleChar } from './handleChar.js';
import { Toast } from './handleToast.js'
import { App } from '../App.js'

export const handleForm = {
  name: document.querySelector('input#char-name'),
  race: document.querySelector('input#char-race'),
  baseStr: document.querySelector('input#char-base-str'),
  baseKi: document.querySelector('input#char-base-ki'),
  baseDex: document.querySelector('input#char-base-dex'),
  baseInt: document.querySelector('input#char-base-int'),
  baseRes: document.querySelector('input#char-base-res'),

  createChar() {
    return {
      name: this.name.value,
      race: this.race.value,
      level: 1,
      exp: 1,
      actualHP: Number(this.baseRes.value) * 5 + handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceRes,
      maxHP: Number(this.baseRes.value) * 5 + handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceRes,
      actualKi: Number(this.baseKi.value) * 5 + handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceKi,
      maxKi: Number(this.baseKi.value) * 5 + handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceKi,
      actualSTA: Number(this.baseDex.value) * 5 + handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceDex,
      maxSTA: Number(this.baseDex.value) * 5 + handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceDex,
      baseStr: Number(this.baseStr.value),
      baseDex: Number(this.baseDex.value),
      baseKi: Number(this.baseKi.value),
      baseInt: Number(this.baseInt.value),
      baseRes: Number(this.baseRes.value),
      raceStr: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceStr,
      raceDex: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceDex,
      raceKi: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceKi,
      raceInt: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceInt,
      raceRes: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].raceRes,
      bonusStr: 0,
      bonusDex: 0,
      bonusKi: 0,
      bonusInt: 0,
      bonusRes: 0,
      arbitraryStr: 0,
      arbitraryDex: 0,
      arbitraryKi: 0,
      arbitraryInt: 0,
      arbitraryRes: 0,
      remainingPA: 12 - Number(this.baseStr.value) - Number(this.baseDex.value) - Number(this.baseKi.value) - Number(this.baseInt.value) - Number(this.baseRes.value),
      advantages: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].advantages,
      disadvantages: handleChar.raceSpecs[handleChar.findRaceSpecs(this.race.value)].disadvantages,
      items: []
    }
  },

  validateFields() {
    if (this.name.value.replace(/\s/g, "") == '' ||
      handleChar.availableRaces.indexOf(this.race.value) == -1) {
      throw new Error('Nome de usuário ou classe inválido. Por favor, tente novamente.')
    }

    if ((Number(this.baseStr.value) + Number(this.baseDex.value) + Number(this.baseKi.value) + Number(this.baseInt.value) + Number(this.baseRes.value)) > 12) {
      throw new Error('O máximo de pontos base são 12.')
    }
  },

  clearFields() {
    this.name.value = ''
    this.race.value = ''
    this.baseStr.value = ''
    this.baseDex.value = ''
    this.baseKi.value = ''
    this.baseInt.value = ''
    this.baseRes.value = ''
  },

  submit(e) {
    e.preventDefault()

    try {
      handleForm.validateFields()

      const char = handleForm.createChar()
      handleChar.char = char
      handleForm.clearFields()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  watchForm() {
    const charCreateForm = document.querySelector('form#creation-form')
    charCreateForm.addEventListener('submit', handleForm.submit)
  }
}
