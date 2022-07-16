import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
import formValidSetting from './formValidSetting.js'

//Переменные
//Переменные для блока profile
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptProfile = profile.querySelector('.profile__subtitle');
const buttonOpenPopupProfile = profile.querySelector('.profile__info-edit-button');
const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button');
//Переменные для блока elements
const cardsContainer = document.querySelector('.elements');

//Переменные для блока popup
//popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = popupEditProfile.querySelector('form[name=edit]');
const popupNameProfile = formEditProfile.querySelector('.popup__input_name-profile');
const popupDescProfile = formEditProfile.querySelector('.popup__input_desc-profile');
const popupEditProfileSubmit = formEditProfile.querySelector('.popup__submit-button_edit');
//popup добавления карточки
const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = popupAddCard.querySelector('form[name=add]');
const popupNameCard = formAddCard.querySelector('.popup__input_name-card');
const popupLinkCard = formAddCard.querySelector('.popup__input_link-card');
const popupAddCardSubmit = formAddCard.querySelector('.popup__submit-button_add');
//popup карточки
const popupCard = document.querySelector('.popup_card');
const popupCardMask = popupCard.querySelector('.popup__mask');
const popupCardCaption = popupCard.querySelector('.popup__caption');

//Функции
//Загрузка изображения в popup карточки
const openImagePopup = (card) => {
  popupCardMask.src = card._link;
  popupCardMask.alt = card._name;
  popupCardCaption.textContent = card._name;
  openPopup(popupCard);
};
//Открыть popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};
//Загрузка карточек при старте страницы
const loadInitialCards = () => {
   initialCards.forEach (initData => {
    cardsContainer.append(createCard(initData.name, initData.link));
  });
};
const createCard = (name,link) => {
  const card = new Card(name, link, '#card', openImagePopup);
  return card.getElement();
};
//Закрыть popup
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};
//Открыть popup изменения профиля
const openPopupEditProfile = () => {
  popupNameProfile.value = nameProfile.textContent;
  popupDescProfile.value = descriptProfile.textContent;
  formValidatorEditProfile.clearErrors();
  openPopup(popupEditProfile);
};
//Открыть popup добавления карточки
const openPopupAddCard = () => {
  formAddCard.reset();
  formValidatorAddCard.clearErrors();
  openPopup(popupAddCard);
};
//Отправка формы редактирования профиля
const editFormSubmit = (e) => {
  e.preventDefault();
  nameProfile.textContent = popupNameProfile.value;
  descriptProfile.textContent = popupDescProfile.value;
  closePopup(popupEditProfile);
};
//Отправка формы добавления карточки нового места
const addFormSubmit = (e) => {
  e.preventDefault();
  cardsContainer.prepend(createCard(popupNameCard.value, popupLinkCard.value));
  closePopup(popupAddCard);
};
//Получить список popup
const getPopupList = () => {
  return Array.from(document.querySelectorAll('.popup'));
};
//Добавление всем popup слушателей закрытия
const setEventListenerClosePopup = () => {
  const popupList = getPopupList();
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('close-button'))
        closePopup(popup);
    });
  });
};
//Добавление popup слушателя закрытия по нажатию Esc
const closePopupEsc = (e) => {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//Обработчики событий
//Обработчик события click на кнопке buttonOpenPopupProfile
buttonOpenPopupProfile.addEventListener ('click', openPopupEditProfile);
//Обработчик события click на кнопке addButton
buttonOpenPopupAddCard.addEventListener ('click', openPopupAddCard);
//Обработчик события click при отправке формы edit-profile
formEditProfile.addEventListener('submit', editFormSubmit);
//Обработчик события click при отправке формы add-card
formAddCard.addEventListener('submit', addFormSubmit);
//Действия при загрузке страницы
//Добавление карточек
loadInitialCards();
//Добавление валидации форме редактирования профиля
const formValidatorEditProfile = new FormValidator(formValidSetting, formEditProfile);
formValidatorEditProfile.enableValidation();
//Добавление валидации форме добавления карточки
const formValidatorAddCard = new FormValidator(formValidSetting, formAddCard);
formValidatorAddCard.enableValidation();
//Добавление обработчиков закрытия popup
setEventListenerClosePopup();
