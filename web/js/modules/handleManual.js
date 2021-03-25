const openBtn = document.getElementById('open-modal')
const closeBtn = document.getElementById('close-modal')

const handleModal = {
  modal: document.querySelector('div.overlay'),
  sectionsNav: document.getElementById('page-sections'),

  open() {
    handleModal.modal.classList.toggle('hide')
    openBtn.removeEventListener('click', handleModal.open)
    closeBtn.addEventListener('click', handleModal.close)

    handleModal.sectionsNav.addEventListener('click', handleModal.close)
  },

  close() {
    handleModal.modal.classList.toggle('hide')
    openBtn.addEventListener('click', handleModal.open)
    closeBtn.removeEventListener('click', handleModal.close)

    handleModal.sectionsNav.removeEventListener('click', handleModal.close)
  }
}

openBtn.addEventListener('click', handleModal.open)
