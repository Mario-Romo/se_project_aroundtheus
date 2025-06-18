import Popup from './Popup.js';

class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super({ popupSelector });
		this._popupForm = this._popupElement.querySelector('.modal__form');
		this._handleFormSubmit = handleFormSubmit;
	}

	_getInputValues() {
		// collects data from all input fields
		const inputs = this._popupForm.querySelectorAll('.modal__input');
		const inputObj = {};
		inputs.forEach((input) => {
			inputObj[input.name] = input.value;
		});
		// // and returns that data as an object
		return inputObj;
	}

	setEventListeners() {
		super.setEventListeners();
		// set event listener to call handleFormSubmit() method on the form upon 'submit' event
		this._popupForm.addEventListener('submit', (evt) => {
			//evt.preventDefault();
			this._handleFormSubmit(evt);
			super.close();
		});
	}
}

export default PopupWithForm;
