// This is a utility class that ONLY adds elements to the DOM
export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._renderedItems = items; // initialCards array
		this._renderer = renderer; // renderer is a function
		
		this._container = document.querySelector(containerSelector); // cardContainer
	}

	// 	// public method that renders all elements on the page, this method is called once on page load
	renderItems() {
		this._renderedItems.forEach((cardData) => {
			this._renderer(cardData);
		});
	}

	// 	// public method that takes a DOM element and adds it to the container by using the append() method
	// 	// this method is called when adding an individual card to the DOM
	addItem(cardElement) {
		this._container.prepend(cardElement);
	}
}
