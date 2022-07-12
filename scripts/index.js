import initialCards from './initial-cards.js';
import Card from './Card.js';

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
const popupEditProfileClose = popupEditProfile.querySelector('.close-button_popup');
//popup добавления карточки
const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = popupAddCard.querySelector('form[name=add]');
const popupNameCard = formAddCard.querySelector('.popup__input_name-card');
const popupLinkCard = formAddCard.querySelector('.popup__input_link-card');
const popupAddCardSubmit = formAddCard.querySelector('.popup__submit-button_add');
const popupAddCardClose = popupAddCard.querySelector('.close-button_popup');
//popup карточки
const popupCard = document.querySelector('.popup_card');
const popupCardClose = popupCard.querySelector('.close-button_popup');
const popupCardMask = popupCard.querySelector('.popup__mask');
const popupCardCaption = popupCard.querySelector('.popup__caption');

//Функции
//Загрузка карточек при старте страницы
const loadInitialCards = () => {
  initialCards.forEach (initData => {
    const cardElement = new Card(initData.name, initData.link, '#card');
    cardsContainer.append(cardElement.getElement());
  });
};

//Открыть popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};
//Закрыть popup
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};
//Открыть popup изменения профиля
const openPopupEditProfile = () => {
  clearErrors(formEditProfile, formValidSetting);
  popupNameProfile.value = nameProfile.textContent;
  popupDescProfile.value = descriptProfile.textContent;
  toggleButtonState(getInputList(formEditProfile,formValidSetting.inputSelector),popupEditProfileSubmit,formValidSetting.inactiveButtonClass);
  openPopup(popupEditProfile);
};
//Открыть popup добавления карточки
const openPopupAddCard = () => {
  clearErrors(formAddCard, formValidSetting);
  formAddCard.reset();
  popupAddCardSubmit.classList.add(formValidSetting.inactiveButtonClass);
  popupAddCardSubmit.disable = true;
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
  cardsContainer.prepend(createCard(popupNameCard.value, popupLinkCard.value))
  closePopup(popupAddCard);
};

//Загрузка изображения в popup карточки
const openImagePopup = (name, link) => {
  popupCardMask.src = link;
  popupCardMask.alt = name;
  popupCardCaption.textContent = name;
  openPopup(popupCard);
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
//Получить кнопку submit формы
const getSubmitButton = (formElement, submitButtonSelector) => {
  return formElement.querySelector(submitButtonSelector);
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
//Добавление валидации всем формам
enableValidation(formValidSetting);
//Добавление обработчиков закрытия popup
setEventListenerClosePopup();
