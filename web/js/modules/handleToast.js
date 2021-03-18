export const Toast = {
  open(msg) {
    const toast = document.getElementById('warning-toast')
    const dismissBtn = document.querySelector('#warning-toast button')

    toast.firstElementChild.innerHTML = msg
    toast.classList.remove('hide')
    toast.classList.add('fadein')
    dismissBtn.addEventListener('click', this.close)
  },

  close() {
    const toast = document.getElementById('warning-toast')

    toast.classList.add('hide')
    toast.classList.remove('fadein')
    toast.removeEventListener('click', this.close)
  }
}
