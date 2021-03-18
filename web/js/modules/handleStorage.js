const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('rpg-marcao: char')) || null
  },

  set(char) {
    localStorage.setItem('rpg-marcao: char', JSON.stringify(char))
  }
}

export { Storage }
