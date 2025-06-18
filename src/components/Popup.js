export default class Popup {
	constructor({popupSelector}) {
		this._popupElement = document.querySelector(popupSelector);
		this._closeButton = this._popupElement.querySelector('.modal__close');
		// bind the handleEscClose method to preserve 'this' context:
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	// public method opens popup class
	open() {
		this._popupElement.classList.add('modal_opened');
		// apply closeModalEsc function
		document.addEventListener('keydown', this._handleEscClose);
	}
	// public method closes popup class
	close() {
		this._popupElement.classList.remove('modal_opened');
		// apply closeModalEsc function
		document.removeEventListener('keydown', this._handleEscClose);
	}
	
	// private method closes popup using Esc button (notice how it was 'binded' in constructor)
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	// public method sets event listeners method, adds a click event listener
	setEventListeners() {
		// set event listener to call the close() method on the closeButton
		this._closeButton.addEventListener('click', () => this.close());
		// make transparent layer close all 3 modals by clicking on it:
		this._popupElement.addEventListener('click', (evt) => {
			if (evt.target === this._popupElement) {
				this.close();
			}
		});
	}
}
