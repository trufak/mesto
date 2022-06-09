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
const initialCards = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
];
//Переменные для блока popup
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNameProfile = popupEditProfile.querySelector('.popup__input_name-profile');
const popupDescProfile = popupEditProfile.querySelector('.popup__input_desc-profile');
const popupEditProfileSubmit = popupEditProfile.querySelector('.popup__submit-button_edit');
const popupEditProfileClose = popupEditProfile.querySelector('.close-button_popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupNameCard = popupAddCard.querySelector('.popup__input_name-card');
const popupLinkCard = popupAddCard.querySelector('.popup__input_link-card');
const popupAddCardSubmit = popupAddCard.querySelector('.popup__submit-button_add');
const popupAddCardClose = popupAddCard.querySelector('.close-button_popup');

//Переменные для блока element-popup
const popupCard = document.querySelector('.element-popup');
const popupCardClose = popupCard.querySelector('.close-button_popup');

//Функции
//Загрузка карточек при старте страницы
function loadInitialCards() {
  initialCards.forEach (initData => {
    elements.append(createCard(initData.name, initData.link));
  });
}
//Создание карточки
function createCard (name, link) {
  const card = cardTemplate.querySelector('.elements__item').cloneNode(true);
  card.querySelector('.element__mask').src = link;
  card.querySelector('.element__mask').alt = name;
  card.querySelector('.element__caption').textContent = name;
  card.querySelector('.element__like').addEventListener('click', likeCard);
  card.querySelector('.element__delete').addEventListener('click', deleteCard);
  card.querySelector('.element__mask').addEventListener('click', openPopupCard);
  return card;
}
//Открыть popup
function openPopup(e) {
  let popup;
  if (e.target === editButton)  {
    popup = popupEditProfile;
    popupNameProfile.value = nameProfile.textContent;
    popupDescProfile.value = descriptProfile.textContent;
  }
  if (e.target === addButton) {
    popup = popupAddCard;
    popupNameCard.value = null;
    popupLinkCard.value = null;
  }
  if (!popup.classList.contains('popup_opened'))
    popup.classList.add('popup_opened');
}
//Закрыть popup
function closePopup (e, popup) {
  if (!popup) popup = e.target.parentElement.parentElement;
  if (popup.classList.contains('popup_opened'))
    popup.classList.remove('popup_opened');
}
//Отправка формы редактирования профиля
function editFormSubmit (e) {
  e.preventDefault();
  nameProfile.textContent = popupNameProfile.value;
  descriptProfile.textContent = popupDescProfile.value;
  closePopup(e, e.target.parentElement.parentElement.parentElement);
}
//Отправка формы добавления карточки нового места
function addFormSubmit (e) {
  e.preventDefault();
  //Создание и добавление новой карточки
  elements.insertBefore(createCard(popupNameCard.value, popupLinkCard.value),
                                  elements.firstChild);
  //Закрытие popup
  closePopup(e, e.target.parentElement.parentElement.parentElement);
}
//Изменение стилей cardLikeButtons при нажатии
function likeCard(e) {
  e.target.classList.toggle('element__like_active');
}
//Удаление карточки
function deleteCard(e) {
  e.target.parentElement.parentElement.remove();
}
//Открытие popup карточки
function openPopupCard (e) {
  createPopupCard(e);
  if (!popupCard.classList.contains('element-popup_opened'))
    popupCard.classList.add('element-popup_opened');
}
//Закрытие и удаление popup карточки
function closePopupCard (e) {
  if (popupCard.classList.contains('element-popup_opened'))
  popupCard.classList.remove('element-popup_opened');
}
//Создать popup карточки
function createPopupCard(e) {
  popupCard.querySelector('.element-popup__mask').src = e.target.src;
  popupCard.querySelector('.element-popup__mask').alt = e.target.alt;
  popupCard.querySelector('.element-popup__caption').textContent = e.target.alt;
  return popupCard;
}

//Обработчики событий
//Обработчик события click на кнопке editButton
editButton.addEventListener ('click', openPopup);
//Обработчик события click на кнопке addButton
addButton.addEventListener ('click', openPopup);
//Обработчик события click при отправке формы edit-profile
popupEditProfileSubmit.addEventListener('click', editFormSubmit);
//Обработчик события click при отправке формы add-card
popupAddCardSubmit.addEventListener('click', addFormSubmit);
//Обработчик события click на кнопке closeButton на popup карточки
popupCardClose.addEventListener('click', closePopupCard);
//Обработчик события click на кнопке closeButton на popup редактирования профиля
popupEditProfileClose.addEventListener('click', closePopup);
//Обработчик события click на кнопке closeButton на popup карточки
popupAddCardClose.addEventListener('click', closePopup);

//Действия при загрузке страницы
//Добавление карточек
loadInitialCards();


