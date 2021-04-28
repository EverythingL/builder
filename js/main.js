
let galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 0,
    slidesPerView: 4,
    loop: false,
    freeMode: false,
    loopedSlides: 0, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});
let galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: false,
    loopedSlides: 0, //looped slides should be the same
    navigation: {
        nextEl: '.our-works-swiper-button-next',
        prevEl: '.our-works-swiper-button-prev',
    },
    pagination: {
        el: '.our-works-swiper-pagination'
    },
    thumbs: {
        swiper: galleryThumbs,
    },
});


let swiper = new Swiper('.reviews-swiper-container', {
    cssMode: false,
    navigation: {
        nextEl: '.reviews-swiper-button-next',
        prevEl: '.reviews-swiper-button-prev',
    },
    pagination: {
        el: '.reviews-swiper-pagination'
    },
    mousewheel: false,
    keyboard: true,
});



const $ = (selector) => document.querySelector(selector);


// scroll smooth
const scrollLinks = document.querySelectorAll('a.scroll-link');

(function () {

    for (const scrollLink of scrollLinks) {
        scrollLink.addEventListener('click', (event) => {
            event.preventDefault();
            const id = scrollLink.getAttribute('href');
            $(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            scrollLink.classList.add('active-link');
        });
    }
})();


const headerBurger = document.querySelector('.header-burger');

const headerList = $('.header-list');

const body = $('body');


headerBurger.addEventListener('click', (event) => {
    // const target = event.target;
    headerList.classList.toggle('active');
    headerBurger.classList.toggle('active');
    body.classList.toggle('lock');
});