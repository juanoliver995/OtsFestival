const daysEl = document.querySelector('#days')
const hoursEl = document.querySelector('#hours')
const minsEl = document.querySelector('#mins')
const secondsEl = document.querySelector('#seconds')
const dateFestival = "Sep 21 2022";

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})

function iniciarApp() {
    crearGaleria();
    scrollNav();
    countDown();
    setInterval(countDown, 1000);
    navFixed();
}

function scrollNav() {
    const links = document.querySelectorAll('.navegacion-principal a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const linkId = e.target.attributes.href.value;
            const seccion = document.querySelector(linkId);

            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-nft")

    for (let i = 1; i <= 24; i++) {
        const nft = document.createElement('picture')
        nft.innerHTML = `
            <source srcset="build/img/CryptoFluffs/${i}.avif" type="image/avif">
            <source srcset="build/img/CryptoFluffs/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/CryptoFluffs/${i}.jpg" alt="galeria de nfts">`
        nft.onclick = function () {
            modalNft(i);
        }
        galeria.appendChild(nft);
    }

}

function modalNft(id) {
    const nft = document.createElement('picture')
    nft.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="galeria de nfts">`

    const overlay = document.createElement('div');
    overlay.appendChild(nft);
    overlay.classList.add("overlay");
    overlay.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fixed-body")
        overlay.remove();
    }

    const closeModal = document.createElement('p')
    closeModal.textContent = "X";
    closeModal.classList.add('btn-close');
    closeModal.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fixed-body")
        overlay.remove();
    }
    overlay.appendChild(closeModal)


    const body = document.querySelector("body");
    body.appendChild(overlay)
    body.classList.add("fixed-body")

}

function countDown() {
    const newDate = new Date(dateFestival);
    const currentDate = new Date();
    const totalSeconds = (newDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

function navFixed() {
    const nav = document.querySelector('.header');
    const showNav = document.querySelector('.festival-info')
    const body = document.querySelector('body');
    window.addEventListener('scroll', function () {
        if (showNav.getBoundingClientRect().bottom < 0) {
            nav.classList.add('fixed')
            body.classList.add('scroll-body')
        } else {
            nav.classList.remove('fixed')
            body.classList.remove('scroll-body')
        }
    })
}