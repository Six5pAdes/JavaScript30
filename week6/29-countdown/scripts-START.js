let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let blinking;

const alarm = new Audio("GLaDOS-730120.wav");

const acknowledgeButton = document.createElement('button');
acknowledgeButton.textContent = 'Stop Alarm';
acknowledgeButton.classList.add('timer__button', 'acknowledge-button');
acknowledgeButton.style.fontSize = '3rem';
acknowledgeButton.style.padding = '1rem 3rem';
acknowledgeButton.style.marginTop = '2rem';
acknowledgeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
acknowledgeButton.style.borderRadius = '5px';
acknowledgeButton.addEventListener('click', acknowledgeTimeUp);

function timer(seconds) {
    clearInterval(countdown);
    clearInterval(blinking);

    // timerDisplay.classList.remove("blinking");
    timerDisplay.style.visibility = "visible";

    if (document.querySelector('.acknowledge-button')) {
        document.querySelector('.acknowledge-button').remove();
    }

    alarm.pause();
    alarm.currentTime = 0;

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secsLeft = Math.round((then - Date.now()) / 1000);

        if (secsLeft < 0) {
            clearInterval(countdown);
            timeUp();
            return;
        }

        displayTimeLeft(secsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    const zero = remaining < 10 ? "0" : "";
    const display = `${minutes}:${zero}${remaining}`;

    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);

    const hour = end.getHours();
    // const amPm = hour > 12 ? hour - 12 : hour

    const mins = end.getMinutes();
    const zero = mins < 10 ? "0" : "";
    // const amPmString = hour >= 12 ? 'PM' : 'AM'

    endTime.textContent = `Be Back At ${hour}:${zero}${mins}`;
    // endTime.textContent = `Be Back At ${amPm}:${zero}${mins} ${amPmString}`
}

function timeUp() {
    alarm.play();
    startBlinking();

    timerDisplay.textContent = "Time's Up!";
    document.title = "Time's Up!";

    const displayDiv = document.querySelector('.display');
    displayDiv.appendChild(acknowledgeButton);
}

function startBlinking() {
    let visible = true;
    blinking = setInterval(() => {
        if (visible) {
            timerDisplay.style.visibility = "hidden";
        } else {
            timerDisplay.style.visibility = "visible";
        }

        visible = !visible;
    }, 500);
}

function acknowledgeTimeUp() {
    clearInterval(blinking);
    timerDisplay.style.visibility = "visible";

    alarm.pause();
    alarm.currentTime = 0;

    acknowledgeButton.remove();
    timerDisplay.classList.remove("blinking");
    timerDisplay.textContent = "";
    endTime.textContent = "0:00";
    document.title = "Timer";
}

function startTime() {
    const secs = parseInt(this.dataset.time);
    timer(secs);
}

buttons.forEach((button) => button.addEventListener("click", startTime));
document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

const style = document.createElement('style');
style.textContent = `
  .blink {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
