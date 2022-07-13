import { Popup, PopupCard } from "./Popup.js";

export default class Card {
  constructor (name, link, selectorTemplate) {
    this._name = name;
    this._link = link;
    this._selectorTemplate = selectorTemplate;
  }
   //Создание карточки
  getElement () {
    const cardElement = document
                  .querySelector(this._selectorTemplate)
                  .content
                  .querySelector('.elements__item')
                  .cloneNode(true);
    const cardMask = cardElement.querySelector('.element__mask')
    cardMask.src = this._link;
    cardMask.alt = this._name;
    cardElement.querySelector('.element__caption').textContent = this._name;
    this._popupCard = new PopupCard(this._name, this._link);
    this._setEventListener(cardElement);
    return cardElement;
  }
  //Установка слушателей
  _setEventListener (cardElement) {
    cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    cardElement.querySelector('.element__delete').addEventListener('click', (e) => {
      this._deleteCard(e, this._popupCard);
     });
    cardElement.querySelector('.element__mask').addEventListener('click', () => {
      this._popupCard.open();
     });
  }
  //Лайк карточки
  _likeCard (e) {
    e.target.classList.toggle('element__like_active');
  }
  //Удаление карточки
  _deleteCard (e, popup) {
    e.target.closest('.elements__item').remove();
    Popup.popupList.splice(Popup.popupList.indexOf(popup),1);
  };
}
