const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const myData = {
    email,
    message,
  };
  saveToLS(STORAGE_KEY, myData);
}

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const jsonData = localStorage.getItem(key);
  return JSON.parse(jsonData);
}

function init() {
  const myData = loadFromLS(STORAGE_KEY) || {};
  form.elements.email.value = myData.email || '';
  form.elements.message.value = myData.message || '';
}

init();

function onFormSubmit(e) {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const myData = {
    email,
    message,
  };

  if (email === '' || message === '') {
    alert('All form fields must be filled in');
  } else {
    console.log(myData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
  }
}
