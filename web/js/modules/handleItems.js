import { App } from "../App.js"
import { handleChar } from "./handleChar.js"

export const handleCharItems = {
  addItem(item) {
    handleChar.char.push(item)
    App.reload()
  },

  removeItem(index) {
    handleChar.char.items.splice(index, 1)
    App.reload()
  }
}
