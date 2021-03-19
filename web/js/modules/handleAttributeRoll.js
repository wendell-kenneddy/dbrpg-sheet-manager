import { handleChar } from "./handleChar.js"

export const handleRoll = {
  diceFaces: 0,
  rolls: [],
  critRolls: 0,
  failedRolls: 0,
  rolledAttribute: '',
  rolledAttributeTotal: 0,
  attributesPlusRollsTotal: 0,
  output: '',

  updateDiceFaces(facesAmount) {
    this.diceFaces = facesAmount
  },

  rollDice(times) {
    for (let i = 0; i < times; i++) {
      const randomNum = Math.round(Math.random() * this.diceFaces)

      this.rolls.push(randomNum)
      this.attributesPlusRollsTotal += randomNum
    }
  },

  checkCrits() {
    for (let i = 0; i < this.rolls.length; i++) {
      if (this.rolls[i] == this.diceFaces) {
        this.critRolls += 1
      }
    }
  },

  checkFails() {
    for (let i = 0; i < this.rolls.length; i++) {
      if (this.rolls[i] == 0) {
        this.failedRolls += 1
      }
    }
  },

  formatRolls() {
    const rolls = []
    for (let i = 0; i < this.rolls.length; i++) {
      rolls.push(`${this.rolls[i]}(d${this.diceFaces})`)
    }

    return rolls
  },

  resetRoll() {
    this.diceFaces = 0
    this.attributesPlusRollsTotal = 0
    this.rolledAttributeTotal = 0
    this.rolledAttribute = ''
    this.rolls = []
    this.critRolls = 0
    this.failedRolls = 0
    this.output = ''
    return
  },

  clearRollContainer() {
    const resultContainer = document.getElementById('result-container')
    resultContainer.innerHTML = '<p>O resultado aparecerá aqui.'
    return
  },


  getAttributeTotal(attribute) {
    if (attribute == 'str') {
      this.rolledAttribute = 'Força'
      this.rolledAttributeTotal += handleChar.char.baseStr + handleChar.char.bonusStr + handleChar.char.raceStr
      this.attributesPlusRollsTotal += this.rolledAttributeTotal
      return
    }

    if (attribute == 'dex') {
      this.rolledAttribute = 'Destreza'
      this.rolledAttributeTotal += handleChar.char.baseDex + handleChar.char.bonusDex + handleChar.char.raceDex
      this.attributesPlusRollsTotal += this.rolledAttributeTotal
      return
    }

    if (attribute == 'ki') {
      this.rolledAttribute = 'Ki'
      this.rolledAttributeTotal += handleChar.char.baseKi + handleChar.char.bonusKi + handleChar.char.raceKi
      this.attributesPlusRollsTotal += this.rolledAttributeTotal
      return
    }

    if (attribute == 'int') {
      this.rolledAttribute = 'Inteligência'
      this.rolledAttributeTotal += handleChar.char.baseInt + handleChar.char.bonusInt + handleChar.char.raceInt
      this.attributesPlusRollsTotal += this.rolledAttributeTotal
      return
    }

    if (attribute == 'res') {
      this.rolledAttribute = 'Resistência'
      this.rolledAttributeTotal += handleChar.char.baseRes + handleChar.char.bonusRes + handleChar.char.raceRes
      this.attributesPlusRollsTotal += this.rolledAttributeTotal
      return
    }
  },

  buildOutput() {
    this.output += `${this.formatRolls().join(' + ')} + ${this.rolledAttributeTotal}(total de ${this.rolledAttribute}) = ${this.attributesPlusRollsTotal}.`

    if (this.critRolls != 0) {
      this.output += ` <span class="critical-roll">${this.critRolls} Acerto(s) Crítico(s)!</span>`
    }

    if (this.failedRolls != 0) {
      this.output += ` <span class="critical-fail">${this.failedRolls} Falha(s) Crítica(s)!</span>`
    }
  },

  printOutput() {
    const resultContainer = document.getElementById('roll-result')
    resultContainer.innerHTML = ''
    resultContainer.innerHTML = this.output
    return
  }
}
