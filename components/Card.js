export default class Card {
	constructor(cardData, cardSelector, handleImageClick) {
		this._name = cardData.name;
		this._link = cardData.link;
		this._cardSelector = cardSelector;
		this._handleImageClick = handleImageClick;

		// console.log(cardData.name);
	}

	// set event listeners for like, delete buttons and image
	_setEventListeners() {
		// get card like button
		this._cardElement
			.querySelector('.card__like-button')
			.addEventListener('click', () => {
				this._handleLikeIcon();
			});

		// get card delete button
		this._cardElement
			.querySelector('.card__delete-button')
			.addEventListener('click', () => {
				this._handleDeleteCard();
			});

		// get card image
		this._cardElement
			.querySelector('.card__image')
			.addEventListener('click', () => {
				this._handleImageClick({ link: this._link, name: this._name });
			});
	}

	// private methods for like and delete button handlers
	_handleLikeIcon() {
		this._cardElement
			.querySelector('.card__like-button')
			.classList.toggle('card__like-button_active');
	}

	_handleDeleteCard() {
		this._cardElement.remove();
		this._cardElement = null;
	}

	//public method to return card element with all corresponding data
	getView() {
		// clone the card template
		this._cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector('.card')
			.cloneNode(true);

		// populate the card with image and title with provided data
		this._cardElement.querySelector('.card__image').src = this._link;
		this._cardElement.querySelector('.card__image').alt = this._name;
		this._cardElement.querySelector('.card__title').textContent = this._name;

		// invoke event listeners
		this._setEventListeners();
		// render the card
		return this._cardElement;
	}
}
