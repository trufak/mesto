import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../utils/FormValidator.js';
import formValidSetting from '../utils/formValidSetting.js';
import Section from '../components/Section.js';
import {
  nameProfile,
  descriptProfile,
  buttonOpenPopupProfile,
  buttonOpenPopupAddCard
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Создание объекта данных пользователя
const userInfo = new UserInfo(nameProfile, descriptProfile);
//Отправка формы редактирования профиля
const submitEditForm = (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.description)
  popupWithFormEditProfile.close();
};
//Отправка формы добавления карточки нового места
const submitAddForm = (inputValues) => {
  const card = new Card(
    inputValues.name,
    inputValues.link,
    '#card',
    popupWithImage.open.bind(popupWithImage));
  const cardElement = card.getElement();
  cardList.addItem(cardElement, false);
  popupWithFromAddCard.close();
};
//Создание объекта класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();
//Создание объектов класса PopupWithForm
const popupWithFormEditProfile = new PopupWithForm('.popup_edit-profile', submitEditForm);
popupWithFormEditProfile.setEventListeners();
const popupWithFromAddCard = new PopupWithForm('.popup_add-card', submitAddForm);
popupWithFromAddCard.setEventListeners();
//Добавление валидации форме редактирования профиля
const formValidatorEditProfile = new FormValidator(
  formValidSetting,
  popupWithFormEditProfile.getFormElement());
formValidatorEditProfile.enableValidation();
//Добавление валидации форме добавления карточки
const formValidatorAddCard = new FormValidator(
  formValidSetting,
  popupWithFromAddCard.getFormElement());
formValidatorAddCard.enableValidation();

//Создание объекта класса Section для обновления карточек на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(
        cardItem.name,
        cardItem.link,
        '#card',
        popupWithImage.open.bind(popupWithImage));
      const cardElement = card.getElement();
      cardList.addItem(cardElement, true);
    }
  },
  '.elements'
);
cardList.renderItems();

//Обработчики событий
//Обработчик события click на кнопке buttonOpenPopupProfile
buttonOpenPopupProfile.addEventListener ('click', () => {
  const data = userInfo.getUserInfo();
  popupWithFormEditProfile.setInputValues(data);
  popupWithFormEditProfile.open();
} );
//Обработчик события click на кнопке addButton
buttonOpenPopupAddCard.addEventListener ('click', () => {
  popupWithFromAddCard.open();
});



