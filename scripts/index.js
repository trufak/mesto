import initialCards from './initial-cards.js';
import Card from './Card.js';
import { PopupEditProfile, PopupAddCard } from './Popup.js';

//Переменные
//Переменные для блока profile
const profile = document.querySelector('.profile');
const buttonOpenPopupProfile = profile.querySelector('.profile__info-edit-button');
const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button');
//Блок elements
const cardsContainer = document.querySelector('.elements');
//popup редактирования профиля
const popupEditProfile = new PopupEditProfile();
//popup добавления карточки
const popupAddCard = new PopupAddCard();

//Функции
//Загрузка карточек при старте страницы
const loadInitialCards = () => {
  initialCards.forEach (initData => {
    const cardElement = new Card(initData.name, initData.link, '#card');
    cardsContainer.append(cardElement.getElement());
  });
};

//Обработчики событий
//Обработчик события click на кнопке buttonOpenPopupProfile
buttonOpenPopupProfile.addEventListener ('click', () => {
  popupEditProfile.open();
});
//Обработчик события click на кнопке addButton
buttonOpenPopupAddCard.addEventListener ('click', () => {
  popupAddCard.open();
});
//Действия при загрузке страницы
//Добавление карточек
loadInitialCards();
//Добавление валидации всем формам
//enableValidation(formValidSetting);





