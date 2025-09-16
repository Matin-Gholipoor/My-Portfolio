const volumeUpIcon = document.getElementById('volume-up-icon');
const volumeOffIcon = document.getElementById('volume-off-icon');
const music = document.getElementById('music');
const volumeSlider = document.getElementById('volume-slider');
const volumeDispalay = document.getElementById('volume-display');
const mainCharacter = document.getElementById('main-character');
const dialogueParagraph = document.getElementById('dialogue');
const startMessage = document.getElementById('start-message');
const guideList = document.getElementById('guide-list');
const slideImage = document.getElementById('slide-image');
const modal = document.getElementById('modal');
const SlidePreviousButton = document.getElementById('previous-button');
const SlideNextButton = document.getElementById('next-button');
const modalBottomRow = document.getElementById('modal-bottom-row');
const toggleSideButton = document.getElementById('toggle-side-button');
const slideImageContainer = document.getElementById('slide-image-container');
const slideImageContent = document.getElementById('slide-image-content');
const modalSlideContainer = document.getElementById('modal-slide-container');
const levelContainer = document.getElementById('level-container');
const levelProgressBar = document.getElementById('level-progress-bar');

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
  slides: {
    isZoomed: false,
    currentRecord: 0,
    side: 'front'
  }
};

const shopkeeperDialogues = [
  "First, we will look at this part. It is like the first song on a record. This part has a little bit about Matin. It also has Matin's information, so you can contact him.",
  "Next is the second part. It is like the second song on a record. This part shows all Matin's skills. It also shows if his skills are good or very good.",
  "Last is the final part. This is like the final song on a record. This part has all Matin's projects. Here, you can see how his skills have grown from the first project to the last.",
  "You got the right sound there, kid. This is my collection, my whole life's work. Take a look around. You'll find what you're lookin' for."
];

const skillsInfo = [
  {
    name: 'JavaScript',
    image: 'assets/images/skills/JavaScript.png',
    alt: 'JavaScript',
    level: 10
  },
  {
    name: 'HTML-CSS',
    image: 'assets/images/skills/HTML-CSS.png',
    alt: 'HTML-CSS',
    level: 10
  },
  {
    name: 'React',
    image: 'assets/images/skills/react.png',
    alt: 'React',
    level: 10
  },
  {
    name: 'C/C++',
    image: 'assets/images/skills/C-C++.png',
    alt: 'C/C++',
    level: 10
  },
  {
    name: 'Python',
    image: 'assets/images/skills/python.png',
    alt: 'Python',
    level: 4
  },
  {
    name: 'Git',
    image: 'assets/images/skills/git.png',
    alt: 'Git',
    level: 8
  },
  {
    name: 'Linux',
    image: 'assets/images/skills/linux.png',
    alt: 'Linux',
    level: 7
  },
  {
    name: 'Qt',
    image: 'assets/images/skills/qt.png',
    alt: 'Qt',
    level: 4
  },
  {
    name: 'English',
    image: 'assets/images/skills/english.png',
    alt: 'English',
    level: 10
  },
  {
    name: 'Photoshop',
    image: 'assets/images/skills/photoshop.png',
    alt: 'Photoshop',
    level: 8
  },
  {
    name: 'Autocad',
    image: 'assets/images/skills/autocad.png',
    alt: 'Autocad',
    level: 5
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

const aboutMeInfo = [
  {
    name: 'about me',
    'front-image': 'assets/images/about me/about me - front.png',
    'front-alt': 'about me - front',
    'back-image': 'assets/images/about me/about me - back.png',
    'back-alt': 'about me - back',
    'back-side-html': `
        <p class="white">
          I'm a software developer and software engineering student passionate about front-end development, currently learning React. Most of my projects are personal passion projects where I experiment with blending code, art, music, and design. I pay close attention to details—because small touches make big differences in user experience. I'm seeking opportunities in front-end development where I can grow, collaborate, and create digital experiences that are both functional and artistic.
        </p>
      `
  },
  {
    name: 'eduction',
    'front-image': 'assets/images/about me/education - front.png',
    'front-alt': 'education - front',
    'back-image': 'assets/images/about me/education - back.png',
    'back-alt': 'education - back',
    'back-side-html': `
        <div>
          <p style="color: var(--neon-orange);">
            Bachelor: 
          </p>
          <p style="color: var(--neon-blue); padding-left: 5%">
            University: 
          </p>
          <p style="color: black; padding-left: 10%">
            Isfahan University of Technology
          </p>
          <p style="color: var(--neon-blue); padding-left: 5%">
            GPA: 
          </p>
          <p style="color: black; padding-left: 10%">
            16.7
          </p>

          <br>

          <p style="color: var(--neon-orange);">
            Master (In progress): 
          </p>
          <p style="color: var(--neon-blue); padding-left: 5%">
            University: 
          </p>
          <p style="color: black; padding-left: 10%">
            Isfahan University of Technology
          </p>
        </div>
      `
  },
  {
    name: 'contact me',
    'front-image': 'assets/images/about me/contact me - front.png',
    'front-alt': 'contact me - front',
    'back-image': 'assets/images/about me/contact me - back.png',
    'back-alt': 'contact me - back',
    'back-side-html': `
      <div style="height: 100%; display:flex; flex-direction:column; justify-content: center;">
        <p class="white">
          Github:
          <a 
            href="https://github.com/Matin-Gholipoor" target="_blank"
            style="color: lightblue;"
          >
            github.com/Matin-Gholipoor
          </a>
        </p>
        <p class="white">
          Gmail:
          <a 
            href="mailto:matin.3108@gmail.com"
            style="color: lightblue;"
          >
            matin.3108@gmail.com
          </a>
        </p>
        <p class="white">
          Phone: 0915 772 2400
        </p>
        <p class="white">
          Telegram:
          <a
            href="https://t.me/Matin_Gholipour" target="_blank"
            style="color: lightblue;"
          >
            t.me/Matin_Gholipour
          </a>
        </p>
      </div>
    `
  }
];

const projectsInfo = [
  {
    name: 'youtube clone with html, css',
    'front-image': 'assets/images/projects/youtube clone with html, css - front.png',
    'front-alt': 'youtube clone with html, css - front',
    'back-image': 'assets/images/projects/youtube clone with html, css - back.png',
    'back-alt': 'youtube clone with html, css - back',
    'back-side-html': `
        <p class="white">
          some text 1
        </p>
      `
  },
  {
    name: 'miniprojects with html, css, js',
    'front-image': 'assets/images/projects/miniprojects with html, css, js - front.png',
    'front-alt': 'miniprojects with html, css, js - front',
    'back-image': 'assets/images/projects/miniprojects with html, css, js - back.png',
    'back-alt': 'miniprojects with html, css, js - back',
    'back-side-html': `
        <p class="white">
          some text 2
        </p>
      `
  },
  {
    name: 'React Chatbot',
    'front-image': 'assets/images/projects/React Chatbot - front.png',
    'front-alt': 'React Chatbot',
    'back-image': 'assets/images/projects/React Chatbot - back.png',
    'back-alt': 'React Chatbot - back',
    'back-side-html': `
        <p class="white">
          some text 3
        </p>
      `
  },
  {
    name: 'Ecommerce Website - React',
    'front-image': 'assets/images/projects/Ecommerce Website - React - front.png',
    'front-alt': 'Ecommerce Website - React - front',
    'back-image': 'assets/images/projects/Ecommerce Website - React - back.png',
    'back-alt': 'Ecommerce Website - React - back',
    'back-side-html': `
        <p class="white">
          some text 4
        </p>
      `
  },
  {
    name: 'my portfolio',
    'front-image': 'assets/images/projects/my portfolio - front.png',
    'front-alt': 'my portfolio - front',
    'back-image': 'assets/images/projects/my portfolio - back.png',
    'back-alt': 'my portfolio - back',
    'back-side-html': `
        <p class="white">
          some text 5
        </p>
      `
  }
];

let intervalId;

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
        if (!state.mainCharacter.isMoving) {
          displayModal();
        }
        break;
    }
  }
  else if (state.game.onSkillsModal) {
    switch (event.key) {
      case 'ArrowRight':
        if (!state.slides.isZoomed) {
          if (state.slides.currentRecord !== skillsInfo.length - 1) {
            state.slides.currentRecord++;
          }
          displayModal();
        }
        break;
      case 'ArrowLeft':
        if (!state.slides.isZoomed) {
          if (state.slides.currentRecord !== 0) {
            state.slides.currentRecord--;
          }
          displayModal();
        }
        break;
      case 'Escape':
        displayHome();
    }
  }
  else if (state.game.onAboutModal) {
    switch (event.key) {
      case 'ArrowRight':
        if (!state.slides.isZoomed) {
          if (state.slides.currentRecord !== aboutMeInfo.length - 1) {
            state.slides.currentRecord++;
          }
          displayModal();
        }
        break;
      case 'ArrowLeft':
        if (!state.slides.isZoomed) {
          if (state.slides.currentRecord !== 0) {
            state.slides.currentRecord--;
          }
          displayModal();
        }
        break;
      case 'Escape':
        displayHome();
    }
  }
  else if (state.game.onProjectsModal) {
    switch (event.key) {
      case 'ArrowRight':
        if (!state.slides.isZoomed) {
          if (state.slides.currentRecord !== projectsInfo.length - 1) {
            state.slides.currentRecord++;
          }
          displayModal();
        }
        break;
      case 'ArrowLeft':
        if (!state.slides.isZoomed) {
          if (state.slides.currentRecord !== 0) {
            state.slides.currentRecord--;
          }
          displayModal();
        }
        break;
      case 'Escape':
        displayHome();
    }
  }
});

mainCharacter.addEventListener('transitionend', (event) => {
  if (event.propertyName === 'transform') {
    endMainCharacterMovement().then(() => {
      displayDialogue(state.mainCharacter.position);
    });
  }
});

SlidePreviousButton.addEventListener('click', () => {
  if (state.slides.currentRecord !== 0) {
    state.slides.currentRecord--;
  }
  displayModal();
});

SlideNextButton.addEventListener('click', () => {
  if (state.game.onSkillsModal) {
    if (state.slides.currentRecord !== skillsInfo.length - 1) {
      state.slides.currentRecord++;
    }
    displayModal();
  }
  else if (state.game.onAboutModal) {
    if (state.slides.currentRecord !== aboutMeInfo.length - 1) {
      state.slides.currentRecord++;
    }
    displayModal();
  }
  else if (state.game.onProjectsModal) {
    if (state.slides.currentRecord !== projectsInfo.length - 1) {
      state.slides.currentRecord++;
    }
    displayModal();
  }
});

toggleSideButton.addEventListener('click', toggleSide);

slideImage.addEventListener('click', toggleZoom);

init();

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

function displayModal() {
  switch (state.mainCharacter.position) {
    case 0:
      state.game.onAboutModal = true;

      guideList.innerHTML = `
        <li>Use left and right arrow keys, or click arrows to explore collection.</li>
        <li>Use Escape key to get back to home.</li>
        <li>Click on the record to zoom in and zoom out.</li>
      `;

      slideImage.src = aboutMeInfo[state.slides.currentRecord]['front-image'];
      slideImage.alt = aboutMeInfo[state.slides.currentRecord]['front-alt'];

      levelContainer.style.display = 'none';

      toggleSideButton.style.display = 'inline-block';
      toggleSideButton.textContent = 'Back side';

      break;

    case 1:
      state.game.onSkillsModal = true;

      guideList.innerHTML = `
        <li>Use left and right arrow keys, or click arrows to explore collection.</li>
        <li>Use Escape key to get back to home.</li>
      `;

      slideImage.src = skillsInfo[state.slides.currentRecord].image;
      slideImage.alt = skillsInfo[state.slides.currentRecord].alt;

      toggleSideButton.style.display = 'none';

      levelContainer.style.display = 'flex';
      levelProgressBar.innerHTML = '';
      for (let i = 0; i < skillsInfo[state.slides.currentRecord].level; i++) {
        levelProgressBar.innerHTML += '<div class="level-progress"></div>';
      }

      break;

    case 2:
      state.game.onProjectsModal = true;

      guideList.innerHTML = `
        <li>Use left and right arrow keys, or click arrows to explore collection.</li>
        <li>Use Escape key to get back to home.</li>
        <li>Click on the record to zoom in and zoom out.</li>
      `;

      slideImage.src = projectsInfo[state.slides.currentRecord]['front-image'];
      slideImage.alt = projectsInfo[state.slides.currentRecord]['front-alt'];

      levelContainer.style.display = 'none';

      toggleSideButton.style.display = 'inline-block';
      toggleSideButton.textContent = 'Back side';

      break;

  }

  state.game.onHome = false;
  modal.style.display = 'flex';

  mainCharacter.src = mainCharacterFigures[1].src;
  mainCharacter.alt = mainCharacterFigures[1].alt;

  modalBottomRow.style.display = 'flex';

  SlideNextButton.style.visibility = 'visible';
  SlidePreviousButton.style.visibility = 'visible';

  slideImageContent.innerHTML = '';
}

function displayHome() {
  state.game.onHome = true;
  state.game.onSkillsModal = false;
  state.game.onAboutModal = false;
  state.game.onProjectsModal = false;

  modal.style.display = 'none';

  mainCharacter.src = mainCharacterFigures[0].src;
  mainCharacter.alt = mainCharacterFigures[0].alt;

  modalBottomRow.style.display = 'none';

  SlideNextButton.style.visibility = 'hidden';
  SlidePreviousButton.style.visibility = 'hidden';

  modalSlideContainer.style.width = '50%';
  slideImageContent.style.fontSize = '14px';

  state.slides.side = 'front';
  state.slides.currentRecord = 0;
  state.slides.isZoomed = false;

  guideList.innerHTML = `
    <li>Use left and right arrow keys to move.</li>
    <li>Use space to explore a collection.</li>
    <li>Shopkeeper explains about each collection.</li>
  `;
}

function toggleSide() {
  if (state.game.onAboutModal) {
    if (state.slides.side === 'front') {
      slideImage.src = aboutMeInfo[state.slides.currentRecord]['back-image'];
      slideImage.alt = aboutMeInfo[state.slides.currentRecord]['back-alt'];

      toggleSideButton.textContent = 'Front side';

      state.slides.side = 'back';

      slideImageContent.innerHTML = aboutMeInfo[state.slides.currentRecord]['back-side-html'];
    }
    else {
      slideImage.src = aboutMeInfo[state.slides.currentRecord]['front-image'];
      slideImage.alt = aboutMeInfo[state.slides.currentRecord]['front-alt'];

      toggleSideButton.textContent = 'Back side';

      state.slides.side = 'front';

      slideImageContent.textContent = '';
    }
  }
  else if (state.game.onProjectsModal) {
    if (state.slides.side === 'front') {
      slideImage.src = projectsInfo[state.slides.currentRecord]['back-image'];
      slideImage.alt = projectsInfo[state.slides.currentRecord]['back-alt'];

      toggleSideButton.textContent = 'Front side';

      state.slides.side = 'back';

      slideImageContent.innerHTML = projectsInfo[state.slides.currentRecord]['back-side-html'];
    }
    else {
      slideImage.src = projectsInfo[state.slides.currentRecord]['front-image'];
      slideImage.alt = projectsInfo[state.slides.currentRecord]['front-alt'];

      toggleSideButton.textContent = 'Back side';

      state.slides.side = 'front';

      slideImageContent.textContent = '';
    }
  }
}

function toggleZoom() {
  if (state.slides.isZoomed) {
    modalSlideContainer.style.width = '50%';

    modalBottomRow.style.display = 'flex';

    SlideNextButton.style.visibility = 'visible';
    SlidePreviousButton.style.visibility = 'visible';

    slideImageContent.style.fontSize = '14px';

    state.slides.isZoomed = false;
  }
  else {
    modalSlideContainer.style.width = '75%';

    modalBottomRow.style.display = 'none';

    SlideNextButton.style.visibility = 'hidden';
    SlidePreviousButton.style.visibility = 'hidden';

    slideImageContent.style.fontSize = '21.5px';

    state.slides.isZoomed = true;
  }
}