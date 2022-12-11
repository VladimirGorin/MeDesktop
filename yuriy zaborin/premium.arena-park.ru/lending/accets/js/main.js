// Сразу создаём переменные
let navbar = document.getElementById('navbar').classList
let active_class = "navbar_scrolled"
let onclickPopup = document.getElementById('mobilePopup')

/**
 * Слушаем событие прокрутки
 */
window.addEventListener('scroll', e => {
  if(pageYOffset > 500) navbar.add(active_class)
  else navbar.remove(active_class)
})


function openMenu(){
    onclickPopup.style.display = 'flex'
    navbar.style.display = 'none'

}

function closeMenu(){
    onclickPopup.style.display = 'none'
    navbar.style.display = 'none'

}