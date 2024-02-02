const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const emailValue = form.elements.email.value.trim();
  const messageValue = form.elements.message.value.trim();

  const myData = {
    emailValue,
    messageValue,
  };
  saveToLS(STORAGE_KEY, myData);
}

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const jsonData = localStorage.getItem(key);
  try {
    return JSON.parse(jsonData);
  } catch {
    return jsonData;
  }
}

function init() {
  const myData = loadFromLS(STORAGE_KEY) || {};
  form.elements.email.value = myData.emailValue || '';
  form.elements.message.value = myData.messageValue || '';
}

init();

function onFormSubmit(e) {
  e.preventDefault();

  const emailValue = form.elements.email.value.trim();
  const messageValue = form.elements.message.value.trim();
  const myData = {
    emailValue,
    messageValue,
  };

  if (emailValue === '' || messageValue === '') {
    return;
  } else {
    console.log(myData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
  }
}
