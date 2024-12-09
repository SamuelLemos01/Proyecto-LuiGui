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

// Login y register

const formOpenBtn = document.querySelector("#form_open");
const home = document.querySelector(".home");
const formContainer = document.querySelector(".form_container");
const formCloseBtn = document.querySelector(".form_close");
const signupBtn = document.querySelector("#login");
const loginBtn = document.querySelector("#signup");
const pwShowHide = document.querySelectorAll(".ojo");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"))

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text"
            icon.classList.replace("ri-eye-off-line","ri-eye-line")
        } else {
            getPwInput.type = "password"
            icon.classList.replace("ri-eye-line","ri-eye-off-line")
        }
    })
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

