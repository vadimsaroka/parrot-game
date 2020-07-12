document.addEventListener("DOMContentLoaded", () => {
  const parrot = document.querySelector(".grid-parrot");
  let isJumping = false;
  const grid = document.querySelector(".grid");
  const alert = document.querySelector("#grid-alert");
  let gravity = 0.9;
  let isGameOver = false;
  let timer = 0;
  const finalScore = document.querySelector(".alert-finalscore");
  const currentTime = document.querySelector("#wrapper-currentTime");

  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }

  let clock = () => {
    timer++;
    currentTime.innerHTML = `Current time: ${timer} second(s)`;
  };

  document.addEventListener("keypress", control);

  let position = 0;

  clockId = setInterval(clock, 1000);

  // parrot
  function jump() {
    let count = 0;

    let timerId = setInterval(function () {
      if (count > 20) {
        clearInterval(timerId);
        let dowmTimerId = setInterval(() => {
          if (count === 0) {
            clearInterval(dowmTimerId);
            isJumping = false;
          }
          position -= 0.3;
          count--;
          position = position * gravity;
          parrot.style.bottom = position + "rem";
        }, 20);
      } else {
        position += 3;
        count++;
        position = position * gravity;
        parrot.style.bottom = position + "rem";
      }
    }, 20);
  }

  // obstacles
  function generateObstacle() {
    let randomTime = Math.max(2000, Math.random() * 6000);
    let obstaclePosition = window.innerWidth / 12;
    const obstacle = document.createElement("div");

    if (!isGameOver) obstacle.classList.add("abstacle");

    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + "rem";

    let timerId = setInterval(() => {
      currentparrotPosition = parrot.getBoundingClientRect();
      currentobstaclePosition = obstacle.getBoundingClientRect();

      // checking if a game is not over
      if (
        currentparrotPosition.right >= currentobstaclePosition.left &&
        currentparrotPosition.bottom >= currentobstaclePosition.top &&
        currentparrotPosition.right < currentobstaclePosition.right
      ) {
        clearInterval(timerId);
        alert.style.display = "flex";
        isGameOver = true;
        clearInterval(clockId);
        finalScore.innerHTML = `Time: ${timer} second(s)`;

        //removes all unnecessary objects after the game is over
        while (grid.childElementCount > 1) {
          grid.removeChild(grid.lastChild);
        }
      }

      // removes obstacles that are not visible
      if (obstaclePosition < -10) {
        obstacle.remove();
      }

      obstaclePosition -= 0.55;
      obstacle.style.left = obstaclePosition + "rem";
    }, 20);

    // generate new obstacles
    if (!isGameOver) {
      setTimeout(generateObstacle, randomTime);
    }
  }

  generateObstacle();
});

// const startAgain = document.querySelector(".btn");
// restart game
document.querySelector(".btn").addEventListener("click", () => {
  console.log("The button was clicked!");
  location.reload();
});
