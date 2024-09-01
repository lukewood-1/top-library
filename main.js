'use strict'

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const páges = document.querySelector('pages');
const hasRead = document.querySelector('input[name=hasRead]');
const feedback = document.querySelectorAll('.feedback');

// Make book prototype
function Book (title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
};

Book.prototype.report = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`;
};

Book.prototype.publishBook = function (el) {
	const entry = document.createElement('div');
	entry.className = 'entry';

	const entryImg = document.createElement('img');
	entryImg.alt = 'book image';
	entry.append(entryImg);

	const entryTitle = document.createElement('h3');
	entryTitle.textContent = this.title;
	entryTitle.title = this.title;
	entry.append(entryTitle);

	const entryAuthor = document.createElement('p');
	entryAuthor.textContent = this.author;
	entryAuthor.title = this.author;
	entry.append(entryAuthor);

	const entryPages = document.createElement('p');
	entryPages.textContent = this.pages + ' pages';
	entry.append(entryPages);

	const readToggleWrapper = document.createElement('div');
	const readToggleLabel = document.createElement('label');
	readToggleLabel.textContent = 'I read this';
	readToggleLabel.setAttribute('for', `checkbox${books.indexOf(this)+1}`);
	readToggleWrapper.append(readToggleLabel);

	const readToggleInput = document.createElement('input');
	readToggleInput.type = 'checkbox';
	readToggleInput.className = 'checkbox';
	readToggleInput.id = `checkbox${books.indexOf(this)+1}`;
	readToggleInput.name = 'card_hasRead';
	readToggleLabel.after(readToggleInput);
	if(hasRead.checked){
		readToggleInput.checked = true
	} else {
		readToggleInput.checked = false
	};
	readToggleInput.addEventListener('input', e=> {
		if(e.target.checked){
			this.hasRead = true;
		} else {
			this.hasRead = false;
		}
	});
	entry.append(readToggleWrapper);

	const entryRemove = document.createElement('button');
	entryRemove.className = 'close-btn';
	entryRemove.textContent = 'remove';
	entry.append(entryRemove);
	entryRemove.addEventListener('click', e =>{
		entry.remove();
	})

	return el.append(entry);
};

// Create function to push books into DOM bookshelf
const books = [];
function addBookToLibrary (){
	return books.push(new Book(title.value, author.value, +pages.value, hasRead.checked));
};

// Open form modal on click
const showModalBtn = document.querySelector('.open-modal');
const modal = document.querySelector('.modal');
showModalBtn.addEventListener('click',
	() => modal.showModal() );
	
// add form Validation styles
function invalidStyles(el) {
	el.classList.remove('valid');
	el.classList.add('invalid');
};

function validStyles(el) {
	el.classList.remove('invalid')
	el.classList.add('valid');
};

// Validate form
const submitBtn  = document.querySelector('.close-modal');
const form = document.querySelector('.modal > form');
submitBtn.addEventListener('click', e => {
			e.preventDefault();
		if(!form.checkValidity()){
			feedback[3].textContent = `Make sure that nothing is missing in your book register.`;
		} else {
			addBookToLibrary();
			books.at(-1).publishBook(bookshelf);
			modal.close();
		}
});

const lastWord = document.createElement('span');
lastWord.textContent = 'green.';
lastWord.style.color = '#080';
lastWord.style.textShadow = '0 0 .3rem #0f07';
// Paint submit button with validation colors
form,addEventListener('input', e => {
	if(title.validity.valid && author.validity.valid && pages.validity.valid){
		validStyles(submitBtn);
		feedback[3].textContent = '';
	} else {
		feedback[3].textContent = 'When the form is complete and valid, this button will turn ';
		feedback[3].style.color = '#333';
		feedback[3].append(lastWord);
	}
});

// Validate title input
title.addEventListener('input', e => {
	if(e.target.validity.valueMissing){
		feedback[0].textContent = 'Please fill this field too.';
		invalidStyles(e.target);
	} else {
		feedback[0].textContent = '';
		validStyles(e.target);
	}
});

// Validate author input
author.addEventListener('input', e => {
	if(e.target.validity.valueMissing){
		feedback[1].textContent = 'Please fill out this field too.';
		invalidStyles(e.target);
	} else if (e.target.validity.patternMismatch){
		feedback[1].textContent = 'Please don\'t use special characters not used in names.';
		invalidStyles(e.target);
	}	else {
		validStyles(e.target);
		feedback[1].textContent = '';
	}
});

// Validate pages input
pages.addEventListener('input', e => {
	if(e.target.validity.valueMissing){
		feedback[2].textContent = 'Please fill out this field too.';
		invalidStyles(e.target);
	} else if (e.target.validity.patternMismatch){
		feedback[2].textContent = 'Please use only numbers.';
		invalidStyles(e.target);
	}	else {
		validStyles(e.target);
		feedback[2].textContent = '';
	}
});

// Validate hasRead input
hasRead.addEventListener('click', e => {
		if(e.target.checked){
			this.hasRead = true;
		} else {
			this.hasRead = false;
		}
});

// Insert book info into DOM bookshelf
const bookshelf = document.querySelector('.bookshelf');
class bookStand {
	constructor(book){
		this.title = books[book].title;
		this.author = books[book].author;
		this.pages = books[book].pages;
		this.hasRead = books[book].hasRead;
		this.publishBook = function () {
			const entry = document.createElement('div');
			entry.className = 'entry';
			const entryImg = document.createElement('img');
			entryImg.alt = 'book image';
			const entryTitle = document.querySelector('h3');
			entryTitle.textContent = this.title;
			const entryAuthor = document.querySelector('p');
			entryAuthor.textContent = this.author;
			bookshelf.append(entry);
		}
	}
}
