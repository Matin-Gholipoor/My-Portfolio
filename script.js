const volumeUpIcon = document.getElementById('volume-up-icon');
const volumeOffIcon = document.getElementById('volume-off-icon');
const music = document.getElementById('music');
const volumeSlider = document.getElementById('volume-slider');
const volumeDispalay = document.getElementById('volume-display');
const mainCharacter = document.getElementById('main-character');
const mainCharacter_standing = document.getElementById('main-character-standing');
const mainCharacter_walking = document.getElementById('main-character-walking');
const dialogueParagraph = document.getElementById('dialogue');

const state = {
  mainCharacter: {
    // position can be on of the values {0, 1, 2}. 
    // it means in front of which shelf the character stands
    position: 0,
    isMoving: false
  }
};

const shopkeeperDialogues = [
  'First, we will look at this part. It is like the first song on a record. This part has a little bit about me. It also has my information, so you can contact me.',
  'Next is the second part. It is like the second song on a record. This part shows all my skills. It also shows if my skills are good or very good.',
  'Last is the final part. This is like the final song on a record. This part has all my projects. Here, you can see how my skills have grown from the first project to the last.',
  "You got the right sound there, kid. This is my collection, my whole life's work. Take a look around. You'll find what you're lookin' for."
];

let intervalId;

init();

volumeUpIcon.addEventListener('click', () => {
  music.pause();
  music.muted = true;

  volumeOffIcon.style.display = 'inline-block';
  volumeUpIcon.style.display = 'none';
});

volumeOffIcon.addEventListener('click', () => {
  music.play();
  music.muted = false;

  volumeOffIcon.style.display = 'none';
  volumeUpIcon.style.display = 'inline-block';
});

volumeSlider.addEventListener('input', (event) => {
  volumeDispalay.textContent = `Volume = ${volumeSlider.value}%`;

  volumeSlider.style.backgroundImage = `
    linear-gradient(to right, transparent ${volumeSlider.value}%, var(--background-color) ${volumeSlider.value}%),
    repeating-linear-gradient(90deg,
      var(--background-color) 0px,
      var(--background-color) 8px,
      var(--neon-blue) 8px,
      var(--neon-blue) 10px)
  `;

  music.volume = volumeSlider.value / 100;
});

document.body.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      moveMainCharacter('right');
      break;
    case 'ArrowLeft':
      moveMainCharacter('left');
      break;
  }
});

mainCharacter.addEventListener('transitionend', (event) => {
  if (event.propertyName === 'transform') {
    endMainCharacterMovement().then(() => {
      displayDialogue(Number(state.mainCharacter.position));
    });
  }
});

function init() {
  music.muted = true;
  music.volume = volumeSlider.value / 100;

  displayDialogue(3);
}

function moveMainCharacter(direction) {
  if (!state.mainCharacter.isMoving) {

    if (direction === "right") {
      switch (state.mainCharacter.position) {
        case 0:
          mainCharacter.style.transform = 'translate(-40px, 100px)';
          state.mainCharacter.position = 1;
          state.mainCharacter.isMoving = true;
          break;
        case 1:
          mainCharacter.style.transform = 'translate(160px, 100px)';
          state.mainCharacter.position = 2;
          state.mainCharacter.isMoving = true;
          break;
      }

      mainCharacter_walking.style.transform = 'scaleX(1)';
    }
    else if (direction === 'left') {
      switch (state.mainCharacter.position) {
        case 2:
          mainCharacter.style.transform = 'translate(-40px, 100px)';
          state.mainCharacter.position = 1;
          state.mainCharacter.isMoving = true;
          break;
        case 1:
          mainCharacter.style.transform = 'translate(-240px, 100px)';
          state.mainCharacter.position = 0;
          state.mainCharacter.isMoving = true;
          break;
      }

      mainCharacter_walking.style.transform = 'scaleX(-1)';
    }

    if (state.mainCharacter.isMoving) {
      mainCharacter_standing.style.display = 'none';
      mainCharacter_walking.style.display = 'inline-block';
    }
  }
}

async function endMainCharacterMovement() {
  mainCharacter_standing.style.display = 'inline-block';
  mainCharacter_walking.style.display = 'none';

  state.mainCharacter.isMoving = false;
}

function displayDialogue(dialogueNumber) {
  if (!state.mainCharacter.isMoving) {
    clearInterval(intervalId);

    let index = 0;
    dialogueParagraph.innerHTML = '<span class="shopkeeper-speaker-text">Shopkeeper: </span>';

    intervalId = setInterval(() => {
      if (index === shopkeeperDialogues[dialogueNumber].length) {
        clearInterval(intervalId);
        return;
      }

      dialogueParagraph.innerHTML += shopkeeperDialogues[dialogueNumber][index];
      index++;
    }, 15);
  }
}