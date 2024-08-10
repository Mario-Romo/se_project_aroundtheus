// export default class FormValidator {
// 	constructor(settings, formElement) {
// 		this._inputSelector = settings.inputSelector;
// 		this._submitButtonSelector = settings.submitButtonSelector;
// 		this._inactiveButtonClass = settings.inactiveButtonClass;
// 		this._inputErrorClass = settings.inputErrorClass;
// 		this._errorClass = settings.errorClass;
// 		this._form = formElement;
// 	}

// 	_showInputError(inputElement) {
// 		const errorMessageElement = this._form.querySelector(
// 			`#${inputElement.id}-error`
// 		);
// 		inputElement.classList.add(this._inputErrorClass);
// 		errorMessageElement.textContent = inputElement.validationMessage;
// 		errorMessageElement.classList.add(this._errorClass);
// 	}

// 	_toggleButtonState() {
// 		let foundInvalid = false;
// 		this._inputElements.forEach((inputElement) => {
// 			if (!inputElement.validity.valid) {
// 				foundInvalid = true;
// 			}
// 		});
// 		if (foundInvalid) {
// 			this._submitButton.classList.add(this._inactiveButtonClass);
// 			this._submitButton.disabled = true;
// 		} else {
// 			this._submitButton.classList.remove(this._inactiveButtonClass);
// 			this._submitButton.disabled = false;
// 		}
// 	}

// 	_checkInputValidity(inputElement) {
// 		if (!inputElement.validity.valid) {
// 			showInputError(inputElement);
// 		} else {
// 			hideInputError(inputElement);
// 		}
// 	}

// 	_setEventListeners() {
// 		this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
// 		this._submitButton = this._form.querySelector(this._submitButtonSelector);
// 		this._inputElements.forEach((inputElement) => {
// 			inputElement.addEventListener('input', (evt) => {
// 				checkInputValidity(inputElement);
// 				this._toggleButtonState();
// 			});
// 		});
// 	}

// 	// Notice this one is public, NOT private because is called up in editFormValidator.enableValidation();
// 	enableValidation() {
// 		this._form.addEventListener('submit', (evt) => {
// 			evt.preventDefault();
// 		});
// 		setEventListeners(formElement, options);
// 	}
// }
