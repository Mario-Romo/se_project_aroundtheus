/*------------------------ IMPORT MODULES ------------------------------*/
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForms.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

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

/*------------------------ CONSTANTS AND DOM ELEMENTS ------------------------------*/

const cardSelector = '#card-template';
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

//Instatiate new FormValidator()
const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

const userInfo = new UserInfo(profileTitle, profileDescription);

/*------------------------ FUNCTIONS ------------------------------*/

// close modals using ESC key, notice how the function is later called on closeModal and openModal
function closeModalEsc(evt) {
	if (evt.key === 'Escape') {
		// we bring this const inside the if statement so we don't look everywhere in document thus saving memory
		const openedModal = document.querySelector('.modal_opened');
		closeModal(openedModal);
	}
}

// closes popup using Esc button
function closeModal(modal) {
	modal.classList.remove('modal_opened');
	// apply closeModalEsc function
	document.removeEventListener('keydown', closeModalEsc);
}

// // opens popup
function openModal(modal) {
	modal.classList.add('modal_opened');
	// apply closeModalEsc function
	document.addEventListener('keydown', closeModalEsc);
}

//* ==========================================
//*        PopupWithImage
//* ==========================================
// (1) // Create an instance of PopupWithImage
const newImagePopup = new PopupWithImage({ popupSelector: '#image-modal' });
newImagePopup.setEventListeners();

// (2) // Define the handleImageClick function that will be used by cards
// (it needs to be in index.js because here's where you create the newImagePopup instance)
function handleImageClick(cardData) {
	newImagePopup.open(cardData);
}

// (3) // CREATE CARDS USING initialCards DATA (ARRAY OF CARD DATA)
// createCard creates a single card
function createCard(cardData, cardSelector, handleImageClick) {
	// create a card and return it rendered using getView()
	const card = new Card(cardData, cardSelector, handleImageClick);
	return card.getView();
}

// handles adding the card to the DOM (it uses createCard)
function renderCard(cardData, wrapper) {
	// use createCard to create a card element
	const cardElement = createCard(cardData, cardSelector, handleImageClick);
	wrapper.prepend(cardElement);
}

//* ==========================================
//*        Section
//* ==========================================
const section = new Section(
	{
		items: initialCards,
		renderer: (cardData) => {
			const cardElement = createCard(cardData, cardSelector, handleImageClick);
			section.addItem(cardElement);
		},
	},
	'.cards__list'
);

section.renderItems();

// make x-button close modalImage
imageModalCloseButton.addEventListener('click', () => closeModal(imageModal));

/*------------------------ EVENT HANDLERS ------------------------------*/
// these two stay in index.js because they are shared with other classes
function handleProfileFormSubmit(evt) {
	//first one clears fields upon opening form
	evt.preventDefault();
	// profileTitle.textContent = profileTitleInput.value;
	// profileDescription.textContent = profileDescriptionInput.value;
	userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
	closeModal(editProfileModal);
	// clear input fields after submit:
	evt.target.reset();
}

function handleAddCardFormSubmit(evt) {
	evt.preventDefault();
	const name = cardTitleInput.value;
	const link = cardUrlInput.value;
	renderCard({ name, link }, cardsWrap);
	closeModal(addCardModal);
	// disable submit button after clearing
	addFormValidator.disableSubmitButton();
	// clear input fields after submit:
	evt.target.reset();
}

/*------------------------ EVENT LISETENERS ------------------------------*/

profileModalCloseButton.addEventListener('click', () =>
	closeModal(editProfileModal)
);

addCardModalCloseButton.addEventListener('click', () =>
	closeModal(addCardModal)
);

// inserts a card
// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

//* ==========================================
//*        PopupWithForm: Add Card
//* ==========================================
const newCardPopup = new PopupWithForm({
	popupSelector: '#add-card-modal',
	handleFormSubmit: handleAddCardFormSubmit,
});

addNewCardButton.addEventListener('click', () => {
	newCardPopup.open();
});

newCardPopup.setEventListeners();

//* ==========================================
//*        PopupWithForm: Edit Profile
//* ==========================================
const newEditPopup = new PopupWithForm({
	popupSelector: '#edit-modal',
	handleFormSubmit: handleProfileFormSubmit,
});

profileEditButton.addEventListener('click', () => {
	const values = userInfo.getUserInfo();
	profileTitleInput.value = values.name;
	profileDescriptionInput.value = values.job;
	newEditPopup.open();
});

newEditPopup.setEventListeners();

//* ==========================================
//*        UserInfo
//* ==========================================
// // Create one instance of UserInfo.js class and use its methods as described
// // const newUserInfo = new UserInfo(argument1, argument2);
// // newUserInfo.getUserInfo);
// // newUserInfo.setUserInfo);
