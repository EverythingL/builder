// swiper script

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


// scroll smooth script

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




/// form script



document.addEventListener('DOMContentLoaded', () => {

    function formCheck() {
        const form = $('.form-body');
        form.addEventListener('submit', formSend);

        async function formSend(event) {
            event.preventDefault();

            let error = formValidate(form);

            let formData = new FormData(form);
            formData.append('image', formImage.files[0]);

            if (error === 0) {
                form.classList.add('_sending')
                form.classList.add('_sending');
                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    let result = await responce.json();
                    alert(result.message);
                    formPreview.innerHTML = '';
                    form.reset();
                    form.classLest.remove('_sending')
                } else {
                    alert('Error');
                    form.classLest.remove('_sending')
                }
            } else {
                alert('Complete the required fields');
            }
        }

        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('._req');

            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);

                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }

    }

    function modalCheck() {
        const contactButtonModal = document.querySelectorAll('.contact-button-modal');
        // const modalBody = $('.modal-body');
        const modal = $('.modal');
        // const modalClose = $('.modal-close');

        function openModal() {
            modal.classList.add('open');
            document.addEventListener('keydown', escapeHandler);
        }
        function closeModal() {
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
        }

        contactButtonModal.forEach(elem => {
            elem.addEventListener('click', () => {
                openModal();
            })
        })

        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal-close') ||
                target.classList.contains('open')) {
                closeModal();
            }
        })

        const escapeHandler = (event) => {
            if (event.keyCode === 27 || event.code === "Escape") {
                closeModal();
            }
        }
    }

    formCheck();
    modalCheck();

});