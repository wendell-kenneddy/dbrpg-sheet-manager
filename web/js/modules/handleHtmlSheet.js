import { handleChar } from './handleChar.js'

export const Sheet = {
  initTable() {
    Sheet.updateCharBasicInfoSection()
    Sheet.updateStatusSection()
    Sheet.updatePrimaryAttributesTableSection()
    Sheet.updateSecondaryAttributesTableSection()
    Sheet.updateTechniquesTableSection()
    Sheet.updateAdvantagesTableSection()
    Sheet.updateDisadvantagesTableSection()
    Sheet.updateCharItemsTableSection()
  },

  updateCharBasicInfoSection() {
    const charBasicInfoContainer = document.getElementById('char-info')

    charBasicInfoContainer.innerHTML =
      `
      <p>${handleChar.char.name}</p>
      <p>${handleChar.char.race}</p>
      <p>Nível: ${handleChar.char.level}</p>
    `
  },

  updateStatusSection() {
    const statusTableContainer = document.querySelector('#char-stats tbody')

    handleChar.char.status.forEach(e => {
      const tr = document.createElement('tr')
      tr.innerHTML =
        `
        <td>${e.name}</td>  
        <td>${e.actual}</td>  
        <td>${e.max}</td>  
      `
      statusTableContainer.appendChild(tr)
    })

    return
  },

  updatePrimaryAttributesTableSection() {
    const primaryAttributesTableSection = document.querySelector('#char-primary-attributes tbody')

    handleChar.char.primaryAttributes.forEach(e => {
      const tr = document.createElement('tr')

      tr.innerHTML =
        `
        <td>${e.name}</td>
        <td>${e.base}</td>
        <td>${e.race}</td>
        <td>${e.bonus}</td>
        <td>${e.arbitrary}</td>
        <td>${e.base + e.race + e.bonus + e.arbitrary}</td>
      `

      primaryAttributesTableSection.appendChild(tr)
    })

    return
  },

  updateSecondaryAttributesTableSection() {
    const secondaryAttributesTableSection = document.querySelector('#char-secondary-attributes tbody')

    handleChar.char.secondaryAttributes.forEach(e => {
      const tr = document.createElement('tr')

      tr.innerHTML =
        `
        <td>${e.name}</td>
        <td>${e.base}</td>
        <td>${e.arbitrary}</td>
        <td>${e.total}</td>
      `

      secondaryAttributesTableSection.appendChild(tr)
    })

    return
  },

  updateTechniquesTableSection() {
    const charTechniquesContainer = document.querySelector('#char-abilities tbody');

    handleChar.char.techniques.forEach(e => {
      const tr = document.createElement('tr');

      tr.innerHTML = `<td>${e}</td>`;

      charTechniquesContainer.appendChild(tr)
    })

    return
  },

  updateAdvantagesTableSection() {
    const advantagesTableContainer = document.querySelector('#char-advantages tbody');

    handleChar.char.advantages.forEach(e => {
      const tr = document.createElement('tr');

      tr.innerHTML = `<td>${e}</td>`;

      advantagesTableContainer.appendChild(tr)
    })

    return
  },

  updateDisadvantagesTableSection() {
    const disadvantagesTableContainer = document.querySelector('#char-disadvantages tbody');

    handleChar.char.disadvantages.forEach(e => {
      const tr = document.createElement('tr')

      tr.innerHTML = `<td>${e}</td>`;

      disadvantagesTableContainer.appendChild(tr)
    })

    return
  },

  updateCharItemsTableSection() {
    const charItemsTableContainer = document.querySelector('#char-items tbody');

    handleChar.char.items.forEach(e => {
      const tr = document.createElement('tr');

      tr.innerHTML =
        `
        <td>${e.name}</td>
        <td>${e.type}</td>
        <td>${e.rarity}</td>
      `

      charItemsTableContainer.appendChild(tr)
    })

    return
  },

  // Clear all the tables tbodies, to avoid duplicate content.
  clearTables() {
    const statusTableContainer = document.querySelector('#char-stats tbody');
    const primaryAttributesTableSection = document.querySelector('#char-primary-attributes tbody');
    const secondaryAttributesTableSection = document.querySelector('#char-secondary-attributes tbody');
    const charTechniquesContainer = document.querySelector('#char-abilities tbody');
    const advantagesTableContainer = document.querySelector('#char-advantages tbody');
    const disadvantagesTableContainer = document.querySelector('#char-disadvantages tbody');
    const charItemsTableContainer = document.querySelector('#char-items tbody');

    statusTableContainer.innerHTML = '';
    primaryAttributesTableSection.innerHTML = '';
    secondaryAttributesTableSection.innerHTML = '';
    charTechniquesContainer.innerHTML = '';
    advantagesTableContainer.innerHTML = '';
    disadvantagesTableContainer.innerHTML = '';
    charItemsTableContainer.innerHTML = '';
  }
}
