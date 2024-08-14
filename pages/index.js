import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// initial card array
const initialCards = [
	{
		name: 'Yosemite Valley',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
	},
	{
		name: 'Lake Louise',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
	},
	{
		name: 'Bald Mountains',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
	},
	{
		name: 'Latemar',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
	},
	{
		name: 'Vanoise National Park',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
	},
	{
		name: 'Lago di Braies',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
	},
];

// settings for validation
const config = {
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'modal__error_visible',
};

// defines variable cardSelector as template from its id
const cardSelector = '#card-template';

/*------------------------ ELEMENTS ------------------------------*/
// Wrappers
const cardsWrap = document.querySelector('.cards__list');
const editProfileModal = document.querySelector('#edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const profileFormElement = editProfileModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');

// image modal variables:
const imageModal = document.querySelector('#image-modal');
const modalImageElement = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');

// Buttons and other DOM nodes
const profileEditButton = document.querySelector('#profile-edit-button');
const profileModalCloseButton = editProfileModal.querySelector('.modal__close');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
// transparent layer that contains all modals
const layerCloseModals = document.querySelectorAll('.modal');

const imageModalCloseButton = imageModal.querySelector('.modal__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addNewCardButton = document.querySelector('.profile__add-button');

const cardTemplate =
	document.querySelector('#card-template').content.firstElementChild;

// Form data
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector(
	'#profile-description-input'
);

const cardTitleInput = addCardFormElement.querySelector(
	'#add-card-title-input'
);
const cardUrlInput = addCardFormElement.querySelector(
	'#add-card-description-input'
);

//INSTANTIATE NEW FormValidator()
const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

/*------------------------ FUNCTIONS ------------------------------*/

// close modals using ESC key, notice how the function is later called on closeModal and openModal
function closeModalEsc(evt) {
	if (evt.key === 'Escape') {
		// we bring this const inside the if statement so we don't look everywhere in document thus saving memory
		const openedModal = document.querySelector('.modal_opened');
		closeModal(openedModal);
	}
}

function closeModal(modal) {
	modal.classList.remove('modal_opened');
	// apply closeModalEsc function
	document.removeEventListener('keydown', closeModalEsc);
}

function openModal(modal) {
	modal.classList.add('modal_opened');
	// apply closeModalEsc function
	document.addEventListener('keydown', closeModalEsc);
}

// specify two parameters name and link
function handleImageClick(cardData) {
	modalImageElement.src = cardData.link;
	modalCaption.textContent = cardData.name;
	// pass alt text attribute to modal image:
	modalImageElement.alt = cardData.name;
	// open imageModal using openModal function
	openModal(imageModal);
}

// create a card
function createCard(cardData, cardSelector, handleImageClick) {
	// create a card and return it rendered using getView()
	const card = new Card(cardData, cardSelector, handleImageClick);
	return card.getView();
}

// use createCard in renderCard
function renderCard(cardData, wrapper) {
	// use createCard to create a card element
	const cardElement = createCard(cardData, cardSelector, handleImageClick);
	wrapper.prepend(cardElement);
}

// iterate over initialCards array
const cardContainer = document.querySelector(cardSelector);
initialCards.forEach((cardData) => {
	renderCard(cardData, cardContainer);
});

// make x-button close modalImage
imageModalCloseButton.addEventListener('click', () => closeModal(imageModal));

// make transparent layer close all 3 modals by clicking on it
layerCloseModals.forEach((modal) => {
	modal.addEventListener('click', (evt) => {
		if (evt.target === modal) {
			closeModal(modal);
		}
	});
});

// 'one-stop' function to perform these tasks:
// function getCardElement(cardData) {
// 	//declare local const variables used in function:
// 	const cardElement = cardTemplate.cloneNode(true);
// 	const cardImageEl = cardElement.querySelector('.card__image');
// 	const cardTitleEl = cardElement.querySelector('.card__title');
// 	const likeButton = cardElement.querySelector('.card__like-button');
// 	const deleteButton = cardElement.querySelector('.card__delete-button');

// 	//add the event listener to the delete button:
// 	deleteButton.addEventListener('click', () => {
// 		cardElement.remove();
// 	});
// 	//add click listener to the cardImage element:
// 	cardImageEl.addEventListener('click', () => {
// 		// these two work w/their const to update image and caption text
// 		modalImageElement.src = cardData.link;
// 		modalCaption.textContent = cardData.name;
// 		// pass alt text attribute to image:
// 		modalImageElement.alt = cardData.name;
// 		// open imageModal using openModal function
// 		openModal(imageModal);
// 	});
// 	//add click listener to likeButton:
// 	likeButton.addEventListener('click', () => {
// 		likeButton.classList.toggle('card__like-button_active');
// 	});

// 	cardImageEl.src = cardData.link;
// 	cardImageEl.alt = cardData.name;
// 	cardTitleEl.textContent = cardData.name;

// 	return cardElement;
// }

/*------------------------ EVENT HANDLERS ------------------------------*/

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = profileTitleInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	closeModal(editProfileModal);
	// clear input fields after submit:
	// evt.target.reset();
}

// _________________
function handleAddCardFormSubmit(evt) {
	evt.preventDefault();
	const name = cardTitleInput.value;
	const link = cardUrlInput.value;
	renderCard({ name, link }, cardsWrap);
	closeModal(addCardModal);
	// clear input fields after submit:
	evt.target.reset();
	// disable submit button after clearing
	submitButtonSelector.disabled = true;
	submitButtonSelector.classList.add(inactiveButtonClass);
}

function toggleSubmitButtonState() {
	const isFormValid = cardTitleInput.value.trim() && cardUrlInput.value.trim();
	submitButtonSelector.disabled = !isFormValid;
	if (isFormValid) {
		submitButtonSelector.classList.remove(inactiveButtonClass);
	} else {
		submitButtonSelector.classList.add(inactiveButtonClass);
	}
}

/*------------------------ EVENT LISTENERS ------------------------------*/

// monitors whether inputs are empty or not to change the state of button
cardTitleInput.addEventListener('input', toggleSubmitButtonState);
cardUrlInput.addEventListener('input', toggleSubmitButtonState);
// ______________

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

profileEditButton.addEventListener('click', () => {
	profileTitleInput.value = profileTitle.textContent;
	profileDescriptionInput.value = profileDescription.textContent;
	openModal(editProfileModal);
});

profileModalCloseButton.addEventListener('click', () =>
	closeModal(editProfileModal)
);

//adds new card button
addNewCardButton.addEventListener('click', () => openModal(addCardModal));

addCardModalCloseButton.addEventListener('click', () =>
	closeModal(addCardModal)
);

// inserts a card
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
