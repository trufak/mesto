//Переменные
//Переменные для блока profile
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptProfile = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__info-edit-button');
const addButton = profile.querySelector('.profile__add-button');
//Переменные для блока elements
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

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
    elements.append(createCard(initData.name, initData.link));
  });
};
//Создание карточки
const createCard = (name, link) => {
  const card = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardMask = card.querySelector('.element__mask')
  cardMask.src = link;
  cardMask.alt = name;
  card.querySelector('.element__caption').textContent = name;
  card.querySelector('.element__like').addEventListener('click', likeCard);
  card.querySelector('.element__delete').addEventListener('click', deleteCard);
  cardMask.addEventListener('click', openImagePopup);
  return card;
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
  const form = getForm(popup);
  if (form) clearErrors(form, formValidSetting);
};
//Открыть popup изменения профиля
const openPopupEditProfile = () => {
  popupNameProfile.value = nameProfile.textContent;
  popupDescProfile.value = descriptProfile.textContent;
  toggleButtonState(getInputList(formEditProfile,formValidSetting.inputSelector),popupEditProfileSubmit,formValidSetting.inactiveButtonClass);
  openPopup(popupEditProfile);
};
//Открыть popup добавления карточки
const openPopupAddCard = () => {
  popupNameCard.value = null;
  popupLinkCard.value = null;
  popupAddCardSubmit.classList.add(formValidSetting.inactiveButtonClass);
  openPopup(popupAddCard);
};
//Отправка формы редактирования профиля
const editFormSubmit = (e) => {
  e.preventDefault();
  const submitButton = getSubmitButton (e.target, formValidSetting.submitButtonSelector);
  if (!submitButton.classList.contains('popup__submit-button_disable'))  {
    nameProfile.textContent = popupNameProfile.value;
    descriptProfile.textContent = popupDescProfile.value;
    closePopup(popupEditProfile);
  }
};
//Отправка формы добавления карточки нового места
const addFormSubmit = (e) => {
  e.preventDefault();
  const submitButton = getSubmitButton (e.target, formValidSetting.submitButtonSelector);
  if (!submitButton.classList.contains('popup__submit-button_disable'))  {
    elements.insertBefore(createCard(popupNameCard.value, popupLinkCard.value),
                                    elements.firstChild);
    closePopup(popupAddCard);
  }
};
//Изменение стилей cardLikeButtons при нажатии
const likeCard = (e) => {
  e.target.classList.toggle('element__like_active');
};
//Удаление карточки
const deleteCard = (e) => {
  e.target.parentElement.parentElement.remove();
};
//Загрузка изображения в popup карточки
const openImagePopup = (e) => {
  popupCardMask.src = e.target.src;
  popupCardMask.alt = e.target.alt;
  popupCardCaption.textContent = e.target.alt;
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
      if (e.target.classList.contains('popup') | e.target.classList.contains('close-button'))
        closePopup(popup);
    });
  });
};
//Добавление popup слушателя закрытия по нажатию Esc
const closePopupEsc = (e) => {
  if (e.key === 'Escape') {
    const popupList = getPopupList();
    popupList.forEach(popup => {
      if (popup.classList.contains('popup_opened'))
        closePopup(popup);
    });
  }
};
//Получить элемент формы popup
const getForm = (popup) => {
  return popup.querySelector(formValidSetting.formSelector);
};
//Получить массив полей формы
const getInputList = (formElement, inputSelector) => {
  return Array.from(formElement.querySelectorAll(inputSelector));
};
//Получить кнопку submit формы
const getSubmitButton = (formElement, submitButtonSelector) => {
  return formElement.querySelector(submitButtonSelector);
};

//Обработчики событий
//Обработчик события click на кнопке editButton
editButton.addEventListener ('click', openPopupEditProfile);
//Обработчик события click на кнопке addButton
addButton.addEventListener ('click', openPopupAddCard);
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
