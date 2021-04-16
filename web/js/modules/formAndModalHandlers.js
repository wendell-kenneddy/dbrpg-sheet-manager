import { handleChar } from './handleChar.js';
import { Toast } from './handleToast.js'
import { App } from '../App.js'
import { toggleModal } from './handleModals.js';
import { attributeRoll } from './handleAttributeRoll.js';
import { charUtilites, timeChamberItems } from './Utils.js';


export const charCreationForm = {
  name: document.querySelector('input#char-name'),
  race: document.getElementById('char-race'),
  baseStr: document.querySelector('input#char-base-str'),
  baseKi: document.querySelector('input#char-base-dex'),
  baseDex: document.querySelector('input#char-base-ki'),
  baseInt: document.querySelector('input#char-base-int'),
  baseRes: document.querySelector('input#char-base-res'),

  getBaseValues() {
    return {
      name: charCreationForm.name.value,
      race: charCreationForm.race.value,
      baseStr: Number(charCreationForm.baseStr.value),
      baseDex: Number(charCreationForm.baseDex.value),
      baseKi: Number(charCreationForm.baseKi.value),
      baseInt: Number(charCreationForm.baseInt.value),
      baseRes: Number(charCreationForm.baseRes.value),
    }
  },

  validateFields() {
    const { name, race, baseStr, baseDex, baseKi, baseInt, baseRes } = charCreationForm.getBaseValues()


    if (name.replace(/\s/g, "") == '') {
      throw new Error('Nome de usuário inválido. Por favor, tente novamente.')
    }

    if (baseStr + baseDex + baseKi + baseInt + baseRes > 12) {
      throw new Error('O máximo de pontos base são 12.')
    }

    if (baseStr + baseDex + baseKi + baseInt + baseRes < 0) {
      throw new Error('Por favor, indique valores válidos.')
    }

    return
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

  confirmCharCreate(e) {
    e.preventDefault()

    try {
      charCreationForm.validateFields()
      handleChar.createNewChar(charCreationForm.getBaseValues())
      App.reload()
      Toast.open('Seu guerreiro foi criado com sucesso!')
    } catch (error) {
      console.log(error)
    }

  },

  watchForm() {
    const charCreateForm = document.querySelector('form#creation-form')
    charCreateForm.addEventListener('submit', charCreationForm.confirmCharCreate)
  }
}

export const charDeleteModal = {
  watchDelete() {
    const confirmCharDeleteBtn = document.getElementById('confirm-char-delete');
    const cancelCharDeleteBtn = document.getElementById('cancel-char-delete');

    confirmCharDeleteBtn.addEventListener('click', charDeleteModal.confirmCharDelete);
    cancelCharDeleteBtn.addEventListener('click', charDeleteModal.closeCharDeleteModal);
  },

  confirmCharDelete() {
    handleChar.deleteChar()
    charDeleteModal.closeCharDeleteModal()
    App.reload()
  },

  closeCharDeleteModal() {
    const confirmCharDeleteBtn = document.getElementById('confirm-char-delete');
    const cancelCharDeleteBtn = document.getElementById('cancel-char-delete');

    toggleModal(1, 'hide')
    confirmCharDeleteBtn.removeEventListener('click', charDeleteModal.confirmCharDelete);
    cancelCharDeleteBtn.removeEventListener('click', charDeleteModal.closeCharDeleteModal);
  }
}

export const attributeRollForm = {

  getRollInfo() {
    const radios = document.getElementsByName('attribute-to-roll');
    const diceFaces = document.getElementById('dice-faces-amount');
    const rollTimes = document.getElementById('dices-amount');
    let attributeToRollValue = '';

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        attributeToRollValue = radios[i].value
        break;
      }
    }

    return {
      radios: radios,
      diceFaces: Number(diceFaces.value),
      rollTimes: Number(rollTimes.value),
      attributeToRoll: attributeToRollValue
    }
  },

  validateRoll() {
    const { diceFaces, rollTimes } = attributeRollForm.getRollInfo()

    if (!Number.isInteger(diceFaces) ||
      diceFaces < 0 ||
      !Number.isInteger(rollTimes) ||
      rollTimes < 0) {
      throw new Error('Por favor, especifique valores válidos para o número de faces do dado e o número de vezes que o dado será rolado.')
    }

    return
  },

  clearRollInputFields() {
    const diceFaces = document.getElementById('dice-faces-amount');
    const rollTimes = document.getElementById('dices-amount');

    diceFaces.value = '';
    rollTimes.value = '';

    return
  },

  clearRollResultContainer() {
    const resultContainer = document.getElementById('result-container')
    resultContainer.innerHTML = '<p>O resultado aparecerá aqui.</p>'
    return
  },

  confirmAttributeRoll(e) {
    e.preventDefault()

    const { diceFaces, rollTimes, attributeToRoll } = attributeRollForm.getRollInfo()

    try {
      attributeRollForm.validateRoll()
      attributeRoll.resetRoll()
      attributeRoll.updateDiceFaces(diceFaces)
      attributeRoll.rollDice(rollTimes)
      attributeRoll.getAttributeTotal(attributeToRoll)
      attributeRoll.checkCrits()
      attributeRoll.checkFails()
      attributeRoll.buildOutput()
      attributeRoll.printOutput()
      attributeRollForm.clearRollInputFields()
    } catch (error) {
      Toast.open(error.message)
    }

    return
  },

  closeAttributeRollModal() {
    toggleModal(2, 'hide')
    document.getElementById('confirm-roll-test').removeEventListener('click', attributeRollForm.confirmAttributeRoll);
    document.getElementById('cancel-roll-test').removeEventListener('click', attributeRollForm.closeAttributeRollModal);
    attributeRollForm.clearRollResultContainer();
    attributeRollForm.clearRollInputFields()
    return
  },

  watchRoll() {
    const confirmRollBtn = document.getElementById('confirm-roll-test')
    const cancelRollBtn = document.getElementById('cancel-roll-test')

    confirmRollBtn.addEventListener('click', attributeRollForm.confirmAttributeRoll)
    cancelRollBtn.addEventListener('click', attributeRollForm.closeAttributeRollModal)
  }
}

export const primaryAttributesUpgradeForm = {
  editStr: document.querySelector('input#edit-str'),
  editDex: document.querySelector('input#edit-dex'),
  editKi: document.querySelector('input#edit-ki'),
  editInt: document.querySelector('input#edit-int'),
  editRes: document.querySelector('input#edit-res'),
  availableAPContainer: document.getElementById('available-ap'),

  getEditValues() {
    return {
      editStrValue: Number(primaryAttributesUpgradeForm.editStr.value),
      editDexValue: Number(primaryAttributesUpgradeForm.editDex.value),
      editKiValue: Number(primaryAttributesUpgradeForm.editKi.value),
      editIntValue: Number(primaryAttributesUpgradeForm.editInt.value),
      editResValue: Number(primaryAttributesUpgradeForm.editRes.value),
    }
  },

  validateFields() {
    const { editStrValue,
      editDexValue,
      editKiValue,
      editIntValue,
      editResValue
    } = primaryAttributesUpgradeForm.getEditValues();

    if (!Number.isInteger(editStrValue) || editStrValue < 0 ||
      !Number.isInteger(editDexValue) || editDexValue < 0 ||
      !Number.isInteger(editKiValue) || editKiValue < 0 ||
      !Number.isInteger(editIntValue) || editIntValue < 0 ||
      !Number.isInteger(editResValue) || editResValue < 0) {
      throw new Error('Por favor, indique valores válidos. Números menores que zero não são permitidos.')
    }

    if (editStrValue + editDexValue + editKiValue + editIntValue + editResValue > handleChar.char.status[3].actual) {
      throw new Error('Pontos de Aptidão (P.A) insuficientes.')
    }

    return
  },

  clearFields() {
    primaryAttributesUpgradeForm.editStr.value = '';
    primaryAttributesUpgradeForm.editDex.value = '';
    primaryAttributesUpgradeForm.editKi.value = '';
    primaryAttributesUpgradeForm.editInt.value = '';
    primaryAttributesUpgradeForm.editRes.value = '';
    return
  },

  upgradePrimaryAttributes() {
    const { editStrValue,
      editDexValue,
      editKiValue,
      editIntValue,
      editResValue
    } = this.getEditValues();
    const totalPACost = editStrValue + editDexValue + editKiValue + editIntValue + editResValue;
    const attributeValues = [editStrValue, editDexValue, editKiValue, editIntValue, editResValue];

    for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
      handleChar.char.primaryAttributes[i].bonus += attributeValues[i]
    }

    handleChar.updateCharActualStatus('P.A', -totalPACost)
    return
  },

  confirmPrimaryAttributesUpgrade(e) {
    e.preventDefault()

    try {
      primaryAttributesUpgradeForm.validateFields()
      primaryAttributesUpgradeForm.upgradePrimaryAttributes()
      handleChar.updateCharMaxStatus('PV')
      handleChar.updateCharMaxStatus('Ki')
      handleChar.updateCharMaxStatus('Fôlego')
      handleChar.updateCharSecondaryAttributes()
      primaryAttributesUpgradeForm.clearFields()
      primaryAttributesUpgradeForm.closePrimaryAttributeUpgradeForm()
      App.reload()
      Toast.open('Atributos aprimorados com sucesso!')
    } catch (error) {
      Toast.open(error.message)
    }
  },

  closePrimaryAttributeUpgradeForm() {
    const attributeEditForm = document.getElementById('primary-attribute-edit-form')
    const cancelBtn = document.getElementById('cancel-attribute-upgrade')

    toggleModal(3, 'hide')
    attributeEditForm.removeEventListener('submit', primaryAttributesUpgradeForm.confirmPrimaryAttributesUpgrade);
    cancelBtn.removeEventListener('click', primaryAttributesUpgradeForm.closeModifyForm)
    primaryAttributesUpgradeForm.clearFields()
  },

  printAvailablePA() {
    const availablePAContainer = document.getElementById('available-ap');
    availablePAContainer.innerHTML = `P.A disponíveis: ${handleChar.char.status[3].actual}.`;
    return
  },

  watchPrimaryAttributeUpgrade() {
    primaryAttributesUpgradeForm.printAvailablePA()
    const attributeEditForm = document.getElementById('primary-attribute-edit-form')
    const cancelBtn = document.getElementById('cancel-attribute-upgrade')

    attributeEditForm.addEventListener('submit', primaryAttributesUpgradeForm.confirmPrimaryAttributesUpgrade)
    cancelBtn.addEventListener('click', primaryAttributesUpgradeForm.closePrimaryAttributeUpgradeForm)
  }
}

export const arbitraryAttributesModifyForm = {
  arbitraryAttributesForm: document.getElementById('arbitrary-attribute-form'),
  arbitraryStr: document.getElementById('arbitrary-str'),
  arbitraryDex: document.getElementById('arbitrary-dex'),
  arbitraryKi: document.getElementById('arbitrary-ki'),
  arbitraryInt: document.getElementById('arbitrary-int'),
  arbitraryRes: document.getElementById('arbitrary-res'),
  arbitraryBaseAtk: document.getElementById('arbitrary-base-atk'),
  arbitraryBaseDef: document.getElementById('arbitrary-base-def'),
  arbitrarySpAtk: document.getElementById('arbitrary-sp-atk'),
  arbitrarySpDef: document.getElementById('arbitrary-sp-def'),

  getValues() {
    return {
      arbitraryStr: Number(arbitraryAttributesModifyForm.arbitraryStr.value),
      arbitraryDex: Number(arbitraryAttributesModifyForm.arbitraryDex.value),
      arbitraryKi: Number(arbitraryAttributesModifyForm.arbitraryKi.value),
      arbitraryInt: Number(arbitraryAttributesModifyForm.arbitraryInt.value),
      arbitraryRes: Number(arbitraryAttributesModifyForm.arbitraryRes.value),
      arbitraryBaseAtk: Number(arbitraryAttributesModifyForm.arbitraryBaseAtk.value),
      arbitraryBaseDef: Number(arbitraryAttributesModifyForm.arbitraryBaseDef.value),
      arbitrarySpAtk: Number(arbitraryAttributesModifyForm.arbitrarySpAtk.value),
      arbitrarySpDef: Number(arbitraryAttributesModifyForm.arbitrarySpDef.value),
    }
  },

  validateArbitraryAttributesModify() {
    const { arbitraryStr, arbitraryDex, arbitraryKi, arbitraryInt, arbitraryRes, arbitraryBaseAtk, arbitraryBaseDef, arbitrarySpAtk, arbitrarySpDef } = arbitraryAttributesModifyForm.getValues()

    if (!Number.isInteger(arbitraryStr) ||
      !Number.isInteger(arbitraryDex) ||
      !Number.isInteger(arbitraryKi) ||
      !Number.isInteger(arbitraryInt) ||
      !Number.isInteger(arbitraryRes) ||
      !Number.isInteger(arbitraryBaseAtk) ||
      !Number.isInteger(arbitraryBaseDef) ||
      !Number.isInteger(arbitrarySpAtk) ||
      !Number.isInteger(arbitrarySpDef)
    ) { throw new Error('Por favor, indique valores válidos. Use o sinal de menos (-) para valores negativos.') }
  },

  modifyArbitraryAttributes() {
    const { arbitraryStr, arbitraryDex, arbitraryKi, arbitraryInt, arbitraryRes, arbitraryBaseAtk, arbitraryBaseDef, arbitrarySpAtk, arbitrarySpDef } = arbitraryAttributesModifyForm.getValues();
    const arbitraryPrimaryAttributes = [arbitraryStr, arbitraryDex, arbitraryKi, arbitraryInt, arbitraryRes];
    const arbitrarySecondaryAttributes = [arbitraryBaseAtk, arbitraryBaseDef, arbitrarySpAtk, arbitrarySpDef];

    for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
      handleChar.char.primaryAttributes[i].arbitrary += arbitraryPrimaryAttributes[i]
    }

    for (let i = 0; i < handleChar.char.secondaryAttributes.length; i++) {
      handleChar.char.secondaryAttributes[i].arbitrary += arbitrarySecondaryAttributes[i]
    }

    return
  },

  confirmArbitraryAttributesModify(e) {
    e.preventDefault()

    try {
      arbitraryAttributesModifyForm.validateArbitraryAttributesModify()
      arbitraryAttributesModifyForm.modifyArbitraryAttributes()
      handleChar.updateCharMaxStatus('PV')
      handleChar.updateCharMaxStatus('Ki')
      handleChar.updateCharMaxStatus('Fôlego')
      handleChar.updateCharSecondaryAttributes()
      arbitraryAttributesModifyForm.closeArbitraryAttributesModifyForm()
      App.reload()
    } catch (error) {
      console.log(error)
    }

  },

  clearArbitraryAttributesFormFields() {
    arbitraryAttributesModifyForm.arbitraryStr.value = ''
    arbitraryAttributesModifyForm.arbitraryDex.value = ''
    arbitraryAttributesModifyForm.arbitraryKi.value = ''
    arbitraryAttributesModifyForm.arbitraryInt.value = ''
    arbitraryAttributesModifyForm.arbitraryRes.value = ''
    arbitraryAttributesModifyForm.arbitraryBaseAtk.value = ''
    arbitraryAttributesModifyForm.arbitraryBaseDef.value = ''
    arbitraryAttributesModifyForm.arbitrarySpAtk.value = ''
    arbitraryAttributesModifyForm.arbitrarySpDef.value = ''
  },

  closeArbitraryAttributesModifyForm() {
    const confirmBtn = document.getElementById('confirm-arbitrary-attribute-modify')
    const cancelBtn = document.getElementById('cancel-arbitrary-attribute-modify')

    toggleModal(4, 'hide')
    confirmBtn.removeEventListener('click', arbitraryAttributesModifyForm.confirmArbitraryAttributesModify)
    cancelBtn.removeEventListener('click', arbitraryAttributesModifyForm.closeArbitraryAttributesForm)
    arbitraryAttributesModifyForm.clearArbitraryAttributesFormFields()
  },

  watchArbitraryAttributeModify() {
    const confirmBtn = document.getElementById('confirm-arbitrary-attribute-modify');
    const cancelBtn = document.getElementById('cancel-arbitrary-attribute-modify');

    confirmBtn.addEventListener('click', arbitraryAttributesModifyForm.confirmArbitraryAttributesModify);
    cancelBtn.addEventListener('click', arbitraryAttributesModifyForm.closeArbitraryAttributesModifyForm);
    return
  }
}

export const statusModifyForm = {
  radios: document.getElementsByName('status-to-modify'),
  valueToModify: document.getElementById('modify-value'),

  getValues() {
    let status = '';
    const value = statusModifyForm.valueToModify.value;

    for (let i = 0; i < statusModifyForm.radios.length; i++) {
      if (statusModifyForm.radios[i].checked) {
        status = statusModifyForm.radios[i].value;
        break
      }
    }


    return {
      status: status,
      value: Number(value),
    }
  },

  modifyStatus() {
    const { status, value } = statusModifyForm.getValues();
    handleChar.updateCharActualStatus(status, value);
    return
  },

  validateStatusModify() {
    const { value } = statusModifyForm.getValues();

    if (!Number.isInteger(value)) {
      throw new Error('Por favor, indique um valor válido.')
    }
  },

  confirmStatusModify(e) {
    e.preventDefault()

    try {
      statusModifyForm.validateStatusModify()
      statusModifyForm.modifyStatus()
      statusModifyForm.closeStatusModifyForm()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  clearFields() {
    statusModifyForm.valueToModify.value = ''
  },

  closeStatusModifyForm() {
    const confirmBtn = document.getElementById('confirm-status-modify')
    const cancelBtn = document.getElementById('cancel-status-modify')

    toggleModal(5, 'hide')
    confirmBtn.removeEventListener('click', statusModifyForm.confirmStatusModify)
    cancelBtn.removeEventListener('click', statusModifyForm.closeStatusModifyForm)
    statusModifyForm.clearFields()
  },

  watchStatusModify() {
    const confirmBtn = document.getElementById('confirm-status-modify')
    const cancelBtn = document.getElementById('cancel-status-modify')

    confirmBtn.addEventListener('click', statusModifyForm.confirmStatusModify)
    cancelBtn.addEventListener('click', statusModifyForm.closeStatusModifyForm)
  }
}

export const addItemForm = {
  itemName: document.getElementById('item-name'),
  itemType: document.getElementById('item-type'),
  itemRarity: document.getElementById('item-rarity'),

  getItemInfo() {
    return {
      name: addItemForm.itemName.value,
      type: addItemForm.itemType.value,
      rarity: addItemForm.itemRarity.value
    }
  },

  validateItem() {
    const { name, type, rarity } = this.getItemInfo();

    if (name.replace(/\s/g, "") == '' ||
      type.replace(/\s/g, "") == '' ||
      rarity.replace(/\s/g, "") == '') {
      throw new Error('Por favor, preencha todos os campos.')
    }

    return
  },

  clearFields() {
    addItemForm.itemName.value = '';
    addItemForm.itemRarity.value = '';
    addItemForm.itemType.value = '';
    return
  },

  confirmItemAdd(e) {
    e.preventDefault()

    try {
      addItemForm.validateItem()
      handleChar.addCharItem(addItemForm.getItemInfo())
      addItemForm.closeAddItemForm()
      App.reload()
      Toast.open('Item adicionado com sucesso!')
    } catch (error) {
      Toast.open(error.message)
    }
  },

  closeAddItemForm() {
    const confirmBtn = document.getElementById('confirm-add-item');
    const cancelBtn = document.getElementById('cancel-add-item');

    toggleModal(6, 'hide')
    cancelBtn.removeEventListener('click', addItemForm.closeAddItemForm)
    confirmBtn.removeEventListener('click', addItemForm.confirmItemAdd)
    addItemForm.clearFields()
    return
  },

  watchItemAdd() {
    const confirmBtn = document.getElementById('confirm-add-item');
    const cancelBtn = document.getElementById('cancel-add-item');

    confirmBtn.addEventListener('click', addItemForm.confirmItemAdd)
    cancelBtn.addEventListener('click', addItemForm.closeAddItemForm)
  }
}

export const removeItemModal = {
  itemName: document.getElementById('item-to-remove'),

  validateItem() {
    if (removeItemModal.itemName.value.replace(/\s/g, '') == '') {
      throw new Error('Por favor, digite o nome do item que deseja remover.')
    }

    if (removeItemModal.checkItemIndex() == -1) {
      throw new Error('Você não possui este item.')
    }

    return
  },

  checkItemIndex() {
    let index = -1;

    for (let i = 0; i < handleChar.char.items.length; i++) {
      if (handleChar.char.items[i].name == removeItemModal.itemName.value) {
        index = i;
        break
      }
    }

    return index
  },

  clearFields() {
    removeItemModal.itemName.value = ''
    return
  },

  confirmItemRemove() {
    try {
      removeItemModal.validateItem()
      handleChar.removeCharItem(removeItemModal.checkItemIndex())
      removeItemModal.closeRemoveItemModal()
      App.reload()
      Toast.open('Item removido com sucesso!')
    } catch (error) {
      Toast.open(error.message)
    }
  },

  watchItemRemove() {
    const confirmBtn = document.getElementById('confirm-remove-item')
    const cancelBtn = document.getElementById('cancel-remove-item')

    confirmBtn.addEventListener('click', removeItemModal.confirmItemRemove)
    cancelBtn.addEventListener('click', removeItemModal.closeRemoveItemModal)
    return
  },

  closeRemoveItemModal() {
    const confirmBtn = document.getElementById('confirm-remove-item')
    const cancelBtn = document.getElementById('cancel-remove-item')

    toggleModal(7, 'hide')
    confirmBtn.removeEventListener('click', removeItemModal.confirmItemRemove)
    cancelBtn.removeEventListener('click', removeItemModal.closeRemoveItemModal)
    removeItemModal.clearFields()
    return
  }
}

export const timeChamberModal = {
  onFocusSkillName: '',
  onFocusSkillIndex: null,
  filterValue: null,

  validateCharacteristic() {
    const timeChamberItemsArray = timeChamberModal.getTimeChamberTargetArray();
    const targetCharCharacteristcArray = timeChamberModal.getCharTargetArray();

    if (timeChamberModal.onFocusSkillIndex == null && timeChamberModal.onFocusSkillName == '') {
      throw new Error('Por favor, selecione uma vantagem/desvantagem ou técnica.')
    }

    if (timeChamberItemsArray[timeChamberModal.onFocusSkillIndex].needCheck) {
      if (targetCharCharacteristcArray.indexOf(timeChamberModal.onFocusSkillName) != -1) {
        throw new Error(`Você já possui ${timeChamberModal.onFocusSkillName}.`)
      }
    }

    return
  },

  getFilterValue() {
    const filter = document.getElementById('filter');

    timeChamberModal.filterValue = filter.value;
    return
  },

  getTimeChamberTargetArray() {
    if (timeChamberModal.filterValue == 'advantages') {
      return timeChamberItems.advantages
    }

    if (timeChamberModal.filterValue == 'disadvantages') {
      return timeChamberItems.disadvantages
    }

    if (timeChamberModal.filterValue == 'techniques') {
      return timeChamberItems.techniques
    }
  },

  getCharTargetArray() {
    if (timeChamberModal.filterValue == 'advantages') {
      return handleChar.char.advantages
    }

    if (timeChamberModal.filterValue == 'disadvantages') {
      return handleChar.char.disadvantages
    }

    if (timeChamberModal.filterValue == 'techniques') {
      return handleChar.char.techniques
    }
  },

  filterCharacteristics() {
    timeChamberModal.getFilterValue()
    const timeChamberItemsArray = timeChamberModal.getTimeChamberTargetArray();

    timeChamberModal.clearCharacteristicsList()
    timeChamberModal.clearDescriptionContainer()

    timeChamberItemsArray.forEach((e, i) => {
      timeChamberModal.printCharacteristic(timeChamberModal.buildCharacteristicButton(e)
        , i)
    })

    timeChamberModal.watchDescription()
    return
  },

  buildCharacteristicButton(characteristic) {
    return `<button class="styled-button">${characteristic.name}</button>`
  },

  printCharacteristic(characteristic, index) {
    const characteristicsList = document.querySelector('ul.available-characteristics')

    const li = document.createElement('li');
    li.innerHTML = characteristic;
    li.dataset.index = index;
    li.setAttribute('name', 'characteristic');

    characteristicsList.appendChild(li)
    return
  },

  clearCharacteristicsList() {
    const characteristics = document.getElementsByName('characteristic');
    const characteristicsList = document.querySelector('ul.available-characteristics');

    if (characteristics.length) {
      for (let i = 0; i < characteristics.length; i++) {
        characteristics[i].removeEventListener('click', timeChamberModal.printDescription)
        characteristics[i].removeEventListener('click', timeChamberModal.updateOnFocusSkillInfo)
      }
    }

    characteristicsList.innerHTML = '';
    return
  },

  watchDescription() {
    const characteristics = document.getElementsByName('characteristic');

    for (let i = 0; i < characteristics.length; i++) {
      characteristics[i].addEventListener('click', timeChamberModal.printDescription)
      characteristics[i].addEventListener('click', timeChamberModal.updateOnFocusSkillInfo)
    }

    return
  },

  updateOnFocusSkillInfo(e) {
    const timeChamberItemsArray = timeChamberModal.getTimeChamberTargetArray();
    const index = e.currentTarget.dataset.index;
    const name = timeChamberItemsArray[index].name;

    timeChamberModal.onFocusSkillName = name;
    timeChamberModal.onFocusSkillIndex = index;

    return
  },

  printDescription(e) {
    const descriptionContainer = document.getElementById('characteristic-description');

    if (timeChamberModal.filterValue == 'advantages') {
      descriptionContainer.innerHTML = timeChamberItems.advantages[e.currentTarget.dataset.index].getDescription();
      return
    }

    if (timeChamberModal.filterValue == 'disadvantages') {
      descriptionContainer.innerHTML = timeChamberItems.disadvantages[e.currentTarget.dataset.index].getDescription();
      return
    }

    if (timeChamberModal.filterValue == 'techniques') {
      descriptionContainer.innerHTML = timeChamberItems.techniques[e.currentTarget.dataset.index].getDescription();
      return
    }
  },

  clearDescriptionContainer() {
    const descriptionContainer = document.getElementById('characteristic-description');
    descriptionContainer.innerHTML = '';
    return
  },

  closeTimeChamber() {
    const filterBtn = document.getElementById('apply-filter');
    const cancelBtn = document.getElementById('cancel-buy-characteristic');

    toggleModal(8, 'hide')
    timeChamberModal.clearCharacteristicsList()
    timeChamberModal.clearDescriptionContainer()
    filterBtn.removeEventListener('click', timeChamberModal.filterCharacteristics)
    cancelBtn.removeEventListener('click', timeChamberModal.closeTimeChamber)
    timeChamberModal.onFocusSkillName = '';
    timeChamberModal.onFocusSkillIndex = null;
    timeChamberModal.filterValue = null;
    return
  },

  buyCharacteristic() {
    const targetArray = timeChamberModal.getTimeChamberTargetArray();

    targetArray[timeChamberModal.onFocusSkillIndex].sideEffet()
    return
  },

  tryCharacteristicBuy() {
    try {
      timeChamberModal.validateCharacteristic()
      timeChamberModal.buyCharacteristic()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  watchCharacteristics() {
    const filterBtn = document.getElementById('apply-filter')
    const cancelBtn = document.getElementById('cancel-buy-characteristic');
    const confirmBtn = document.getElementById('confirm-buy-characteristic');

    filterBtn.addEventListener('click', timeChamberModal.filterCharacteristics)
    cancelBtn.addEventListener('click', timeChamberModal.closeTimeChamber)
    confirmBtn.addEventListener('click', timeChamberModal.tryCharacteristicBuy)

    return
  }
}

export const attributeRealocateModal = {
  getNewAttributeValues() {
    return {
      newStr: Number(document.getElementById('new-bonus-str').value),
      newDex: Number(document.getElementById('new-bonus-dex').value),
      newKi: Number(document.getElementById('new-bonus-ki').value),
      newInt: Number(document.getElementById('new-bonus-int').value),
      newRes: Number(document.getElementById('new-bonus-res').value),
    }
  },

  validateAttributeRealocate() {
    const { newStr, newDex, newKi, newInt, newRes } = attributeRealocateModal.getNewAttributeValues()

    if (newStr == '' &&
      newDex == '' &&
      newKi == '' &&
      newInt == '' &&
      newRes == '') {
      throw new Error('Por favor, digite valores válidos.')
    }

    if (!Number.isInteger(newStr) ||
      !Number.isInteger(newDex) ||
      !Number.isInteger(newKi) ||
      !Number.isInteger(newInt) ||
      !Number.isInteger(newRes)) {
      throw new Error('Por favor, digite valores válidos.')
    }

    if (newStr + handleChar.char.primaryAttributes[0].bonus + newDex + handleChar.char.primaryAttributes[1].bonus + newKi + handleChar.char.primaryAttributes[2].bonus + newInt + handleChar.char.primaryAttributes[3].bonus + newRes + handleChar.char.primaryAttributes[4].bonus != handleChar.char.primaryAttributes[0].bonus + handleChar.char.primaryAttributes[1].bonus + handleChar.char.primaryAttributes[2].bonus + handleChar.char.primaryAttributes[3].bonus + handleChar.char.primaryAttributes[4].bonus
    ) {
      throw new Error('Os total de pontos realocados não pode modificar o total original de pontos bônus.')
    }

    return
  },

  watchAttributeRealocate() {
    const confirmBtn = document.getElementById('confirm-attribute-realocate');
    const cancelBtn = document.getElementById('cancel-attribute-realocate');

    confirmBtn.addEventListener('click', attributeRealocateModal.confirmAttributeRealocate)
    cancelBtn.addEventListener('click', attributeRealocateModal.closeAttributeRealocateModal)
    return
  },

  closeAttributeRealocateModal() {
    const confirmBtn = document.getElementById('confirm-attribute-realocate');
    const cancelBtn = document.getElementById('cancel-attribute-realocate');

    toggleModal(11, 'hide')
    confirmBtn.removeEventListener('click', attributeRealocateModal.confirmAttributeRealocate)
    cancelBtn.removeEventListener('click', attributeRealocateModal.closeAttributeRealocateModal)
    attributeRealocateModal.clearFields()
  },

  updateCharBonusAttributes() {
    const { newStr, newDex, newKi, newInt, newRes } = attributeRealocateModal.getNewAttributeValues()
    const realocatedAttributes = [newStr, newDex, newKi, newInt, newRes];

    for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
      if (handleChar.char.primaryAttributes[i].bonus + realocatedAttributes[i] < 0) {
        handleChar.char.primaryAttributes[i].bonus = 0;
        return
      }

      handleChar.char.primaryAttributes[i].bonus += realocatedAttributes[i];
    }

    return
  },

  clearFields() {
    const newStr = document.getElementById('new-bonus-str');
    const newDex = document.getElementById('new-bonus-dex');
    const newKi = document.getElementById('new-bonus-ki');
    const newInt = document.getElementById('new-bonus-int');
    const newRes = document.getElementById('new-bonus-res');

    newStr.value = '';
    newDex.value = '';
    newKi.value = '';
    newInt.value = '';
    newRes.value = '';

    return
  },

  confirmAttributeRealocate(e) {
    e.preventDefault()

    try {
      attributeRealocateModal.validateAttributeRealocate()
      attributeRealocateModal.updateCharBonusAttributes()
      handleChar.updateCharMaxStatus('PV')
      handleChar.updateCharMaxStatus('Fôlego')
      handleChar.updateCharMaxStatus('Ki')
      handleChar.updateCharSecondaryAttributes()
      handleChar.updateCharActualStatus('P.A', -1)
      attributeRealocateModal.closeAttributeRealocateModal()
      timeChamberModal.closeTimeChamber()
      App.reload()
      Toast.open('Atributos realocados com sucesso!')
    } catch (error) {
      Toast.open(error.message)
    }
  }
}

export const characteristicRemoveModal = {
  getFilterValue() {
    return document.getElementById('characteristic-type').value
  },

  validateCharacteristicRemove() {
    const characteristicName = document.getElementById('characteristic-name').value;
    const targetArray = characteristicRemoveModal.getTargetArray()
    const targetRaceSpecArray = characteristicRemoveModal.getTargetRaceSpecArray();

    if (characteristicName.replace(/\s/g, "") == '') {
      throw new Error('Por favor, indique um nome válido.')
    }

    if (targetArray.indexOf(characteristicName) == -1) {
      throw new Error(`Você não possui ${characteristicName}.`)
    }

    if (characteristicRemoveModal.getFilterValue() != 'technique') {
      if (targetRaceSpecArray.indexOf(characteristicName) != -1) {
        throw new Error('Você não pode remover as características de sua raça.')
      }
    }

    return
  },

  closeCharacteristicRemoveModal() {
    const confirmBtn = document.getElementById('confirm-characteristic-remove');
    const cancelBtn = document.getElementById('cancel-characteristic-remove');

    toggleModal(9, 'hide')
    confirmBtn.removeEventListener('click', characteristicRemoveModal.confirmCharacteristicRemove)
    cancelBtn.removeEventListener('click', characteristicRemoveModal.closeCharacteristicRemoveModal)
    return
  },

  clearInput() {
    document.getElementById('characteristic-name').value = '';
    return
  },

  watchCharacteristicRemove() {
    const confirmBtn = document.getElementById('confirm-characteristic-remove')
    const cancelBtn = document.getElementById('cancel-characteristic-remove')

    confirmBtn.addEventListener('click', characteristicRemoveModal.confirmCharacteristicRemove)
    cancelBtn.addEventListener('click', characteristicRemoveModal.closeCharacteristicRemoveModal)
    return
  },

  getTargetArray() {
    if (characteristicRemoveModal.getFilterValue() == 'advantage') {
      return handleChar.char.advantages
    }

    if (characteristicRemoveModal.getFilterValue() == 'disadvantage') {
      return handleChar.char.disadvantages
    }

    if (characteristicRemoveModal.getFilterValue() == 'technique') {
      return handleChar.char.techniques
    }
  },

  getTargetTimeChamberArray() {
    if (characteristicRemoveModal.getFilterValue() == 'advantage') {
      return timeChamberItems.advantages
    }

    if (characteristicRemoveModal.getFilterValue() == 'disadvantage') {
      return timeChamberItems.disadvantages
    }

    if (characteristicRemoveModal.getFilterValue() == 'technique') {
      return timeChamberItems.techniques
    }
  },

  getTargetRaceSpecArray() {
    if (characteristicRemoveModal.getFilterValue() == 'advantage') {
      return charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].advantages
    }

    if (characteristicRemoveModal.getFilterValue() == 'disadvantage') {
      return charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].disadvantages
    }
  },

  removeCharacteristic() {
    const characteristicName = document.getElementById('characteristic-name').value;
    const targetArray = characteristicRemoveModal.getTargetArray();
    const characteristicIndex = targetArray.indexOf(characteristicName);

    targetArray.splice(characteristicIndex, 1);
    return
  },

  recoverApCost() {
    const characteristicName = document.getElementById('characteristic-name').value;
    const timeChamberArray = characteristicRemoveModal.getTargetTimeChamberArray();
    let cost = 0;

    if (characteristicName.includes('Código de Honra')) {
      const vote = characteristicName.replace(/\D/g, "");
      const voteIndex = handleChar.char.codeOfHonorVotes.indexOf(vote);

      handleChar.char.codeOfHonorVoteCount -= 1
      handleChar.char.codeOfHonorVotes.splice(voteIndex, 1)
      handleChar.updateCharActualStatus('P.A', -1)
      return
    }

    if (characteristicName.includes('Rivalidade')) {
      handleChar.updateCharActualStatus('P.A', 1)
      return
    }

    if (characteristicName.includes('Sentir Ki')) {
      characteristicName.includes('(Aguçado)')
        ? handleChar.updateCharActualStatus('P.A', 2)
        : handleChar.updateCharActualStatus('P.A', 1)
      return
    }

    for (let i = 0; i < timeChamberArray.length; i++) {

      if (timeChamberArray[i].name == characteristicName) {
        cost = timeChamberArray[i].cost || -timeChamberArray[i].bonus
        break
      }
    }

    handleChar.updateCharActualStatus('P.A', cost)
    return
  },

  confirmCharacteristicRemove() {
    try {
      characteristicRemoveModal.validateCharacteristicRemove()
      characteristicRemoveModal.recoverApCost()
      characteristicRemoveModal.removeCharacteristic()
      characteristicRemoveModal.closeCharacteristicRemoveModal()
      characteristicRemoveModal.clearInput()
      App.reload()
      Toast.open('Característica removida com sucesso! P.A gastos recuperados (ou descontados).')
    } catch (error) {
      console.log(error)
    }
  }
}
