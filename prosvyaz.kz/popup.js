const img = document.getElementById('carousel');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');

// Images are from unsplash
let pictures = [

    // 'https://prosvyaz.kz/src/img/04.png',
    // 'https://prosvyaz.kz/src/img/03.png',
    // 'https://prosvyaz.kz/src/img/02.png',
    // 'https://prosvyaz.kz/src/img/01.png',
    // 'https://prosvyaz.kz/src/img/05.png',
    // 'https://prosvyaz.kz/src/img/06.png',
    // 'https://prosvyaz.kz/src/img/07.png',

];



// img.src = pictures[0];
let position = 0;

const moveRight = () => {
    if (position >= pictures.length - 1) {
        position = 0
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position + 1];
    position++;
}

const moveLeft = () => {
    if (position < 1) {
        position = pictures.length - 1;
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position - 1];
    position--;
}

rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);

//////////////////////close popup

let popupDyn = document.querySelector('.popup_dinamyc')
let popup = document.querySelector('.popup')

let closePopup = function () {
    popupDyn.style.visibility = 'hidden';
    popup.style.visibility = 'hidden';
    document.querySelector('body').style.overflow = '';

}

