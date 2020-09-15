console.log("Tic tak toe");
//$('.modal').modal('show')

class TikTakToe {
  constructor() {
    this.boxes = document.querySelectorAll(".box");
    this.clearBoxes = () => {
      this.boxes.forEach((box) => {
        box.innerHTML = "";
      });
    };
    this.editButton = document.querySelector("#edit-btn");
    this.inputone = document.querySelector("#p1edit");
    this.inputtwo = document.querySelector("#p2edit");
    this.gameOn = false;
    this.playerOneName = document.querySelector("#playeronename");
    this.playerTwoName = document.querySelector("#playertwoname");
    this.playButton = document.querySelector("#play-btn");
    this.resetButton = document.querySelector("#reset-btn");
    this.scoreBoardElements = document.querySelectorAll(".clear");
    this.saveButton = document.querySelector("#save-btn");
    this.timerDiv = document.querySelector("#timer");
  }

  gameOnState() {
    let countdown = 3;
    this.gameOn = true;
    this.editButton.setAttribute("disabled", "true");
    this.playButton.setAttribute("disabled", "true");
    let countInterval = setInterval(() => {
      if (!countdown <= 0) {
        this.boxes[4].innerHTML = `${
          !countdown <= 0 ? countdown-- : countdown
        }`;
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(countInterval);
      this.boxes[4].innerHTML = ``;
      this.timerDiv.style.visibility = "visible";
      this.resetButton.removeAttribute("disabled");
      this.eventListeners().onState();
    }, 4000);
  }

  gameOffState() {
    this.gameOn = false;
    this.resetButton.setAttribute("disabled", "true");
    this.timerDiv.style.visibility = "hidden";
    this.clearBoxes();
    this.eventListeners().offState();
  }

  playerNames = (e) => {
    if (
      this.inputone.value.trim() !== "" &&
      this.inputtwo.value.trim() !== ""
    ) {
      this.playerOneName.innerHTML = this.inputone.value;
      this.playerTwoName.innerHTML = this.inputtwo.value;
    }

    //clear input
    [this.inputone.value, this.inputtwo.value] = ["", ""];
  };

  eventListeners() {
    //onstate actions
    const onState = () => {
      this.resetButton.addEventListener("click", (e) => {
        console.log("reset");
        this.gameOnState();
        this.clearBoxes();
      });
    };

    //offstate actions
    const offState = () => {
      this.playButton.addEventListener("click", (e) => {
        this.gameOnState();
      });
      this.editButton.addEventListener("click", (e) => {
        $(".modal").modal("show");
      });
      this.saveButton.addEventListener("click", this.playerNames);
    };

    return {
      onState: onState,
      offState: offState,
    };
  }
}
/*------- X -----*/

//initializing class
const game = new TikTakToe();

if (!game.gameOn) {
  game.gameOffState();
}
