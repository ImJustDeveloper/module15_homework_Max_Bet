// Task 1

const btn = document.querySelector('.button1');
const svg1 = document.querySelector('.svg1');

btn.addEventListener('click', () => {
  if(!svg1.classList.contains('hey')){
    svg1.classList.add('hey');
    svg1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
    </svg>`;
  } else {
    svg1.classList.remove('hey');
    svg1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
    </svg>`;
  }
});

// Task 2

const btn2 = document.querySelector('.button2');

btn2.addEventListener("click", () => {
  alert(`Width of your screen = ${window.screen.width} px, and height = ${window.screen.height} px`)
})

// Task 3

const wsUri = 'wss://echo-ws-service.herokuapp.com.';

const send = document.querySelector('.send');
const geolocation = document.querySelector('.geolocation');
const output = document.querySelector('.output');
const state = document.querySelector('.state');
const input = document.querySelector('.input');

let websocket;

function pageLoaded() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = () => {
    state.innerHTML = 'Connected';
  };
  websocket.onerror = () => {
    state.innerHTML = 'Connection failed'
    state.classList = "error"; 
  };
  websocket.onmessage = (event) => {
    writeToScreen(event.data, true);
  }
}

function writeToScreen(message, isRecived) {
  let messageHTML = `<div class= "${isRecived? "answer": "message"}">${message}</div>`;
  output.innerHTML += messageHTML; 
}

send.addEventListener('click', () => {
  if(!input.value) return;
  websocket.send(input.value);
  writeToScreen(input.value, false);
  input.value = "";
  websocket.onerror = writeToScreen('Connection failed', true);
})

let mapLink;

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Your location';
}

geolocation.addEventListener('click', () => {
  mapLink = document.createElement('a');
  mapLink.target = 'blank';
  mapLink.classList.add('answer');
  mapLink.innerHTML = 'Your location';
  output.appendChild(mapLink);
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

document.addEventListener("DOMContentLoaded", pageLoaded);