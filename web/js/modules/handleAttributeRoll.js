import { handleChar } from "./handleChar.js"

export const attributeRoll = {
  diceFaces: 0,
  rolls: [],
  critRolls: 0,
  failedRolls: 0,
  rolledAttribute: '',
  rolledAttributeTotal: 0,
  attributesPlusRollsTotal: 0,
  output: '',

  updateDiceFaces(facesAmount) {
    attributeRoll.diceFaces = facesAmount;
    return
  },

  rollDice(times) {
    for (let i = 0; i < times; i++) {
      const randomNum = Math.round(Math.random() * this.diceFaces);

      attributeRoll.rolls.push(randomNum)
      attributeRoll.attributesPlusRollsTotal += randomNum
    }

    return
  },

  checkCrits() {
    if (attributeRoll.diceFaces == 20) {
      for (let i = 0; i < attributeRoll.rolls.length; i++) {
        if (attributeRoll.rolls[i] == 20) {
          attributeRoll.critRolls += 1
        }
      }
    }

    return
  },

  checkFails() {
    if (attributeRoll.diceFaces == 20) {
      for (let i = 0; i < attributeRoll.rolls.length; i++) {
        if (attributeRoll.rolls[i] == 0) {
          attributeRoll.failedRolls += 1
        }
      }
    }

    return
  },

  formatRolls() {
    const rolls = []

    for (let i = 0; i < this.rolls.length; i++) {
      rolls.push(`${this.rolls[i]}(d${this.diceFaces})`)
    }

    return rolls
  },

  resetRoll() {
    attributeRoll.diceFaces = 0;
    attributeRoll.attributesPlusRollsTotal = 0;
    attributeRoll.rolledAttributeTotal = 0;
    attributeRoll.rolledAttribute = '';
    attributeRoll.rolls = [];
    attributeRoll.critRolls = 0;
    attributeRoll.failedRolls = 0;
    attributeRoll.output = '';
    return
  },

  getAttributeTotal(attribute) {
    let charPrimaryAttributeIndex = 0;
    let attributeTotal = 0;

    for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
      if (handleChar.char.primaryAttributes[i].simpleName == attribute) {
        charPrimaryAttributeIndex = i;
        break;
      }
    }

    attributeTotal = handleChar.char.primaryAttributes[charPrimaryAttributeIndex].base + handleChar.char.primaryAttributes[charPrimaryAttributeIndex].race + handleChar.char.primaryAttributes[charPrimaryAttributeIndex].bonus + handleChar.char.primaryAttributes[charPrimaryAttributeIndex].arbitrary;
    attributeRoll.rolledAttribute = handleChar.char.primaryAttributes[charPrimaryAttributeIndex].name
    attributeRoll.rolledAttributeTotal = attributeTotal;
    attributeRoll.attributesPlusRollsTotal += attributeTotal;
    return
  },

  buildOutput() {
    attributeRoll.output += `${attributeRoll.formatRolls().join(' + ')} + ${attributeRoll.rolledAttributeTotal}(total de ${attributeRoll.rolledAttribute}) = ${attributeRoll.attributesPlusRollsTotal}.`;

    if (attributeRoll.critRolls != 0) {
      attributeRoll.output += ` <span class="critical-roll">${this.critRolls} Acerto(s) Crítico(s)!</span>`;
    }

    if (attributeRoll.failedRolls != 0) {
      attributeRoll.output += ` <span class="critical-fail">${attributeRoll.failedRolls} Falha(s) Crítica(s)!</span>`;
    }

    return
  },

  printOutput() {
    const resultContainer = document.getElementById('roll-result');
    resultContainer.innerHTML = ''
    resultContainer.innerHTML = attributeRoll.output
    return
  }
}
