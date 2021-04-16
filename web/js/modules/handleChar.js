import { Storage } from './handleStorage.js'
import { Toast } from './handleToast.js'
import { charUtilites } from './Utils.js'

export const handleChar = {
  char: Storage.get(),

  createNewChar(baseChar) {
    const char = {
      name: baseChar.name,
      race: baseChar.race,
      level: 1,
      status: [
        {
          name: 'EXP',
          actual: 0,
          max: 10
        },

        {
          name: 'Fôlego',
          necessary: 'Destreza',
          actual: baseChar.baseDex * 5 + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceDex,
          max: baseChar.baseDex * 5 + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceDex
        },

        {
          name: 'Ki',
          necessary: 'Ki',
          actual: baseChar.baseKi * 5 + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi,
          max: baseChar.baseKi * 5 + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi
        },

        {
          name: 'P.A',
          actual: 12 - (baseChar.baseStr + baseChar.baseDex + baseChar.baseKi + baseChar.baseInt + baseChar.baseRes),
          max: 12
        },

        {
          name: 'PV',
          necessary: 'Resistência',
          actual: baseChar.baseRes * 5 + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceRes,
          max: baseChar.baseRes * 5 + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceRes,
        },

      ],
      primaryAttributes: [
        {
          name: 'Força',
          simpleName: 'str',
          base: baseChar.baseStr,
          race: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceStr,
          bonus: 0,
          arbitrary: 0
        },

        {
          name: 'Destreza',
          simpleName: 'dex',
          base: baseChar.baseDex,
          race: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceDex,
          bonus: 0,
          arbitrary: 0
        },

        {
          name: 'Ki',
          simpleName: 'ki',
          base: baseChar.baseKi,
          race: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi,
          bonus: 0,
          arbitrary: 0
        },

        {
          name: 'Inteligência',
          simpleName: 'int',
          base: baseChar.baseInt,
          race: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceInt,
          bonus: 0,
          arbitrary: 0
        },

        {
          name: 'Resistência',
          simpleName: 'res',
          base: baseChar.baseRes,
          race: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceRes,
          bonus: 0,
          arbitrary: 0
        }
      ],
      secondaryAttributes: [
        {
          name: 'Ataque',
          necessaryBasePrimaryAttribute: 'Força',
          base: baseChar.baseStr + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceStr,
          arbitrary: 0,
          total: baseChar.baseStr + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceStr
        },

        {
          name: 'Defesa',
          necessaryBasePrimaryAttribute: 'Força',
          base: baseChar.baseStr + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceStr,
          arbitrary: 0,
          total: baseChar.baseStr + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceStr
        },

        {
          name: 'Ataque Especial',
          necessaryBasePrimaryAttribute: 'Ki',
          base: baseChar.baseKi + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi,
          arbitrary: 0,
          total: baseChar.baseKi + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi
        },

        {
          name: 'Defesa Especial',
          necessaryBasePrimaryAttribute: 'Ki',
          base: baseChar.baseKi + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi,
          arbitrary: 0,
          total: baseChar.baseKi + charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].raceKi
        }
      ],
      advantages: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].advantages,
      disadvantages: charUtilites.raceSpecs[charUtilites.findRaceSpecs(baseChar.race)].disadvantages,
      items: [],
      techniques: [],
    }

    handleChar.char = char
    return
  },

  updateCharMaxStatus(status) {
    let statusIndex = 0;
    let necessaryPrimaryAttributeIndex = 0;
    let maxValue = 0;

    for (let i = 0; i < handleChar.char.status.length; i++) {
      if (handleChar.char.status[i].name == status) {
        statusIndex = i;
        break;
      }
    }

    for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
      if (handleChar.char.primaryAttributes[i].name == handleChar.char.status[statusIndex].necessary) {
        necessaryPrimaryAttributeIndex = i;
        break;
      }
    }

    maxValue = handleChar.char.primaryAttributes[necessaryPrimaryAttributeIndex].base * 5 + handleChar.char.primaryAttributes[necessaryPrimaryAttributeIndex].race + handleChar.char.primaryAttributes[necessaryPrimaryAttributeIndex].bonus + handleChar.char.primaryAttributes[necessaryPrimaryAttributeIndex].arbitrary;

    handleChar.char.status[statusIndex].max = maxValue;

    if (handleChar.char.status[statusIndex].actual >= handleChar.char.status[statusIndex].max) {
      handleChar.char.status[statusIndex].actual = handleChar.char.status[statusIndex].max;
    }

    if (handleChar.char.status[statusIndex].max <= 0) {
      handleChar.char.status[statusIndex].max = 0;
      handleChar.char.status[statusIndex].actual = 0;
    }

    return
  },

  updateCharActualStatus(status, value) {
    let statusIndex = 0;

    for (let i = 0; i < handleChar.char.status.length; i++) {
      if (handleChar.char.status[i].name == status) {
        statusIndex = i;
        break;
      }
    }

    handleChar.char.status[statusIndex].actual += value

    if (handleChar.char.status[statusIndex].actual <= 0) {
      handleChar.char.status[statusIndex].actual = 0
    }

    if (handleChar.char.status[statusIndex].actual >= handleChar.char.status[statusIndex].max) {
      handleChar.char.status[statusIndex].actual = handleChar.char.status[statusIndex].max
    }

    if (status == 'EXP') {
      handleChar.checkLevelUp()
    }

    return
  },

  updateCharSecondaryAttributes() {
    handleChar.char.secondaryAttributes.forEach(e => {
      let primaryStatusIndex = 0;

      for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
        if (handleChar.char.primaryAttributes[i].name == e.necessaryBasePrimaryAttribute) {
          primaryStatusIndex = i;
          break;
        }
      }

      e.base = handleChar.char.primaryAttributes[primaryStatusIndex].base + handleChar.char.primaryAttributes[primaryStatusIndex].race + handleChar.char.primaryAttributes[primaryStatusIndex].bonus + handleChar.char.primaryAttributes[primaryStatusIndex].arbitrary;
      e.total = e.base + e.arbitrary;
    })

    return
  },

  checkLevelUp() {
    if (handleChar.char.status[0].actual == handleChar.char.status[0].max) {
      handleChar.updateCharActualStatus('EXP', -10)
      handleChar.updateCharActualStatus('Fôlego', handleChar.char.status[1].max)
      handleChar.updateCharActualStatus('Ki', handleChar.char.status[2].max)
      handleChar.updateCharActualStatus('P.A', 2)
      handleChar.updateCharActualStatus('PV', handleChar.char.status[4].max)
      handleChar.char.level += 1;
      Toast.open(`Parabéns, você alcançou o nível ${handleChar.char.level}! +2 Pontos de Aptidão concedidos, e todos os status totalmente recuperados!`)
      return
    }
  },

  addCharAdvantage(advantage) {
    handleChar.char.advantages.push(advantage)
    return
  },

  removeCharAdvantage(advantage) {
    let advantageIndex = handleChar.char.advantages.indexOf(advantage)

    if (advantageIndex == -1) {
      throw new Error('Você não possui esta vantagem.')
    }

    handleChar.char.advantages.splice(advantageIndex, 1)
    return
  },

  addCharDisadvantage(disadvantage) {
    handleChar.char.disadvantages.push(disadvantage)
    return
  },

  removeCharDisadvantage(disadvantage) {
    let disadvantageIndex = handleChar.char.disadvantages.indexOf(disadvantage)

    if (disadvantageIndex == -1) {
      throw new Error('Você não possui esta desvantagem.')
    }

    handleChar.char.disadvantages.splice(disadvantageIndex, 1)
    return
  },

  addCharItem(item) {
    handleChar.char.items.push(item)
    return
  },

  removeCharItem(itemIndex) {
    handleChar.char.items.splice(itemIndex, 1)
    return
  },

  addTechnique(technique) {
    handleChar.char.techniques.push(technique)
    return
  },

  removeCharTechnique(technique) {
    let techniqueIndex = handleChar.char.techniques.indexOf(technique)

    if (techniqueIndex == -1) {
      throw new Error('Você não possui esta técnica.')
    }

    handleChar.char.techniques.splice(techniqueIndex, 1)
    return
  },

  deleteChar() {
    handleChar.char = null
    return
  }
}
