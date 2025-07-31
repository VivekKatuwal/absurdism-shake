const container = document.getElementById("sentence-container");

// The single absurdist sentence
const sentence = "Reality is a poorly written play without an audience.";
const words = sentence.split(" ");
let wordSpans = [];

// Step 1: Show the sentence in correct order
function displayWordsInOrder() {
  container.innerHTML = "";
  wordSpans = [];

  words.forEach((word) => {
    const span = document.createElement("span");
    span.className = "word ordered";
    span.innerText = word;
    container.appendChild(span);
    wordSpans.push(span);
  });
}

// Step 2: Scramble them randomly in the container
function scrambleWords() {
  wordSpans.forEach((el) => {
    el.classList.remove("ordered");
    el.style.position = "absolute";

    const maxX = container.offsetWidth - 100;
    const maxY = container.offsetHeight - 50;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `rotate(${Math.random() * 360}deg)`;

    makeDraggable(el); // Allow dragging
  });
}

// Step 3: Make each word draggable by user
function makeDraggable(el) {
  let offsetX, offsetY;

  const mouseDownHandler = function (e) {
    el.style.cursor = "grabbing";
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  };

  const mouseUpHandler = function () {
    el.style.cursor = "grab";
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  el.addEventListener("mousedown", mouseDownHandler);
}

// Optional: Also work on mobile touch
// Uncomment if needed later

// Shake detection logic (device motion)
let lastTime = new Date();
let lastX, lastY, lastZ;
const shakeThreshold = 15;

window.addEventListener("devicemotion", function (event) {
  const { x, y, z } = event.accelerationIncludingGravity;
  const currentTime = new Date();
  const timeDifference = currentTime - lastTime;

  if (timeDifference > 100) {
    const deltaX = Math.abs(x - (lastX || 0));
    const deltaY = Math.abs(y - (lastY || 0));
    const deltaZ = Math.abs(z - (lastZ || 0));
    const shakeStrength = deltaX + deltaY + deltaZ;

    if (shakeStrength > shakeThreshold) {
      scrambleWords();
      lastTime = currentTime;
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  }
});

// For desktops: also scramble on click
document.body.addEventListener("click", scrambleWords);

// Initial display
displayWordsInOrder();
