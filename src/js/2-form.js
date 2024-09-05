// 1. Оголошення об'єкта formData
let formData = {
  email: '',
  message: '',
};

// 2. Отримання посилань на форму та поля
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// 3. Функція для збереження даних у локальне сховище
function saveToLocalStorage() {
  // Видалення пробілів за допомогою trim() перед збереженням
  formData.email = emailInput.value.trim();
  formData.message = messageInput.value.trim();

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// 4. Відстеження змін у формі через подію input
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim(); // Оновлення відповідного поля з видаленням пробілів
  saveToLocalStorage(); // Збереження оновленого formData у сховище
});

// 5. Перевірка наявності даних у локальному сховищі при завантаженні сторінки
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    formData = JSON.parse(savedData); // Відновлення даних у formData
    emailInput.value = formData.email; // Заповнення поля email
    messageInput.value = formData.message; // Заповнення поля message
  }
}

loadFromLocalStorage(); // Завантаження даних при старті

// 6. Обробка події submit
form.addEventListener('submit', event => {
  event.preventDefault(); // Запобігання перезавантаженню сторінки

  // Видалення пробілів з полів перед перевіркою
  formData.email = emailInput.value.trim();
  formData.message = messageInput.value.trim();

  // Перевірка, чи заповнені всі поля
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields'); // Сповіщення, якщо якесь поле не заповнене
  } else {
    console.log(formData); // Виведення даних у консоль

    // Очищення форми, локального сховища та formData
    localStorage.removeItem('feedback-form-state'); // Видалення даних зі сховища
    formData = { email: '', message: '' }; // Скидання formData
    form.reset(); // Очищення полів форми
  }
});
