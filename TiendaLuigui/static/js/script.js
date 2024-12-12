// Menu
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.items-navbar');
let cerrarBtn = document.querySelector('.cerrar-icono');

menu.onclick = () => {
    navlist.classList.toggle('open');
}

cerrarBtn.onclick = () => {
    navlist.classList.remove('open');
}

window.onscroll = () => {
    navlist.classList.remove('open');
}

