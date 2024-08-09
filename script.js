let timer;
let isRunning = false;
let timeLeft;
let isFocusTime = true;

const startPauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const focusTimeInput = document.getElementById("focus-time-input");
const breakTimeInput = document.getElementById("break-time-input");
const errorMessage = document.getElementById("error-message");

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden"); // Remove the 'hidden' class
  errorMessage.classList.add("show");
  setTimeout(() => {
    errorMessage.classList.remove("show");
    setTimeout(() => errorMessage.classList.add("hidden"), 500); // Add 'hidden' after the fade-out
  }, 3000); // Message lasts for 3 seconds
}

function validateTimeInputs() {
  if (focusTimeInput.value < 5 || breakTimeInput.value < 5) {
    showError("O tempo mínimo é de 5 minutos!");
    return false;
  }
  return true;
}

function setTimeLeft(minutes) {
  timeLeft = minutes * 60;
  updateDisplay();
}

function switchTimer() {
  isFocusTime = !isFocusTime;
  setTimeLeft(isFocusTime ? focusTimeInput.value : breakTimeInput.value);
  startPauseButton.textContent = "Pausar";
  timer = setInterval(countdown, 1000);
}

focusTimeInput.addEventListener("change", function () {
  if (!isRunning && isFocusTime) {
    setTimeLeft(focusTimeInput.value);
  }
});

breakTimeInput.addEventListener("change", function () {
  if (!isRunning && !isFocusTime) {
    setTimeLeft(breakTimeInput.value);
  }
});

startPauseButton.addEventListener("click", function () {
  if (!validateTimeInputs()) {
    return;
  }

  if (isRunning) {
    clearInterval(timer);
    startPauseButton.textContent = "Iniciar";
  } else {
    timer = setInterval(countdown, 1000);
    startPauseButton.textContent = "Pausar";
  }
  isRunning = !isRunning;
});

resetButton.addEventListener("click", function () {
  clearInterval(timer);
  setTimeLeft(isFocusTime ? focusTimeInput.value : breakTimeInput.value);
  startPauseButton.textContent = "Iniciar";
  isRunning = false;
});

function countdown() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    switchTimer();
  } else {
    timeLeft--;
    updateDisplay();
  }
}

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

// Inicializa o timer com o valor padrão de foco
setTimeLeft(focusTimeInput.value);
