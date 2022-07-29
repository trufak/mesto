import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor (popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach(inputElement => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  }

  setInputValues (values) {
    Object.keys(values).forEach(key => {
      const inputFind = Array.from(this._inputList).find(input => input.name === key);
      if (inputFind) inputFind.value = values[key];
    });
  }

  getFormElement () {
    return this._formElement;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    this._closeEventHandler = new Event('close');
  }

  close () {
    this._formElement.reset();
    this._formElement.dispatchEvent(this._closeEventHandler);
    super.close();
  }
}
