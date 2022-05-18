/*Переменные*/

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptProfile = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__info-edit-button');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('form[name=popup]');
const popupNameProfile = popup.querySelector('.popup__input_type_name');
const popupDescriptProfile = popup.querySelector('.popup__input_type_desc');
const closePopupButton = popup.querySelector('.popup__close-button');
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Функции*/
/*Загрузка карточек при старте страницы*/
function initialCardsLoad() {
  let card;
  initialCards.forEach (initData => {
    card = cardTemplate.querySelector('.element-shild').cloneNode(true);
    card.querySelector('.element__mask').src = initData.link;
    card.querySelector('.element__mask').alt = initData.name;
    card.querySelector('.element__caption').textContent = initData.name;
    elements.append(card);
  });
}
/*Открыть popup*/
function popupOpen() {
  popupNameProfile.value = nameProfile.textContent;
  popupDescriptProfile.value = descriptProfile.textContent;
  if (!popup.classList.contains('popup_opened'))
    popup.classList.add('popup_opened');
}
/*Закрыть popup*/
function popupClose () {
  if (popup.classList.contains('popup_opened'))
    popup.classList.remove('popup_opened');
}
/*Отправка формы*/
function popupFormSubmit (e) {
  e.preventDefault();
  nameProfile.textContent = popupNameProfile.value;
  descriptProfile.textContent = popupDescriptProfile.value;
  popupClose();
}

/*Обработчики событий
/*Обработчик события click на кнопке editButton*/
editButton.addEventListener ('click', popupOpen);
/*Обработчик события lick на кнопке closePopupButton*/
closePopupButton.addEventListener('click', popupClose);
/*Обработчик события отправки данных формы popupForm*/
popupForm.addEventListener('submit', popupFormSubmit);

/*Действия при загрузке страницы*/
initialCardsLoad();
