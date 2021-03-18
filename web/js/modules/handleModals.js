export const toggleModal = (index, hideOrShow) => {
  const overlays = document.getElementsByClassName('overlay')

  hideOrShow == 'show'
    ? overlays[index].classList.remove('hide')
    : overlays[index].classList.add('hide')
}
