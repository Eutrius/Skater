const instruction = document.getElementById("instruction");
const landscape = document.getElementById("landscape");
const park = document.getElementById("park");
const player = document.getElementById("player");

let isPlaying = false;
let isPlayerReady = false;

const startGame = () => {
  isPlaying = true;
  instruction.style.visibility = "hidden";
  moveBackground();
  readyPlayer();
};

const moveBackground = () => {
  const iterationAndTiming = "infinite linear";
  landscape.style.animation = "moveLandscape 1000s " + iterationAndTiming;
  park.style.animation = "moveGround 250s " + iterationAndTiming;
  road.style.animation = "moveGround 50s " + iterationAndTiming;
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
  player.src = `images/skater/${state}.gif`;
};

document.addEventListener("keydown", (event) => {
  const key = event.code;
  if (key === "Space" && !isPlaying) {
    startGame();
  } else if (key === "ArrowUp" && isPlayerReady) {
    playerJump();
  }
});
