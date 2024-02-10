let isPlaying = false;
let isPlayerReady = false;

const startGame = () => {
  isPlaying = true;
  setInstructionVisibility("hidden");
  setBackgroundAnimationState("running");
  readyPlayer();
};

const playerJump = () => {
  changePlayerState("jump");
  setTimeout(() => {
    changePlayerState("roll");
  }, 2000);
};

const readyPlayer = () => {
  changePlayerState("start-roll");
  setTimeout(() => {
    changePlayerState("roll");
    isPlayerReady = true;
  }, 1800);
};

const changePlayerState = (state) => {
  document.getElementById("player").src = `images/skater/${state}.gif`;
};

const setBackgroundAnimationState = (state) => {
  document.getElementById("landscape").style.animationPlayState = state;
  document.getElementById("park").style.animationPlayState = state;
  document.getElementById("road").style.animationPlayState = state;
};

const setInstructionVisibility = (state) => {
  document.getElementById("instruction").style.visibility = state;
};

document.addEventListener("keydown", (event) => {
  const key = event.code;
  if (key === "Space" && !isPlaying) {
    startGame();
  } else if (key === "ArrowUp" && isPlayerReady) {
    playerJump();
  }
});
