const volumeUpIcon = document.getElementById('volume-up-icon');
const volumeOffIcon = document.getElementById('volume-off-icon');
const music = document.getElementById('music');
const volumeSlider = document.getElementById('volume-slider');
const volumeDispalay = document.getElementById('volume-display');
const mainCharacter = document.getElementById('main-character');
const dialogueParagraph = document.getElementById('dialogue');
const startMessage = document.getElementById('start-message');
const guideList = document.getElementById('guide-list');
const skillImage = document.getElementById('skill-image');
const skillsModal = document.getElementById('skills-modal');

const state = {
  mainCharacter: {
    // position can be on of the values {0, 1, 2}. 
    // it means in front of which shelf the character stands
    position: 0,
    isMoving: false
  },
  game: {
    isStarted: false,
    onHome: false,
    onSkillsModal: false,
    onAboutModal: false,
    onProjectsModal: false
  },
  skills: {
    currentSkill: 0
  }
};

const shopkeeperDialogues = [
  "First, we will look at this part. It is like the first song on a record. This part has a little bit about Matin. It also has Matin's information, so you can contact him.",
  "Next is the second part. It is like the second song on a record. This part shows all Matin's skills. It also shows if his skills are good or very good.",
  "Last is the final part. This is like the final song on a record. This part has all Matin's projects. Here, you can see how his skills have grown from the first project to the last.",
  "You got the right sound there, kid. This is my collection, my whole life's work. Take a look around. You'll find what you're lookin' for."
];

const skills = [
  {
    name: 'JavaScript',
    image: 'assets/images/skills/JavaScript.png',
    alt: 'JavaScript',
    level: 100
  },
  {
    name: 'HTML-CSS',
    image: 'assets/images/skills/HTML-CSS.png',
    alt: 'HTML-CSS',
    level: 100
  },
  {
    name: 'React',
    image: 'assets/images/skills/react.png',
    alt: 'React',
    level: 100
  },
  {
    name: 'C/C++',
    image: 'assets/images/skills/C-C++.png',
    alt: 'C/C++',
    level: 100
  },
  {
    name: 'Python',
    image: 'assets/images/skills/python.png',
    alt: 'Python',
    level: 40
  },
  {
    name: 'Git',
    image: 'assets/images/skills/git.png',
    alt: 'Git',
    level: 80
  },
  {
    name: 'Linux',
    image: 'assets/images/skills/linux.png',
    alt: 'Linux',
    level: 70
  },
  {
    name: 'Qt',
    image: 'assets/images/skills/qt.png',
    alt: 'Qt',
    level: 40
  },
  {
    name: 'English',
    image: 'assets/images/skills/english.png',
    alt: 'English',
    level: 100
  },
  {
    name: 'Photoshop',
    image: 'assets/images/skills/photoshop.png',
    alt: 'Photoshop',
    level: 80
  },
  {
    name: 'Autocad',
    image: 'assets/images/skills/autocad.png',
    alt: 'Autocad',
    level: 50
  }
];

const mainCharacterFigures = [
  {
    name: 'standing',
    src: 'assets/images/characters/main character/standing.png',
    alt: 'main charater - standing',
  },
  {
    name: 'back view',
    src: 'assets/images/characters/main character/standing - back.png',
    alt: 'main charater - back view',
  },
  {
    name: 'walking',
    src: 'assets/images/characters/main character/walking.gif',
    alt: 'main charater - walking',
  },
  {
    name: 'walking reversed',
    src: 'assets/images/characters/main character/walking - reversed.gif',
    alt: 'main charater - walking reversed',
  }
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
  volumeDispalay.textContent = `Volume: ${volumeSlider.value}%`;

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
  if (!state.game.isStarted) {
    if (event.key === ' ') {
      startMessage.style.display = 'none';
      guideList.style.display = 'block';

      state.game.isStarted = true;
      state.game.onHome = true;

      displayDialogue(0);
      displayHome();
    }
  }
  else if (state.game.onHome) {
    switch (event.key) {
      case 'ArrowRight':
        moveMainCharacter('right');
        break;
      case 'ArrowLeft':
        moveMainCharacter('left');
        break;
      case ' ':
        switch (state.mainCharacter.position) {
          case 1:
            displaySkillsModal();
            break;
        }
    }
  }
  else if (state.game.onSkillsModal) {
    switch (event.key) {
      case 'ArrowRight':
        if (state.skills.currentSkill !== skills.length - 1) {
          state.skills.currentSkill++;
        }
        displaySkillsModal();
        break;
      case 'ArrowLeft':
        if (state.skills.currentSkill !== 0) {
          state.skills.currentSkill--;
        }
        displaySkillsModal();
        break;
      case 'Backspace':
        displayHome();
    }

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

  mainCharacter.src = mainCharacterFigures[0].src;
  mainCharacter.alt = mainCharacterFigures[0].alt;
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
    }

    if (state.mainCharacter.isMoving) {
      if (direction === "right") {
        mainCharacter.src = mainCharacterFigures[2].src;
        mainCharacter.alt = mainCharacterFigures[2].alt;
        mainCharacter.loop = true;
        mainCharacter.autoplay = true;
      }
      else {
        mainCharacter.src = mainCharacterFigures[3].src;
        mainCharacter.alt = mainCharacterFigures[3].alt;
        mainCharacter.loop = true;
        mainCharacter.autoplay = true;
      }
    }
  }
}

async function endMainCharacterMovement() {
  mainCharacter.src = mainCharacterFigures[0].src;
  mainCharacter.alt = mainCharacterFigures[0].alt;
  mainCharacter.loop = false;
  mainCharacter.autoplay = false;

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

function displaySkillsModal() {
  state.game.onHome = false;
  state.game.onSkillsModal = true;
  skillsModal.style.display = 'flex';

  mainCharacter.src = mainCharacterFigures[1].src;
  mainCharacter.alt = mainCharacterFigures[1].alt;

  guideList.innerHTML = `
    <li>Use left and right arrow keys explore skills.</li>
    <li>Use backspace key to get back to home.</li>
  `;

  skillImage.src = skills[state.skills.currentSkill].image;
  skillImage.alt = skills[state.skills.currentSkill].alt;
}

function displayHome() {
  state.game.onHome = true;
  state.game.onSkillsModal = false;
  state.game.onAboutModal = false;
  state.game.onProjectsModal = false;

  skillsModal.style.display = 'none';

  mainCharacter.src = mainCharacterFigures[0].src;
  mainCharacter.alt = mainCharacterFigures[0].alt;

  guideList.innerHTML = `
    <li>Use left and right arrow keys to move.</li>
    <li>Use space to explore a collection.</li>
    <li>Shopkeeper explains about each collection.</li>
  `;
}