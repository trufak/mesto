//Объект настроек валидации
const formValidSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

//Функции валидации
//Отображение сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};
//Скрытие сообщения об ошибке
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};
//Валидация поля
const isValid = (formElement, inputElement, formValidSetting) => {
  if (!inputElement.validity.valid)
    showInputError(formElement, inputElement, inputElement.validationMessage, formValidSetting.inputErrorClass);
  else
    hideInputError(formElement, inputElement, formValidSetting.inputErrorClass);
};
//Добавление обработчиков всем полям формы
const setEventListener = (formElement, formValidSetting) => {
  const inputList = getInputList(formElement, formValidSetting.inputSelector);
  const buttonElement = getSubmitButton(formElement, formValidSetting.submitButtonSelector);
  toggleButtonState (inputList, buttonElement, formValidSetting.inactiveButtonClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, formValidSetting);
      toggleButtonState (inputList, buttonElement, formValidSetting.inactiveButtonClass);
    });
  });
};
//Проверка всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
//Стилизация кнопки submit
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
//Добавление валидации всем формам
const enableValidation = (formValidSetting) => {
  const formList = document.querySelectorAll(formValidSetting.formSelector);
  formList.forEach(formElement => {
    setEventListener(formElement, formValidSetting);
  });
};
//Очистка ошибок формы
const clearErrors = (formElement, formValidSetting) => {
  const inputList = getInputList(formElement, formValidSetting.inputSelector);
  inputList.forEach(inputElement => {
    hideInputError (formElement, inputElement, formValidSetting.inputErrorClass);
  });
};
//Получить массив полей формы
const getInputList = (formElement, inputSelector) => {
  return Array.from(formElement.querySelectorAll(inputSelector));
};
