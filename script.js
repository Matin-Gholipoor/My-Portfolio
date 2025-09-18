const volumeUpIcon = document.getElementById('volume-up-icon');
const volumeOffIcon = document.getElementById('volume-off-icon');
const music = document.getElementById('music');
const volumeSlider = document.getElementById('volume-slider');
const volumeDispalay = document.getElementById('volume-display');
const mainCharacterImage = document.getElementById('main-character-image');
const mainCharacterContainer = document.getElementById('main-character-container');
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
const slideBackContent = document.getElementById('slide-back-content');
const modalSlideContainer = document.getElementById('modal-slide-container');
const levelContainer = document.getElementById('level-container');
const levelProgressBar = document.getElementById('level-progress-bar');
const shelf1 = document.getElementById('shelf-1');
const shelf2 = document.getElementById('shelf-2');
const shelf3 = document.getElementById('shelf-3');
const shelfTitles = document.querySelectorAll('.js-shelf-title');
const backButton = document.getElementById('back-button');
const crtMonitorEffect = document.getElementById("crt-effect");
const loadingScreen = document.getElementById('loading-screen');
const loadingMessage = document.getElementById('loading-message');
const loadedGameSection = document.getElementById('loaded-game-section');

const state = {
  mainCharacter: {
    // position can be on of the values {0, 1, 2}. 
    // it means in front of which shelf the character stands
    position: 0,
    isMoving: false
  },
  game: {
    isLoaded: false,
    isStarted: false,
    onHome: false,
    onSkillsModal: false,
    onAboutModal: false,
    onProjectsModal: false
  },
  slides: {
    isZoomed: false,
    currentRecord: 0,
    side: 'front',
    lastSlide: false,
    firstSlide: false
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
    image: 'assets/images/skills/JavaScript.jpg',
    alt: 'JavaScript',
    level: 10
  },
  {
    name: 'HTML-CSS',
    image: 'assets/images/skills/HTML-CSS.jpg',
    alt: 'HTML-CSS',
    level: 10
  },
  {
    name: 'React',
    image: 'assets/images/skills/react.jpg',
    alt: 'React',
    level: 10
  },
  {
    name: 'C/C++',
    image: 'assets/images/skills/C-C++.jpg',
    alt: 'C/C++',
    level: 10
  },
  {
    name: 'Python',
    image: 'assets/images/skills/python.jpg',
    alt: 'Python',
    level: 4
  },
  {
    name: 'Git',
    image: 'assets/images/skills/git.jpg',
    alt: 'Git',
    level: 8
  },
  {
    name: 'Linux',
    image: 'assets/images/skills/linux.jpg',
    alt: 'Linux',
    level: 7
  },
  {
    name: 'Qt',
    image: 'assets/images/skills/qt.jpg',
    alt: 'Qt',
    level: 4
  },
  {
    name: 'English',
    image: 'assets/images/skills/english.jpg',
    alt: 'English',
    level: 10
  },
  {
    name: 'Photoshop',
    image: 'assets/images/skills/photoshop.jpg',
    alt: 'Photoshop',
    level: 8
  },
  {
    name: 'Autocad',
    image: 'assets/images/skills/autocad.jpg',
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
    'front-image': 'assets/images/about me/about me - front.jpg',
    'front-alt': 'about me - front',
    'back-image': 'assets/images/about me/about me - back.jpg',
    'back-alt': 'about me - back',
    'back-side-html': `
        <p class="white">
          I'm a software developer and software engineering student passionate about front-end development, currently learning React. Most of my projects are personal passion projects where I experiment with blending code, art, music, and design. I pay close attention to details—because small touches make big differences in user experience. I'm seeking opportunities in front-end development where I can grow, collaborate, and create digital experiences that are both functional and artistic.
        </p>
      `
  },
  {
    name: 'eduction',
    'front-image': 'assets/images/about me/education - front.jpg',
    'front-alt': 'education - front',
    'back-image': 'assets/images/about me/education - back.jpg',
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
    'front-image': 'assets/images/about me/contact me - front.jpg',
    'front-alt': 'contact me - front',
    'back-image': 'assets/images/about me/contact me - back.jpg',
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
    'front-image': 'assets/images/projects/youtube clone with html, css - front.jpg',
    'front-alt': 'youtube clone with html, css - front',
    'back-image': 'assets/images/projects/youtube clone with html, css - back.jpg',
    'back-alt': 'youtube clone with html, css - back',
    'back-side-html': `
        <div>
          <p class="white">
            Github repository:
            <a
              href="https://github.com/Matin-Gholipoor/YouTube-Home-Page-Clone-HTML-CSS" target="_blank"
              style="color: lightblue;"
            >
              github.com/Matin-Gholipoor/YouTube-Home-Page-Clone-HTML-CSS
            </a>
          </p>

          <br>

          <p class="white">
            See the project:
            <a
              href="https://matin-gholipoor.github.io/YouTube-Home-Page-Clone-HTML-CSS/" target="_blank"
              style="color: lightblue;"
            >
              matin-gholipoor.github.io/YouTube-Home-Page-Clone-HTML-CSS
            </a>
          </p>
        </div>
      `
  },
  {
    name: 'miniprojects with html, css, js',
    'front-image': 'assets/images/projects/miniprojects with html, css, js - front.jpg',
    'front-alt': 'miniprojects with html, css, js - front',
    'back-image': 'assets/images/projects/miniprojects with html, css, js - back.jpg',
    'back-alt': 'miniprojects with html, css, js - back',
    'back-side-html': `
        <div>
          <p class="white">
            Github repository:
            <a
              href="https://github.com/Matin-Gholipoor/Mini-projects-with-JavaScript-HTML-CSS" target="_blank"
              style="color: lightblue;"
            >
              github.com/Matin-Gholipoor/Mini-projects-with-JavaScript-HTML-CSS
            </a>
          </p>

          <br>

          <p class="white">
            See the project:
            <a
              href="https://matin-gholipoor.github.io/Mini-projects-with-JavaScript-HTML-CSS/" target="_blank"
              style="color: lightblue;"
            >
              matin-gholipoor.github.io/Mini-projects-with-JavaScript-HTML-CSS
            </a>
          </p>
          <p class="neon-orange">
            At the end of the opened page, click on the project you want to see.
          </p>
        </div>
      `
  },
  {
    name: 'React Chatbot',
    'front-image': 'assets/images/projects/React Chatbot - front.jpg',
    'front-alt': 'React Chatbot',
    'back-image': 'assets/images/projects/React Chatbot - back.jpg',
    'back-alt': 'React Chatbot - back',
    'back-side-html': `
        <div>
          <p class="white">
            Github repository:
            <a
              href="https://github.com/Matin-Gholipoor/Chatbot-React" target="_blank"
              style="color: lightblue;"
            >
              github.com/Matin-Gholipoor/Chatbot-React
            </a>
          </p>

          <br>

          <p class="white">
            See the project:
            <a
              href="https://matin-gholipoor.github.io/Chatbot-React/" target="_blank"
              style="color: lightblue;"
            >
              matin-gholipoor.github.io/Chatbot-React
            </a>
          </p>
        </div>
      `
  },
  {
    name: 'Ecommerce Website - React',
    'front-image': 'assets/images/projects/Ecommerce Website - React - front.jpg',
    'front-alt': 'Ecommerce Website - React - front',
    'back-image': 'assets/images/projects/Ecommerce Website - React - back.jpg',
    'back-alt': 'Ecommerce Website - React - back',
    'back-side-html': `
        <div>
          <p class="white">
            Github repository:
            <a
              href="https://github.com/Matin-Gholipoor/Ecommerce-website-React" target="_blank"
              style="color: lightblue;"
            >
              github.com/Matin-Gholipoor/Ecommerce-website-React
            </a>
          </p>
        </div>
      `
  },
  {
    name: 'my portfolio',
    'front-image': 'assets/images/projects/my portfolio - front.jpg',
    'front-alt': 'my portfolio - front',
    'back-image': 'assets/images/projects/my portfolio - back.jpg',
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

volumeSlider.addEventListener('keydown', (event) => {
  event.preventDefault();
});

// disable scrolling with space
window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
  }
});

document.body.addEventListener('keyup', (event) => {
  if (event.key === ' ' && event.target === document.body) {
    event.preventDefault();
  }

  if (!state.game.isStarted && state.game.isLoaded) {
    if (event.key === ' ') {
      startGame();
    }
  }
  else if (state.game.onHome) {
    switch (event.key) {
      case 'ArrowRight':
        moveMainCharacter('right', 1);
        break;
      case 'ArrowLeft':
        moveMainCharacter('left', 1);
        break;
      case 'Enter':
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
        break;
      case 'Enter':
        toggleZoom();
        break;
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
        break;
      case 'Enter':
        toggleZoom();
        break;
      case ' ':
        toggleSide();
        break;
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
        break;
      case 'Enter':
        toggleZoom();
        break;
      case ' ':
        toggleSide();
        break;
    }
  }
});

mainCharacterContainer.addEventListener('transitionend', (event) => {
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

shelf1.addEventListener('click', () => {
  switch (state.mainCharacter.position) {
    case 0:
      displayModal();
      break;
    case 1:
      moveMainCharacter('left', 1);
      break;
    case 2:
      moveMainCharacter('left', 2);
      break;
  }
});

shelf2.addEventListener('click', () => {
  switch (state.mainCharacter.position) {
    case 0:
      moveMainCharacter('right', 1);
      break;
    case 1:
      displayModal();
      break;
    case 2:
      moveMainCharacter('left', 1);
      break;
  }
});

shelf3.addEventListener('click', () => {
  switch (state.mainCharacter.position) {
    case 0:
      moveMainCharacter('right', 2);
      break;
    case 1:
      moveMainCharacter('right', 1);
      break;
    case 2:
      displayModal();
      break;
  }
});

backButton.addEventListener('click', displayHome);

crtMonitorEffect.addEventListener('click', () => {
  if (!state.game.isStarted && state.game.isLoaded) {
    startGame();
  }
});

const resizeHandler = (entries) => {
  for (let entry of entries) {
    const width = entry.contentRect.width;
    const target = entry.target;

    if (target === dialogueParagraph) {
      dialogueParagraph.style.fontSize = (width / 195) + "rem";
    }

    else if (target === slideBackContent) {
      slideBackContent.style.fontSize = (width / 195) + "rem";
    }

    else if (target === shelf1) {
      console.log(shelfTitles)
      shelfTitles.forEach((shelfTitle) => {
        shelfTitle.style.fontSize = (width / 90) + "rem";
      });
    }

    else if (target === modal) {
      backButton.style.fontSize = (width / 250) + "rem";
      toggleSideButton.style.fontSize = (width / 250) + "rem";
      SlideNextButton.style.width = (width / 140) + "rem";
      SlidePreviousButton.style.width = (width / 140) + "rem";
    }

    else if (target === loadingScreen) {
      loadingMessage.style.fontSize = (width / 250) + "rem";
    }
  }
};

const observer = new ResizeObserver(resizeHandler);

observer.observe(dialogueParagraph);
observer.observe(slideBackContent);
observer.observe(shelf1);
observer.observe(modal);
observer.observe(loadingScreen);


init();

function init() {
  music.muted = true;
  music.volume = volumeSlider.value / 100;

  displayDialogue(3);

  mainCharacterImage.src = mainCharacterFigures[0].src;
  mainCharacterImage.alt = mainCharacterFigures[0].alt;

  loadedGameSection.style.display = 'none';
  startMessage.style.display = 'none';

  window.onload = showGame();
}

function moveMainCharacter(direction, times) {
  if (!state.mainCharacter.isMoving) {

    if (direction === "right") {
      switch (state.mainCharacter.position) {
        case 0:
          switch (times) {
            case 1:
              mainCharacterContainer.style.transform = 'translate(-130%, 0)';
              state.mainCharacter.position = 1;
              state.mainCharacter.isMoving = true;
              break;
            case 2:
              mainCharacterContainer.style.transform = 'translate(180%, 0)';
              state.mainCharacter.position = 2;
              state.mainCharacter.isMoving = true;
              break;
          }
          break;
        case 1:
          mainCharacterContainer.style.transform = 'translate(180%, 0)';
          state.mainCharacter.position = 2;
          state.mainCharacter.isMoving = true;
          break;
      }
    }
    else if (direction === 'left') {
      switch (state.mainCharacter.position) {
        case 2:
          switch (times) {
            case 1:
              mainCharacterContainer.style.transform = 'translate(-130%, 0)';
              state.mainCharacter.position = 1;
              state.mainCharacter.isMoving = true;
              break;
            case 2:
              mainCharacterContainer.style.transform = 'translate(-430%, 0)';
              state.mainCharacter.position = 0;
              state.mainCharacter.isMoving = true;
              break;
          }
          break;
        case 1:
          mainCharacterContainer.style.transform = 'translate(-430%, 0)';
          state.mainCharacter.position = 0;
          state.mainCharacter.isMoving = true;
          break;
      }
    }

    if (state.mainCharacter.isMoving) {
      if (direction === "right") {
        mainCharacterImage.src = mainCharacterFigures[2].src;
        mainCharacterImage.alt = mainCharacterFigures[2].alt;
        mainCharacterImage.loop = true;
        mainCharacterImage.autoplay = true;
      }
      else {
        mainCharacterImage.src = mainCharacterFigures[3].src;
        mainCharacterImage.alt = mainCharacterFigures[3].alt;
        mainCharacterImage.loop = true;
        mainCharacterImage.autoplay = true;
      }
    }
  }
}

async function endMainCharacterMovement() {
  mainCharacterImage.src = mainCharacterFigures[0].src;
  mainCharacterImage.alt = mainCharacterFigures[0].alt;
  mainCharacterImage.loop = false;
  mainCharacterImage.autoplay = false;

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
        <li>Explore collection with <span class="neon-yellow">Left</span> and <span class="neon-yellow">right arrows</span> using <span class="neon-yellow">keyboard</span> or <span class="neon-yellow">mouse</span>.</li>
        <li>Get back to Home with <span class="neon-yellow">Back button</span> above or <span class="neon-yellow">Escape</span>.</li>
        <li>Zoom in and out with <span class="neon-yellow">Enter</span> or <span class="neon-yellow">click on the record</span>.</li>
        <li>Flip cover with <span class="neon-yellow">space</span> or <span class="neon-yellow">Side button</span> below.</li>
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
        <li>Explore collection with <span class="neon-yellow">Left</span> and <span class="neon-yellow">right arrows</span> using <span class="neon-yellow">keyboard</span> or <span class="neon-yellow">mouse</span>.</li>
        <li>Get back to Home with <span class="neon-yellow">Back button</span> above or <span class="neon-yellow">Escape</span>.</li>
        <li>Zoom in and out with <span class="neon-yellow">Enter</span> or <span class="neon-yellow">click on the record</span>.</li>
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
        <li>Explore collection with <span class="neon-yellow">Left</span> and <span class="neon-yellow">right arrows</span> using <span class="neon-yellow">keyboard</span> or <span class="neon-yellow">mouse</span>.</li>
        <li>Get back to Home with <span class="neon-yellow">Back button</span> above or <span class="neon-yellow">Escape</span>.</li>
        <li>Zoom in and out with <span class="neon-yellow">Enter</span> or <span class="neon-yellow">click on the record</span>.</li>
        <li>Flip cover with <span class="neon-yellow">space</span> or <span class="neon-yellow">Side button</span> below.</li>
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

  mainCharacterImage.src = mainCharacterFigures[1].src;
  mainCharacterImage.alt = mainCharacterFigures[1].alt;

  modalBottomRow.style.display = 'flex';

  SlideNextButton.style.visibility = 'visible';
  SlidePreviousButton.style.visibility = 'visible';
  state.slides.lastSlide = false;
  state.slides.firstSlide = false;

  state.slides.side = 'front';

  backButton.style.visibility = 'visible';

  slideBackContent.innerHTML = '';

  // checking wether to display next button
  switch (state.mainCharacter.position) {
    case 0:
      if (state.slides.currentRecord === aboutMeInfo.length - 1) {
        SlideNextButton.style.visibility = 'hidden';
        state.slides.lastSlide = true;
      }
      break;
    case 1:
      if (state.slides.currentRecord === skillsInfo.length - 1) {
        SlideNextButton.style.visibility = 'hidden';
        state.slides.lastSlide = true;
      }
      break;
    case 2:
      if (state.slides.currentRecord === projectsInfo.length - 1) {
        SlideNextButton.style.visibility = 'hidden';
        state.slides.lastSlide = true;
      }
      break;
  }
  // cheking wether to display previous button
  if (state.slides.currentRecord === 0) {
    SlidePreviousButton.style.visibility = 'hidden';
    state.slides.firstSlide = true;
  }
}

function displayHome() {
  state.game.onHome = true;
  state.game.onSkillsModal = false;
  state.game.onAboutModal = false;
  state.game.onProjectsModal = false;

  modal.style.display = 'none';

  mainCharacterImage.src = mainCharacterFigures[0].src;
  mainCharacterImage.alt = mainCharacterFigures[0].alt;

  modalBottomRow.style.display = 'none';

  SlideNextButton.style.visibility = 'hidden';
  SlidePreviousButton.style.visibility = 'hidden';

  backButton.style.visibility = 'hidden';

  modalSlideContainer.style.width = '50%';

  state.slides.side = 'front';
  state.slides.currentRecord = 0;
  state.slides.isZoomed = false;

  guideList.innerHTML = `
    <li>Move with <span class="neon-yellow">left</span> and <span class="neon-yellow">right arrows</span> or <span class="neon-yellow">click</span> on shleves.</li>
    <li>Explore a shelf with <span class="neon-yellow">space</span> or <span class="neon-yellow">click</span> on it.</li>
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

      slideBackContent.innerHTML = aboutMeInfo[state.slides.currentRecord]['back-side-html'];
    }
    else {
      slideImage.src = aboutMeInfo[state.slides.currentRecord]['front-image'];
      slideImage.alt = aboutMeInfo[state.slides.currentRecord]['front-alt'];

      toggleSideButton.textContent = 'Back side';

      state.slides.side = 'front';

      slideBackContent.textContent = '';
    }
  }
  else if (state.game.onProjectsModal) {
    if (state.slides.side === 'front') {
      slideImage.src = projectsInfo[state.slides.currentRecord]['back-image'];
      slideImage.alt = projectsInfo[state.slides.currentRecord]['back-alt'];

      toggleSideButton.textContent = 'Front side';

      state.slides.side = 'back';

      slideBackContent.innerHTML = projectsInfo[state.slides.currentRecord]['back-side-html'];
    }
    else {
      slideImage.src = projectsInfo[state.slides.currentRecord]['front-image'];
      slideImage.alt = projectsInfo[state.slides.currentRecord]['front-alt'];

      toggleSideButton.textContent = 'Back side';

      state.slides.side = 'front';

      slideBackContent.textContent = '';
    }
  }
}

function toggleZoom() {
  if (state.slides.isZoomed) {
    modalSlideContainer.style.width = '50%';

    modalBottomRow.style.display = 'flex';

    if (!state.slides.lastSlide) {
      SlideNextButton.style.visibility = 'visible';
    }
    if (!state.slides.firstSlide) {
      SlidePreviousButton.style.visibility = 'visible';
    }

    backButton.style.visibility = 'visible';

    state.slides.isZoomed = false;
  }
  else {
    modalSlideContainer.style.width = '75%';

    modalBottomRow.style.display = 'none';

    SlideNextButton.style.visibility = 'hidden';
    SlidePreviousButton.style.visibility = 'hidden';

    backButton.style.visibility = 'hidden';

    state.slides.isZoomed = true;
  }
}

function startGame() {
  startMessage.style.display = 'none';
  guideList.style.display = 'block';

  state.game.isStarted = true;
  state.game.onHome = true;

  document.querySelectorAll('.shelf').forEach((shelf) => {
    shelf.style.pointerEvents = 'auto';
  });

  crtMonitorEffect.style.pointerEvents = 'none';

  displayDialogue(0);
  displayHome();
}

function showGame() {
  loadedGameSection.style.display = 'block';
  startMessage.style.display = 'block';

  loadingScreen.style.display = 'none';

  state.game.isLoaded = true;
}