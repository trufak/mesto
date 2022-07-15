export default class FormValidator {
  constructor (formValidSetting, formElement) {
    this._formValidSetting = formValidSetting;
    this._formElement = formElement;
  }

  //Добавить валидацию форме
  enableValidation () {
    this._setEventListener();
  }
  //Очистка полей ошибок формы
  clearErrors = () => {
    const inputList = this._getInputList(this._formValidSetting.inputSelector);
    inputList.forEach(inputElement => {
      this._hideInputError (inputElement);
    });
  };

  //Добавление обработчиков всем полям формы
  _setEventListener = () => {
    const inputList = this._getInputList(this._formValidSetting.inputSelector);
    const buttonElement = this._formElement.querySelector(this._formValidSetting .submitButtonSelector);
    this._toggleButtonState (inputList, buttonElement, this._formValidSetting .inactiveButtonClass);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState (inputList, buttonElement, this._formValidSetting .inactiveButtonClass);
      });
    });
  }
  //Получить массив полей формы
  _getInputList (inputSelector) {
    return Array.from(this._formElement.querySelectorAll(inputSelector));
  }
  //Стилизация кнопки submit
  _toggleButtonState (inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._formValidSetting .inactiveButtonClass);
    }
    else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._formValidSetting .inactiveButtonClass);
    }
  }
  //Проверка всех полей формы
  _hasInvalidInput (inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  //Валидация поля
  _isValid (inputElement) {
    if (!inputElement.validity.valid)
      this._showInputError(inputElement, inputElement.validationMessage);
    else
      this._hideInputError(inputElement);
  }
  //Отображение сообщения об ошибке
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formValidSetting.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  //Скрытие сообщения об ошибке
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formValidSetting.inputErrorClass);
    errorElement.textContent = '';
  }
}




