const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector('.fullscreen')

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();

    /*
        if (video.paused) {
            video.play()
        } else video.pause()
         */
}

function updateButton() {
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
}

function skips() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function updateSlider() {
    const min = this.min;
    const max = this.max;
    const val = this.value;
    const percent = ((val - min) / (max - min)) * 100

    this.style.background = `linear-gradient(to right, #ffc800 ${percent}%, lightgrey ${percent}%)`
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        player.requestFullscreen()
    } else document.exitFullscreen()
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((button) => button.addEventListener("click", skips));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
    range.addEventListener("mousemove", handleRangeUpdate)
);

ranges.forEach((slider) => {
    slider.addEventListener('input', updateSlider)
    updateSlider.call(slider)
})

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);
progress.addEventListener('mouseleave', () => (mouseDown = false))

fullScreen.addEventListener('click', toggleFullscreen)

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change button icon/text
    darkModeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
