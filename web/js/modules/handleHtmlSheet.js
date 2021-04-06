import { handleChar } from './handleChar.js'

export const Sheet = {
  initTable() {
    this.updateCharIdentity()
    this.updateStats()
    this.updateAttributes()
    this.printAdvantagesOrDisadvantages('advantages')
    this.printAdvantagesOrDisadvantages('disadvantages')
    this.printTechniques()
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
    this.updateSecAttributesTableSection()
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
    const arbitraryStrContainer = document.querySelector('td#char-arbitrary-str-attribute')
    const totalStrContainer = document.querySelector('td#char-total-str-attribute')

    baseStrContainer.innerHTML = handleChar.char.baseStr
    raceStrContainer.innerHTML = handleChar.char.raceStr
    bonusStrContainer.innerHTML = handleChar.char.bonusStr
    arbitraryStrContainer.innerHTML = handleChar.char.arbitraryStr
    totalStrContainer.innerHTML = handleChar.char.baseStr + handleChar.char.raceStr + handleChar.char.bonusStr + handleChar.char.arbitraryStr
  },

  updateDexTableSection() {
    const baseDexContainer = document.querySelector('td#char-base-dex-attribute')
    const raceDexContainer = document.querySelector('td#char-race-dex-attribute')
    const bonusDexContainer = document.querySelector('td#char-bonus-dex-attribute')
    const arbitraryDexContainer = document.querySelector('td#char-arbitrary-dex-attribute')
    const totalDexContainer = document.querySelector('td#char-total-dex-attribute')

    baseDexContainer.innerHTML = handleChar.char.baseDex
    raceDexContainer.innerHTML = handleChar.char.raceDex
    bonusDexContainer.innerHTML = handleChar.char.bonusDex
    arbitraryDexContainer.innerHTML = handleChar.char.arbitraryDex
    totalDexContainer.innerHTML = handleChar.char.baseDex + handleChar.char.raceDex + handleChar.char.bonusDex + handleChar.char.arbitraryDex
  },

  updateKiTableSection() {
    const baseKiContainer = document.querySelector('td#char-base-ki-attribute')
    const raceKiContainer = document.querySelector('td#char-race-ki-attribute')
    const bonusKiContainer = document.querySelector('td#char-bonus-ki-attribute')
    const arbitraryKiContainer = document.querySelector('td#char-arbitrary-ki-attribute')
    const totalKiContainer = document.querySelector('td#char-total-ki-attribute')

    baseKiContainer.innerHTML = handleChar.char.baseKi
    raceKiContainer.innerHTML = handleChar.char.raceKi
    bonusKiContainer.innerHTML = handleChar.char.bonusKi
    arbitraryKiContainer.innerHTML = handleChar.char.arbitraryKi
    totalKiContainer.innerHTML = handleChar.char.baseKi + handleChar.char.raceKi + handleChar.char.bonusKi + handleChar.char.arbitraryKi
  },

  updateIntTableSection() {
    const baseIntContainer = document.querySelector('td#char-base-int-attribute')
    const raceIntContainer = document.querySelector('td#char-race-int-attribute')
    const bonusIntContainer = document.querySelector('td#char-bonus-int-attribute')
    const arbitraryIntContainer = document.querySelector('td#char-arbitrary-int-attribute')
    const totalIntContainer = document.querySelector('td#char-total-int-attribute')

    baseIntContainer.innerHTML = handleChar.char.baseInt
    raceIntContainer.innerHTML = handleChar.char.raceInt
    bonusIntContainer.innerHTML = handleChar.char.bonusInt
    arbitraryIntContainer.innerHTML = handleChar.char.arbitraryInt
    totalIntContainer.innerHTML = handleChar.char.baseInt + handleChar.char.raceInt + handleChar.char.bonusInt + handleChar.char.arbitraryInt
  },

  updateResTableSection() {
    const baseResContainer = document.querySelector('td#char-base-res-attribute')
    const raceResContainer = document.querySelector('td#char-race-res-attribute')
    const bonusResContainer = document.querySelector('td#char-bonus-res-attribute')
    const arbitraryResContainer = document.querySelector('td#char-arbitrary-res-attribute')
    const totalResContainer = document.querySelector('td#char-total-res-attribute')

    baseResContainer.innerHTML = handleChar.char.baseRes
    raceResContainer.innerHTML = handleChar.char.raceRes
    bonusResContainer.innerHTML = handleChar.char.bonusRes
    arbitraryResContainer.innerHTML = handleChar.char.arbitraryRes
    totalResContainer.innerHTML = handleChar.char.baseRes + handleChar.char.raceRes + handleChar.char.bonusRes + handleChar.char.arbitraryRes
  },

  updateSecAttributesTableSection() {
    const tableContaier = document.querySelector('#char-secondary-attributes tbody')

    tableContaier.innerHTML =
      `
        <tr>
          <td>Ataque</td>
          <td>${handleChar.getCharBaseSecAttribute()}</td>
          <td>${handleChar.char.arbitraryBaseAtk}</td>
          <td>${handleChar.getCharBaseSecAttribute() + handleChar.char.arbitraryBaseAtk}</td>
        </tr>
        <tr>
          <td>Defesa</td>
          <td>${handleChar.getCharBaseSecAttribute()}</td>
          <td>${handleChar.char.arbitraryBaseDef}</td>
          <td>${handleChar.getCharBaseSecAttribute() + handleChar.char.arbitraryBaseDef}</td>
        </tr>
        <tr>
          <td>Ataque Especial</td>
          <td>${handleChar.getCharSpecialSecAttribute()}</td>
          <td>${handleChar.char.arbitrarySpAtk}</td>
          <td>${handleChar.getCharSpecialSecAttribute() + handleChar.char.arbitrarySpAtk}</td>
        </tr>
        <tr>
        <td>Defesa Especial</td>
        <td>${handleChar.getCharSpecialSecAttribute()}</td>
        <td>${handleChar.char.arbitrarySpDef}</td>
        <td>${handleChar.getCharSpecialSecAttribute() + handleChar.char.arbitrarySpDef}</td>
        </tr>
      `
  },

  handleHtml(which, index) {
    const html = `<td>${which}</td>`

    return html
  },

  buildTechniqueHtml(technique) {
    const techniquesTable = document.querySelector('#char-abilities tbody')
    const tr = document.createElement('tr')
    tr.innerHTML = Sheet.handleHtml(technique)

    techniquesTable.appendChild(tr)
    return
  },

  printTechniques() {
    handleChar.char.techniques.forEach(Sheet.buildTechniqueHtml)
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
    const secAttributesTable = document.querySelector('#char-secondary-attributes tbody')
    const techniquesTable = document.querySelector('#char-abilities tbody')

    secAttributesTable.innerHTML = ''
    advantagesTable.innerHTML = ''
    disadvantagesTable.innerHTML = ''
    itemsTable.innerHTML = ''
    techniquesTable.innerHTML = ''
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
