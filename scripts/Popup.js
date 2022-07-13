import Card from "./Card.js";

export class Popup {
  constructor(selector){
    this.selector = selector;
    this._popupElement = document.querySelector(selector);
    this._closeButton = this._popupElement.querySelector('.close-button_popup');
    Popup.popupList.push(this);
  }
  static popupList = [];
  //Открыть popup
  open () {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', Popup._closeEsc);
  }
  //Закрыть popup
  _close () {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', Popup._closeEsc);
  }
  //Закрыть popup по нажатию Esc
  static _closeEsc (e) {
    if (e.key === 'Escape') {
      const popupOpened = Popup.popupList.find(popup => {
        return popup._popupElement.classList.contains('popup_opened');
      });
      popupOpened._close();
    }
  }
  //Установка слушателей событий
  _setEventListener () {
    this._popupElement.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('close-button'))
        this._close();
      });
  }
}

export class PopupEditProfile extends Popup{
  constructor () {
    super('.popup_edit-profile');
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._nameInputElement = this._formElement.querySelector('.popup__input_name-profile');
    this._nameProfileElement = document.querySelector('.profile__title');
    this._descInputElement = this._formElement.querySelector('.popup__input_desc-profile');
    this._descProfileElement = document.querySelector('.profile__subtitle');
    this._submitButton = this._formElement.querySelector('.popup__submit-button_edit');
    this._setEventListener();
  }

  //Открыть popup изменения профиля
  open () {
    //clearErrors(formEditProfile, formValidSetting);
    this._nameInputElement.value = this._nameProfileElement.textContent;
    this._descInputElement.value = this._descProfileElement.textContent;
    //toggleButtonState(getInputList(formEditProfile,formValidSetting.inputSelector),popupEditProfileSubmit,formValidSetting.inactiveButtonClass);
    super.open();
  }
  //Отправка формы редактирования профиля
  _submit (e, popup) {
    e.preventDefault();
    popup._nameProfileElement.textContent = popup._nameInputElement.value;
    popup._descProfileElement.textContent = popup._descInputElement.value;
    popup._close();
  }
  _setEventListener () {
    super._setEventListener();
    this._formElement.addEventListener('submit', (e) => {this._submit(e,this);});
  }
}

export class PopupAddCard extends Popup {
  constructor () {
    super('.popup_add-card');
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._nameInputElement = this._formElement.querySelector('.popup__input_name-card');
    this._linkInputElement = this._formElement.querySelector('.popup__input_link-card');
    this._submitButton = this._formElement.querySelector('.popup__submit-button_add');
    this._setEventListener();
  }

  //Открыть popup добавления карточки
  open () {
    //clearErrors(formAddCard, formValidSetting);
    this._formElement.reset();
    //this._submitButton.classList.add(formValidSetting.inactiveButtonClass);
    this._submitButton.disable = true;
    super.open();
  };

  //Отправка формы добавления карточки нового места
  _submit (e, popup) {
    e.preventDefault();
    const card = new Card(popup._nameInputElement.value, popup._linkInputElement.value, '#card');
    document.querySelector('.elements')
            .prepend(card.getElement());
    popup._close();
  };

  _setEventListener () {
    super._setEventListener();
    this._formElement.addEventListener('submit', (e) => {
      this._submit(e,this);
    });
  }
}

export class PopupCard extends Popup {
  constructor (name, link) {
    super('.popup_card');
    this._name = name;
    this._link = link;
    this._maskElement = this._popupElement.querySelector('.popup__mask');
    this._captionElement = this._popupElement.querySelector('.popup__caption');
    super._setEventListener();
  }

  //Загрузка изображения в popup карточки
  open () {
    this._maskElement.src = this._link;
    this._maskElement.alt = this._name;
    this._captionElement.textContent = this._name;
    super.open();
  };
}
