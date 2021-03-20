import { handleChar } from './handleChar.js'

export const Sheet = {
  initTable() {
    this.updateCharIdentity()
    this.updateStats()
    this.updateAttributes()
    this.printAdvantagesOrDisadvantages('advantages')
    this.printAdvantagesOrDisadvantages('disadvantages')
    this.printItems()
  },

  updateCharIdentity() {
    this.updateCharName()
    this.updateCharRace()
    this.updateCharLevel()
  },

  updateStats() {
    this.updateHP()
    this.updateKi()
    this.updateSta()
    this.updatePA()
    this.updateEXP()
  },

  updateAttributes() {
    this.updateStrTableSection()
    this.updateDexTableSection()
    this.updateKiTableSection()
    this.updateIntTableSection()
    this.updateResTableSection()
  },

  updateCharName() {
    const nameContainer = document.querySelector('p#char-name')

    nameContainer.innerHTML = 'Nome: ' + handleChar.char.name
  },

  updateCharRace() {
    const raceContainer = document.querySelector('p#char-race')

    raceContainer.innerHTML = 'Raça: ' + handleChar.char.race
  },

  updateCharLevel() {
    const levelContainer = document.querySelector('p#char-level')

    levelContainer.innerHTML = 'Nível: ' + handleChar.char.level
  },

  updateHP() {
    const actualHPContainer = document.querySelector('td#char-actual-hp')
    const maxHPContainer = document.querySelector('td#char-max-hp')

    actualHPContainer.innerHTML = handleChar.char.actualHP
    maxHPContainer.innerHTML = handleChar.char.maxHP
  },

  updateKi() {
    const actualKiContainer = document.querySelector('td#char-actual-ki')
    const maxKiContainer = document.querySelector('td#char-max-ki')

    actualKiContainer.innerHTML = handleChar.char.actualKi
    maxKiContainer.innerHTML = handleChar.char.maxKi
  },

  updateSta() {
    const actualStaContainer = document.querySelector('td#char-actual-sta')
    const maxStaContainer = document.querySelector('td#char-max-sta')

    actualStaContainer.innerHTML = handleChar.char.actualSTA
    maxStaContainer.innerHTML = handleChar.char.maxSTA
  },

  updatePA() {
    const actualPAContainer = document.querySelector('td#char-actual-ap')

    actualPAContainer.innerHTML = handleChar.char.remainingPA
  },

  updateEXP() {
    const expContainer = document.querySelector('td#char-actual-exp')

    expContainer.innerHTML = handleChar.char.exp
  },

  updateStrTableSection() {
    const baseStrContainer = document.querySelector('td#char-base-str-attribute')
    const raceStrContainer = document.querySelector('td#char-race-str-attribute')
    const bonusStrContainer = document.querySelector('td#char-bonus-str-attribute')
    const totalStrContainer = document.querySelector('td#char-total-str-attribute')

    baseStrContainer.innerHTML = handleChar.char.baseStr
    raceStrContainer.innerHTML = handleChar.char.raceStr
    bonusStrContainer.innerHTML = handleChar.char.bonusStr
    totalStrContainer.innerHTML = handleChar.char.baseStr + handleChar.char.raceStr + handleChar.char.bonusStr
  },

  updateDexTableSection() {
    const baseDexContainer = document.querySelector('td#char-base-dex-attribute')
    const raceDexContainer = document.querySelector('td#char-race-dex-attribute')
    const bonusDexContainer = document.querySelector('td#char-bonus-dex-attribute')
    const totalDexContainer = document.querySelector('td#char-total-dex-attribute')

    baseDexContainer.innerHTML = handleChar.char.baseDex
    raceDexContainer.innerHTML = handleChar.char.raceDex
    bonusDexContainer.innerHTML = handleChar.char.bonusDex
    totalDexContainer.innerHTML = handleChar.char.baseDex + handleChar.char.raceDex + handleChar.char.bonusDex
  },

  updateKiTableSection() {
    const baseKiContainer = document.querySelector('td#char-base-ki-attribute')
    const raceKiContainer = document.querySelector('td#char-race-ki-attribute')
    const bonusKiContainer = document.querySelector('td#char-bonus-ki-attribute')
    const totalKiContainer = document.querySelector('td#char-total-ki-attribute')

    baseKiContainer.innerHTML = handleChar.char.baseKi
    raceKiContainer.innerHTML = handleChar.char.raceKi
    bonusKiContainer.innerHTML = handleChar.char.bonusKi
    totalKiContainer.innerHTML = handleChar.char.baseKi + handleChar.char.raceKi + handleChar.char.bonusKi
  },

  updateIntTableSection() {
    const baseIntContainer = document.querySelector('td#char-base-int-attribute')
    const raceIntContainer = document.querySelector('td#char-race-int-attribute')
    const bonusIntContainer = document.querySelector('td#char-bonus-int-attribute')
    const totalIntContainer = document.querySelector('td#char-total-int-attribute')

    baseIntContainer.innerHTML = handleChar.char.baseInt
    raceIntContainer.innerHTML = handleChar.char.raceInt
    bonusIntContainer.innerHTML = handleChar.char.bonusInt
    totalIntContainer.innerHTML = handleChar.char.baseInt + handleChar.char.raceInt + handleChar.char.bonusInt
  },

  updateResTableSection() {
    const baseResContainer = document.querySelector('td#char-base-res-attribute')
    const raceResContainer = document.querySelector('td#char-race-res-attribute')
    const bonusResContainer = document.querySelector('td#char-bonus-res-attribute')
    const totalResContainer = document.querySelector('td#char-total-res-attribute')

    baseResContainer.innerHTML = handleChar.char.baseRes
    raceResContainer.innerHTML = handleChar.char.raceRes
    bonusResContainer.innerHTML = handleChar.char.bonusRes
    totalResContainer.innerHTML = handleChar.char.baseRes + handleChar.char.raceRes + handleChar.char.bonusRes
  },

  handleHtml(which, index) {
    const html = `<td>${which}</td>`

    return html
  },

  addAdvantage(advantage, index) {
    const advantagesTable = document.querySelector('#char-advantages tbody')
    const tr = document.createElement('tr')
    tr.innerHTML = this.handleHtml(advantage, index)
    tr.dataset.index = index

    advantagesTable.appendChild(tr)
  },

  addDisadvantage(disadvantage, index) {
    const disadvantagesTable = document.querySelector('#char-disadvantages tbody')
    const tr = document.createElement('tr')
    tr.innerHTML = this.handleHtml(disadvantage, index)
    tr.dataset.index = index

    disadvantagesTable.appendChild(tr)
  },

  printAdvantagesOrDisadvantages(which) {
    which == 'advantages'
      ? handleChar.char.advantages.forEach((a, i) => this.addAdvantage(a, i))
      : handleChar.char.disadvantages.forEach((a, i) => this.addDisadvantage(a, i))
  },

  clearTables() {
    const advantagesTable = document.querySelector('#char-advantages tbody')
    const disadvantagesTable = document.querySelector('#char-disadvantages tbody')
    const itemsTable = document.querySelector('#char-items tbody')

    advantagesTable.innerHTML = ''
    disadvantagesTable.innerHTML = ''
    itemsTable.innerHTML = ''
  },

  buildItemHtml(item) {
    const html = `
    <td>${item.name}</td>
    <td>${item.type}</td>
    <td>${item.rarity}</td>`

    return html
  },

  updateItems(item) {
    const itemsTable = document.querySelector('#char-items tbody')
    const tr = document.createElement('tr')
    tr.innerHTML = Sheet.buildItemHtml(item)
    itemsTable.appendChild(tr)
  },

  printItems() {
    handleChar.char.items.forEach(Sheet.updateItems)
  }
}
