export default class Card {
  constructor (name, link, selectorTemplate, handleClickImage) {
    this._name = name;
    this._link = link;
    this._selectorTemplate = selectorTemplate;
    this._handleClickImage = handleClickImage;
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
    this._setEventListener(cardElement);
    return cardElement;
  }
  //Установка слушателей
  _setEventListener (cardElement) {
    cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    cardElement.querySelector('.element__mask').addEventListener('click', () => {
      this._handleClickImage(this);
    });
  }
  //Лайк карточки
  _likeCard (e) {
    e.target.classList.toggle('element__like_active');
  }
  //Удаление карточки
  _deleteCard (e) {
    e.target.closest('.elements__item').remove();
  };
}
