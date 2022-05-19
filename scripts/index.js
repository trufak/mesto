/*Переменные*/

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptProfile = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__info-edit-button');
const addButton = profile.querySelector('.profile__add-button');
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
const popupTemplate = document.querySelector('#popup').content;
const inputTemplate = document.querySelector('#popup__input').content;
const formNames = {
  edit: 'edit',
  add: 'add'
};
const popupEditProfile = createPopup(formNames.edit);
const popupAddCard = createPopup(formNames.add);

/*Функции*/
/*Загрузка карточек при старте страницы*/
function initialCardsLoad() {
  let card;
  initialCards.forEach (initData => {
    card = cardTemplate.querySelector('.elements__item').cloneNode(true);
    card.querySelector('.element__mask').src = initData.link;
    card.querySelector('.element__mask').alt = initData.name;
    card.querySelector('.element__caption').textContent = initData.name;
    elements.append(card);
  });
}
/*Создать popup*/
function createPopup(formName) {
  /*Определение переменных для формирования popup*/
  let title;
  let buttonCaption;
  let valueInputs=[];
  let submitCallBack;
  switch (formName) {
    case formNames.edit:
      title = 'Редактировать профиль';
      buttonCaption = 'Сохранить';
      valueInputs.push(
        {value: nameProfile.textContent},
        {value: descriptProfile.textContent});
      submitCallBack = editFormSubmit;
      break;
    case formNames.add:
      title = 'Новое место';
      buttonCaption = 'Создать';
      valueInputs.push(
        {placeHolder: 'Название'},
        {placeHolder: 'Ссылка на картинку'});
      submitCallBack = addFormSubmit;
      break;
  }
  /*Копирование popup*/
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  /*Запись title popup*/
  popup.querySelector('.popup__title').textContent = title;
  /*Запись имени формы*/
  popup.querySelector('form').name = formName;
  /*Запись значений и placeholder полей ввода*/
  const inputs = popup.querySelector('.popup__inputs');
  let input;
  if (valueInputs) {
    valueInputs.forEach(valueInput => {
      input = inputTemplate.querySelector('.inputs__item').cloneNode(true);
      if (valueInput.value) input.querySelector('.popup__input').value = valueInput.value;
      if (valueInput.placeHolder) input.querySelector('.popup__input').placeholder = valueInput.placeHolder;
      inputs.append(input);
    });
  }

  /*Запись подписи кнопки submit*/
  popup.querySelector('.popup__submit-button').textContent = buttonCaption;
  /*Добавление обработчика события click на кнопке submit-button*/
  popup.querySelector('.popup__submit-button').addEventListener('click', submitCallBack);
  /*Добавление обработчика события click на кнопке close-button*/
  popup.querySelector('.popup__close-button').addEventListener('click', popupClose);
  return popup;
}
/*Открыть popup*/
function popupOpen(e) {
  let popup;
  if (e.target === editButton) popup = popupEditProfile;
  if (e.target === addButton) popup = popupAddCard;
  if (!popup.classList.contains('popup_opened'))
    popup.classList.add('popup_opened');
}
/*Закрыть popup*/
function popupClose (e) {
  const popup = e.target.parentElement.parentElement;
  if (popup.classList.contains('popup_opened'))
    popup.classList.remove('popup_opened');
}
/*Отправка формы редактирования профиля*/
function editFormSubmit (e) {
  e.preventDefault();
  nameProfile.textContent = popupNameProfile.value;
  descriptProfile.textContent = popupDescriptProfile.value;
  popupClose();
}
/*Отправка формы добавления нового места*/
function addFormSubmit (e) {

}

/*Обработчики событий
/*Обработчик события click на кнопке editButton*/
editButton.addEventListener ('click', popupOpen);
/*Обработчик события click на кнопке addButton*/
addButton.addEventListener ('click', popupOpen);

/*Действия при загрузке страницы*/
/*Добавление карточек*/
initialCardsLoad();
/*Добавление popup редактирования профиля*/
document.body.append(popupEditProfile);
/*Добавление popup добавления карточки нового места*/
document.body.append(popupAddCard);
