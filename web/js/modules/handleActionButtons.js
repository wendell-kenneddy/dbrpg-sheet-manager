import { toggleModal } from './handleModals.js'
import { handleChar } from './handleChar.js'
import { attributeForm } from './handleAttributesModify.js'
import { rollForm } from './handleAttributeRollForm.js'
import { addItemForm } from './handleItemAddItemForm.js'
import { removeItemPrompt } from './handleItemRemove.js'
import { statusModifyForm } from './handleStatusModifyForm.js'
import { arbitraryAttributesForm } from './handleArbitraryAttributesForm.js';
import { timeChamber } from './handleTimeChamber.js'
import { handleCharacteristicRemove } from './handleCharacteristicRemove.js'

export const watchDelete = e => {
  const btnConfirm = document.getElementById('confirm-char-delete')
  const btnCancel = document.getElementById('cancel-char-delete')

  if (e.target == btnConfirm) {
    toggleModal(2, 'hide')
    handleChar.deleteChar()
    return
  }

  if (e.target == btnCancel) {
    toggleModal(2, 'hide')
    document.getElementById('dialogue-box').removeEventListener('click', watchDelete)
    return
  }
}

export const watchClick = () => {
  document.getElementById('player-actions').addEventListener('click', e => {

    if (e.target == document.getElementById('char-attributes-modify')) {
      toggleModal(1, 'show')
      attributeForm.watchModify()
      return
    }

    if (e.target == document.getElementById('char-delete')) {
      toggleModal(2, 'show')
      document.getElementById('dialogue-box').addEventListener('click', watchDelete)
      return
    }

    if (e.target == document.getElementById('char-roll-test')) {
      toggleModal(3, 'show')
      rollForm.watchRoll()
      return
    }

    if (e.target == document.getElementById('char-add-item')) {
      toggleModal(4, 'show')
      addItemForm.watchItemAdd()
      return
    }

    if (e.target == document.getElementById('char-remove-item')) {
      toggleModal(5, 'show')
      removeItemPrompt.watchRemove()
      return
    }

    if (e.target == document.getElementById('char-status-modify')) {
      toggleModal(6, 'show')
      statusModifyForm.watchStatusModify()
      return
    }

    if (e.target == document.getElementById('char-arbitrary-attributes')) {
      toggleModal(7, 'show')
      arbitraryAttributesForm.watchArbitraryModify()
      return
    }

    if (e.target == document.getElementById('open-time-chamber')) {
      toggleModal(8, 'show')
      timeChamber.watchCharacteristics()
      return
    }

    if (e.target == document.getElementById('char-remove-characteristic')) {
      toggleModal(11, 'show')
      handleCharacteristicRemove.watchCharacteristicRemove()
      return
    }
  })
}
