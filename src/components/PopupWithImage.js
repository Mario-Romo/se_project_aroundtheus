import Popup from './Popup.js';

class PopupWithImage extends Popup {
	constructor({popupSelector}) {
		super({popupSelector});
		this._image = this._popupElement.querySelector('.popup__image');
		this._caption = this._popupElement.querySelector('.popup__caption');
		
	}

	// add an image to the popup, an image src and a caption for image
	// data should be an object containing the name and link parameters
	open(cardData) {
	// 	// set the image's name, src and alt text
		this._image.src = cardData.link;
		this._image.alt = cardData.name;
		this._caption.textContent = cardData.name;
		super.open();
		// 	// override the parent's open() method
	}

	setEventListeners() {
		// only needs parent class event
		super.setEventListeners();
	}
}

export default PopupWithImage;
