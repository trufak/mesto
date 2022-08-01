export default class Card {
  constructor (name, link, selectorTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }
   //Создание карточки
  getElement () {
    this._cardElement = document
                  .querySelector(this._selectorTemplate)
                  .content
                  .querySelector('.elements__item')
                  .cloneNode(true);
    this._cardMask = this._cardElement.querySelector('.element__mask');
    this._cardMask.src = this._link;
    this._cardMask.alt = this._name;
    this._cardElement.querySelector('.element__caption').textContent = this._name;
    this._likeElement = this._cardElement.querySelector('.element__like');
    this._deleteElement = this._cardElement.querySelector('.element__delete');
    this._setEventListener();
    return this._cardElement;
  }
  //Установка слушателей
  _setEventListener () {
    this._likeElement.addEventListener('click', this._likeCard.bind(this));
    this._deleteElement.addEventListener('click', this._deleteCard.bind(this));
    this._cardMask.addEventListener('click', () => {
      this._handleCardClick(this);
    });
  }
  //Лайк карточки
  _likeCard () {
    this._likeElement.classList.toggle('element__like_active');
  }
  //Удаление карточки
  _deleteCard () {
    this._cardElement.remove();
    this._cardElement = null;
  };
}
