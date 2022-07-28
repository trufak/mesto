export default class Card {
  constructor (name, link, selectorTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }
   //Создание карточки
  getElement () {
    const cardElement = document
                  .querySelector(this._selectorTemplate)
                  .content
                  .querySelector('.elements__item')
                  .cloneNode(true);
    this._cardMask = cardElement.querySelector('.element__mask');
    this._cardMask.src = this._link;
    this._cardMask.alt = this._name;
    cardElement.querySelector('.element__caption').textContent = this._name;
    this._setEventListener(cardElement);
    return cardElement;
  }
  //Установка слушателей
  _setEventListener (cardElement) {
    cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    this._cardMask.addEventListener('click', () => {
      this._handleCardClick(this);
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
