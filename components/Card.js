export default class Card {
	constructor(data, cardSelector, handleImageClick) {
		this._data = data;
		this._cardSelector = cardSelector;
		this._handleImageClick = handleImageClick;
	}


	_setEventListeners() {
	// 	// get '.card__like-button'
		this._cardElement
			.querySelector('.card__like-button')
			.addEventListener('click', () => {
				this._handleLikeIcon();
			});

	// 	// get '.card__delete-button'
	// 	this._cardElement
	// 		.querySelector('.card__delete-button')
	// 		.addEventListener('click', () => {
	// 			this._handleDeleteCard();
	// 		});
	// }

	// _handleDeleteCard() {
	// 	this._cardElement.remove();
	// 	this._cardElement = null;
	// }

	// _handleLikeIcon() {
	// 	this._cardElement
	// 		.querySelector('.card__like-button')
	// 		.classList.toggle('card__like-button_active');
	// }

	getView() {
		this._cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector('.card')
			.cloneNode(true);

		console.log(this._cardElement);
		// 	// get the card view
		// 	this._cardImageEl = document
		// 		.querySelector(this._cardSelector)
		// 		.content.queerySelector('.card__image');
		// 	// set event listeners
		this._setEventListeners();
		// 	// return the card
		// 	return this._cardElement;
	}
}