let isPlaying = false;
let isPlayerReady = false;
let isPlayerOnAir = false;
let isGameSettled = true;

const startGame = () => {
  resetScore();
  setGameOverVisibility("hidden");
  removeStones();
  setInstructionVisibility("hidden");
  setBackgroundAnimationState("running");
  startPlayerRoll();
  generateStone();
  isPlaying = true;
};

const gameOver = () => {
  isPlaying = false;
  setGameOverVisibility("visible");
  makePlayerFall();
  setBackgroundAnimationState("paused");
  pauseStonesAnimation();
  settleGame();
};

const settleGame = () => {
  isGameSettled = false;
  setTimeout(() => {
    isGameSettled = true;
  }, 2100);
};

const addScore = () => {
  const score = document.getElementById("player-score");
  score.textContent = parseInt(score.textContent) + 1;
};

const resetScore = () => {
  document.getElementById("player-score").textContent = 0;
};

const makePlayerJump = () => {
  changePlayerState("jump.gif");
  isPlayerOnAir = true;
  setTimeout(() => {
    changePlayerState("roll.gif");
    isPlayerOnAir = false;
  }, 2000);
};

const startPlayerRoll = () => {
  changePlayerState("start-roll.gif");
  isPlayerReady = false;
  setTimeout(() => {
    changePlayerState("roll.gif");
    isPlayerReady = true;
  }, 1800);
};

const makePlayerFall = () => {
  setTimeout(() => {
    changePlayerState("fallen.png");
  }, 780);
  changePlayerState("falling.gif");
};

const changePlayerState = (state) => {
  document.getElementById("player").src = `images/skater/${state}`;
};

const setBackgroundAnimationState = (state) => {
  document.getElementById("landscape").style.animationPlayState = state;
  document.getElementById("park").style.animationPlayState = state;
  document.getElementById("road").style.animationPlayState = state;
};

const setInstructionVisibility = (state) => {
  document.getElementById("instruction").style.visibility = state;
};

const setGameOverVisibility = (state) => {
  document.getElementById("game-over").style.visibility = state;
};

const generateStone = () => {
  const type = Math.floor(Math.random() * 3) + 1;
  const stone = document.createElement("img");
  stone.src = `images/stone-${type}.png`;
  stone.className = "stone moveToPlayer";

  stone.addEventListener("animationend", (event) => {
    handleAnimationEnd(event);
  });
  document.getElementById("screen").appendChild(stone);

  const delay = Math.random() * (4 - 2) + 2;
  setTimeout(() => {
    if (isPlaying) {
      generateStone();
    }
  }, delay * 1000);
};

const pauseStonesAnimation = () => {
  const stones = document.getElementsByClassName("stone");
  for (let stone of stones) {
    stone.style.animationPlayState = "paused";
  }
};

const removeStones = () => {
  const stones = document.getElementsByClassName("stone");
  while (stones.length > 0) {
    stones[0].remove();
  }
};

const handleAnimationEnd = (event) => {
  const stone = event.target;
  // Once the animation of the stone moving in front of the player end.
  if (event.animationName === "moveStoneToPlayer") {
    // Play the animation of moving the stone behind the player.
    stone.className = "stone moveToEnd";
    // Activate the bump detector.
    detectBump();
  } else {
    stone.parentNode.removeChild(event.target);
  }
};

const detectBump = () => {
  // Set an interval to check if the player is on air (jumped).
  const detector = setInterval(() => {
    // If player in not on air end the game and remove the interval
    if (!isPlayerOnAir) {
      clearInterval(detector);
      gameOver();
    }
  }, 10);
  // When the stone passed the player and the game is still playing, Add score
  setTimeout(() => {
    if (isPlaying) {
      addScore();
    }
    // Remove the interval after the stone passes the player
    clearInterval(detector);
  }, 1300);
};

document.addEventListener("keydown", (event) => {
  const key = event.code;
  if (key === "Space" && !isPlaying && isGameSettled) {
    startGame();
  } else if (
    key === "ArrowUp" &&
    isPlayerReady &&
    !isPlayerOnAir &&
    isPlaying
  ) {
    makePlayerJump();
  }
});
