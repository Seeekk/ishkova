
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    if (localStorage.getItem('user_' + username)) {
      registerMessage.style.color = 'red';
      registerMessage.textContent = 'Пользователь с таким именем уже существует';
      return;
    }

    localStorage.setItem('user_' + username, JSON.stringify({ username, password }));
    registerMessage.style.color = 'green';
    registerMessage.textContent = 'Регистрация успешна! Перейдите на страницу входа.';
    registerForm.reset();
  });
}

const signInForm = document.getElementById('signInForm');
const signInMessage = document.getElementById('signInMessage');

if (signInForm) {
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signInUsername').value.trim();
    const password = document.getElementById('signInPassword').value;

    const userData = localStorage.getItem('user_' + username);
    if (!userData) {
      signInMessage.style.color = 'red';
      signInMessage.textContent = 'Пользователь не найден';
      return;
    }

    const user = JSON.parse(userData);
    if (user.password !== password) {
      signInMessage.style.color = 'red';
      signInMessage.textContent = 'Неверный пароль';
      return;
    }

    signInMessage.style.color = 'green';
    signInMessage.textContent = `Добро пожаловать, ${username}!`;

    signInForm.reset();

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}
