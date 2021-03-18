import { handleForm } from './modules/handleCharCreationForm.js'
import { Storage } from './modules/handleStorage.js'
import { handleChar } from './modules/handleChar.js'
import { Sheet } from './modules/handleHtmlSheet.js'
import { watchClick } from './modules/handleActionButtons.js'
import { toggleModal } from './modules/handleModals.js'

export const App = {
  init() {
    Storage.set(handleChar.char)
    App.checkChar()
  },

  reload() {
    Sheet.clearTables()
    App.init()
  },

  checkChar() {
    if (handleChar.char == null) {
      toggleModal(0, 'show')
      handleForm.watchForm()
    } else {
      toggleModal(0, 'hide')
      Sheet.initTable()
      watchClick()
    }
  }
}

App.init()
