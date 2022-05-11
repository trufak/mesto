/*Переменные*/

let profile = document.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__title');
let descriptProfile = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__info-edit-button');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let popupNameProfile = popup.querySelector('.popup__input_title');
let popupDescriptProfile = popup.querySelector('.popup__input_subtitle');
let closePopupButton = popup.querySelector('.popup__close-button');

/*Функции*/
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

