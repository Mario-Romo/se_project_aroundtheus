// declare function to display input error, notice object destruction in parameter for inputErrorClass & errorClass
function showInputError(
	formElement,
	inputElement,
	{ inputErrorClass, errorClass }
) {
	const errorMessageElement = formElement.querySelector(
		`#${inputElement.id}-error`
	);
	// add the class with the css styles
	inputElement.classList.add(inputErrorClass);
	errorMessageElement.textContent = inputElement.validationMessage;
	// fade message in/out
	errorMessageElement.classList.add(errorClass);
}

// declare function to hide input error, notice object destruction in parameter for inputErrorClass & errorClass
function hideInputError(
	formElement,
	inputElement,
	{ inputErrorClass, errorClass }
) {
	const errorMessageElement = formElement.querySelector(
		`#${inputElement.id}-error`
	);
	// remove the class with the css styles
	inputElement.classList.remove(inputErrorClass);
	errorMessageElement.textContent = '';
	// fade message in/out
	errorMessageElement.classList.remove(errorClass);
}

// declare function to check the actual validity of the input
function checkInputValidity(formElement, inputElement, options) {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, options);
	} else {
		hideInputError(formElement, inputElement, options);
	}
}

// declare function to toggle modal submit button
function toggleButtonState(
	inputElements,
	submitButton,
	{ inactiveButtonClass }
) {
	let foundInvalid = false;
	inputElements.forEach((inputElement) => {
		if (!inputElement.validity.valid) {
			foundInvalid = true;
		}
	});

	if (foundInvalid) {
		submitButton.classList.add(inactiveButtonClass);
		submitButton.disabled = true;
	} else {
		submitButton.classList.remove(inactiveButtonClass);
		submitButton.disabled = false;
	}
}

// declare function to set event listeners
function setEventListeners(formElement, options) {
	// use 'object desctruction' to create a variable
	const { inputSelector, submitButtonSelector } = options;
	// gather all input elements using ... to make it an array, works the same as Array.from
	const inputElements = [...formElement.querySelectorAll(inputSelector)];

	// reset modal submit button (this is hard coding it, avoid it)
	//const submitButton = formElement.querySelector('.modal__button');
	// instead use this to query submitButton using sumbitButtonSelector from options
	const submitButton = formElement.querySelector(submitButtonSelector);

	// --- DISABLE SUBMIT BUTTON UPON LOADING MODAL ---
	toggleButtonState(inputElements, submitButton, options);

	// iterate through each input element to capture when user inputs anything in the element
	inputElements.forEach((inputElement) => {
		inputElement.addEventListener('input', (evt) => {
			checkInputValidity(formElement, inputElement, options);
			// toggle the modal submit button
			toggleButtonState(inputElements, submitButton, options);
		});
	});
}

// enable validation by declaring enableValidation() & pass all the settings on call
function enableValidation(options) {
	// gather all forms using ... to make it an array, works the same as Array.from
	const formElements = [...document.querySelectorAll(options.formSelector)];
	// iterate through each form element
	formElements.forEach((formElement) => {
		// add event listener and set it to 'submit' event
		formElement.addEventListener('submit', (evt) => {
			//prevent submission upon load-up
			evt.preventDefault();
		});

		// invoke setEventListeners()
		setEventListeners(formElement, options);

		// look for all inputs inside the form
		// iterate through all the inputs to see if all are valid
		// if input is not valid
		// get validation message
		// add error class to input
		// display error message
		// disable button
		// if all inputs are valid
		// enable button
		// reset error messages
	});
}

const config = {
	formSelector: '.modal__form' /*.popup__form*/,
	inputSelector: '.modal__input' /*.popup__input*/,
	submitButtonSelector: '.modal__button' /*.popup__button*/,
	inactiveButtonClass: 'modal__button_disabled' /*popup__button_disabled*/,
	inputErrorClass: 'modal__input_type_error' /*popup__input_type_error*/,
	errorClass: 'modal__error_visible' /*popup__error_visible*/,
};

enableValidation(config);
