export default class Popup {
  constructor (popupSelector) {
    this._popupElement=document.querySelector(popupSelector);
    Popup.popupList.push(this);
  }

  static popupList = [];

  open () {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (e) {
    if (e.key === 'Escape') {
      const popupOpened = Popup.popupList.find(popup =>
        popup._popupElement.classList.contains('popup_opened')
      );
      popupOpened.close();
    }
  }

  setEventListeners () {
    this._popupElement.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('close-button'))
        this.close();
    });
  }
}
