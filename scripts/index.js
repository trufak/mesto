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
function loadInitialCards() {
  initialCards.forEach (initData => {
    elements.append(createCard(initData.name, initData.link));
  });
}
//Создание карточки
function createCard (name, link) {
  const card = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardMask = card.querySelector('.element__mask')
  cardMask.src = link;
  cardMask.alt = name;
  card.querySelector('.element__caption').textContent = name;
  card.querySelector('.element__like').addEventListener('click', likeCard);
  card.querySelector('.element__delete').addEventListener('click', deleteCard);
  cardMask.addEventListener('click', openPopupCard);
  return card;
}
//Открыть popup
function openPopup (popup) {
  popup.classList.add('popup_opened');
}
//Закрыть popup
function closePopup (popup) {
  return function () {
    popup.classList.remove('popup_opened');
  }
}
//Открыть popup изменения профиля
function openPopupEditProfile () {
  popupNameProfile.value = nameProfile.textContent;
  popupDescProfile.value = descriptProfile.textContent;
  openPopup(popupEditProfile);
}
//Открыть popup добавления карточки
function openPopupAddCard () {
  popupNameCard.value = null;
  popupLinkCard.value = null;
  openPopup(popupAddCard);
}
//Отправка формы редактирования профиля
function editFormSubmit (e) {
  e.preventDefault();
  nameProfile.textContent = popupNameProfile.value;
  descriptProfile.textContent = popupDescProfile.value;
  const popup = e.target.parentElement.parentElement;
  closePopup(popup)();
}
//Отправка формы добавления карточки нового места
function addFormSubmit (e) {
  e.preventDefault();
  //Создание и добавление новой карточки
  elements.insertBefore(createCard(popupNameCard.value, popupLinkCard.value),
                                  elements.firstChild);
  //Закрытие popup
  const popup = e.target.parentElement.parentElement;
  closePopup(popup)();
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
  openImagePopup(e);
  openPopup(popupCard);
}

//Загрузка изображения в popup карточки
function openImagePopup(e) {
  popupCardMask.src = e.target.src;
  popupCardMask.alt = e.target.alt;
  popupCardCaption.textContent = e.target.alt;
}

//Обработчики событий
//Обработчик события click на кнопке editButton
editButton.addEventListener ('click', openPopupEditProfile);
//Обработчик события click на кнопке addButton
addButton.addEventListener ('click', openPopupAddCard);
//Обработчик события click при отправке формы edit-profile
formEditProfile.addEventListener('submit', editFormSubmit);
//Обработчик события click при отправке формы add-card
formAddCard.addEventListener('submit', addFormSubmit);
//Обработчик события click на кнопке closeButton на popup карточки
popupCardClose.addEventListener('click', closePopup(popupCard));
//Обработчик события click на кнопке closeButton на popup редактирования профиля
popupEditProfileClose.addEventListener('click', closePopup(popupEditProfile));
//Обработчик события click на кнопке closeButton на popup карточки
popupAddCardClose.addEventListener('click', closePopup(popupAddCard));

//Действия при загрузке страницы
//Добавление карточек
loadInitialCards();


