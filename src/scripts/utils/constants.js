//Переменные
//Переменные для блока profile
export const profile = document.querySelector('.profile');
export const nameProfile = profile.querySelector('.profile__title');
export const descriptProfile = profile.querySelector('.profile__subtitle');
export const buttonOpenPopupProfile = profile.querySelector('.profile__info-edit-button');
export const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button');
//Переменные для блока elements
export const cardsContainer = document.querySelector('.elements');

//Переменные для блока popup
//popup редактирования профиля
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('form[name=edit]');
export const popupNameProfile = formEditProfile.querySelector('.popup__input_name-profile');
export const popupDescProfile = formEditProfile.querySelector('.popup__input_desc-profile');
export const popupEditProfileSubmit = formEditProfile.querySelector('.popup__submit-button_edit');
//popup добавления карточки
export const popupAddCard = document.querySelector('.popup_add-card');
export const formAddCard = popupAddCard.querySelector('form[name=add]');
export const popupNameCard = formAddCard.querySelector('.popup__input_name-card');
export const popupLinkCard = formAddCard.querySelector('.popup__input_link-card');
export const popupAddCardSubmit = formAddCard.querySelector('.popup__submit-button_add');
//popup карточки
export const popupCard = document.querySelector('.popup_card');
export const popupCardMask = popupCard.querySelector('.popup__mask');
export const popupCardCaption = popupCard.querySelector('.popup__caption');
