import { charCreationForm } from './modules/formAndModalHandlers.js';
import { Storage } from './modules/handleStorage.js'
import { handleChar } from './modules/handleChar.js'
import { Sheet } from './modules/handleHtmlSheet.js'
import { watchPlayerAction } from './modules/handleActionButtons.js'
import { toggleModal } from './modules/handleModals.js'

export const App = {
  init() {
    Storage.set(handleChar.char)

    if (handleChar.char == null) {
      toggleModal(0, 'show')
      charCreationForm.watchForm()
      return
    }

    toggleModal(0, 'hide')
    Sheet.initTable()
    watchPlayerAction()
    return
  },

  reload() {
    Sheet.clearTables()

    App.init()
  }
}

App.init()
