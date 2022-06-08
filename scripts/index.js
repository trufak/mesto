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
const popupTemplate = document.querySelector('#popup').content;
const inputTemplate = document.querySelector('#popup__input').content;
const formNames = {
  edit: 'edit',
  add: 'add'
};
const popupEditProfile = createPopup(formNames.edit);
const popupNameProfile = popupEditProfile.querySelector('.popup__input_name-profile');
const popupDescProfile = popupEditProfile.querySelector('.popup__input_desc-profile');
const popupAddCard = createPopup(formNames.add);
const popupNameCard = popupAddCard.querySelector('.popup__input_name-card');
const popupLinkCard = popupAddCard.querySelector('.popup__input_link-card');
//Переменные для блока element-popup
const popupCard = document.querySelector('.element-popup');

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
//Создать popup
function createPopup(formName) {
  //Определение переменных для формирования popup
  let title;
  let buttonCaption;
  let valueInputs=[];
  let submitCallBack;
  switch (formName) {
    case formNames.edit:
      title = 'Редактировать профиль';
      buttonCaption = 'Сохранить';
      valueInputs.push(
        {
          class: 'popup__input_name-profile',
          value: nameProfile.textContent},
        {
          class: 'popup__input_desc-profile',
          value: descriptProfile.textContent});
      submitCallBack = editFormSubmit;
      break;
    case formNames.add:
      title = 'Новое место';
      buttonCaption = 'Создать';
      valueInputs.push(
        {
          class: 'popup__input_name-card',
          placeHolder: 'Название'},
        {
          class: 'popup__input_link-card',
          placeHolder: 'Ссылка на картинку'});
      submitCallBack = addFormSubmit;
      break;
  }
  //Копирование popup
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  //Запись title popup
  popup.querySelector('.popup__title').textContent = title;
  //Запись имени формы
  popup.querySelector('form').name = formName;
  //Запись значений и placeholder полей ввода
  const inputs = popup.querySelector('.popup__inputs');
  let input;
  if (valueInputs) {
    valueInputs.forEach(valueInput => {
      input = inputTemplate.querySelector('.inputs__item').cloneNode(true);
      input.querySelector('.popup__input').classList.add(valueInput.class);
      if (valueInput.value) input.querySelector('.popup__input').value = valueInput.value;
      if (valueInput.placeHolder) input.querySelector('.popup__input').placeholder = valueInput.placeHolder;
      inputs.append(input);
    });
  }

  //Запись подписи кнопки submit
  popup.querySelector('.popup__submit-button').textContent = buttonCaption;
  //Добавление обработчика события click на кнопке submit-button
  popup.querySelector('.popup__submit-button').addEventListener('click', submitCallBack);
  //Добавление обработчика события click на кнопке close-button
  popup.querySelector('.close-button_popup').addEventListener('click', closePopup);
  return popup;
}
//Открыть popup
function openPopup(e) {
  let popup;
  if (e.target === editButton) popup = popupEditProfile;
  if (e.target === addButton) popup = popupAddCard;
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
  popupNameCard.value = null;
  popupLinkCard.value = null;
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
//Обработчик события click на кнопке closeButton popup карточки
popupCard.querySelector('.close-button_popup').addEventListener('click', closePopupCard);

//Действия при загрузке страницы
//Добавление карточек
loadInitialCards();
//Добавление popup редактирования профиля
document.body.append(popupEditProfile);
//Добавление popup добавления карточки нового места
document.body.append(popupAddCard);

