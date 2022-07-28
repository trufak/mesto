import Popup from './Popup.js';


export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);
    this._maskElement = this._popupElement.querySelector('.popup__mask');
    this._captionElement = this._popupElement.querySelector('.popup__caption');
  }

  open (card) {
    this._maskElement.src = card._link;
    this._maskElement.alt = card._name;
    this._captionElement.textContent = card._name;
    super.open();
  }
}
