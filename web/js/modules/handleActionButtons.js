import { toggleModal } from './handleModals.js'
import { arbitraryAttributesModifyForm, attributeRollForm, primaryAttributesUpgradeForm, statusModifyForm, addItemForm, removeItemModal, timeChamberModal, characteristicRemoveModal } from './formAndModalHandlers.js';
import { charDeleteModal } from './formAndModalHandlers.js'

export const watchPlayerAction = () => {
  document.getElementById('player-actions').addEventListener('click', e => {

    if (e.target == document.getElementById('char-delete')) {
      toggleModal(1, 'show')
      charDeleteModal.watchDelete()
      return
    }

    if (e.target == document.getElementById('char-roll-test')) {
      toggleModal(2, 'show')
      attributeRollForm.watchRoll()
      return
    }

    if (e.target == document.getElementById('char-attributes-modify')) {
      toggleModal(3, 'show')
      primaryAttributesUpgradeForm.watchPrimaryAttributeUpgrade()
      return
    }

    if (e.target == document.getElementById('char-arbitrary-attributes')) {
      toggleModal(4, 'show')
      arbitraryAttributesModifyForm.watchArbitraryAttributeModify()
      return
    }

    if (e.target == document.getElementById('char-status-modify')) {
      toggleModal(5, 'show')
      statusModifyForm.watchStatusModify()
      return
    }

    if (e.target == document.getElementById('char-add-item')) {
      toggleModal(6, 'show')
      addItemForm.watchItemAdd()
      return
    }

    if (e.target == document.getElementById('char-remove-item')) {
      toggleModal(7, 'show')
      removeItemModal.watchItemRemove()
      return
    }

    if (e.target == document.getElementById('open-time-chamber')) {
      toggleModal(8, 'show')
      timeChamberModal.watchCharacteristics()
      return
    }

    if (e.target == document.getElementById('char-remove-characteristic')) {
      toggleModal(9, 'show')
      characteristicRemoveModal.watchCharacteristicRemove()
      return
    }
  })
}
