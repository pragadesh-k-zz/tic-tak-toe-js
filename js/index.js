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
    this.chance = 9;
    this.editButton = document.querySelector("#edit-btn");
    this.inputone = document.querySelector("#p1edit");
    this.inputtwo = document.querySelector("#p2edit");
    this.intervals = null;
    this.gameOn = false;
    this.gameBox = document.querySelector("#game-container");
    this.wrapper = document.querySelector("#wrapper");
    this.playerOneName = document.querySelector("#playeronename");
    this.playerTwoName = document.querySelector("#playertwoname");
    this.playButton = document.querySelector("#play-btn");
    this.resetButton = document.querySelector("#reset-btn");
    this.turn = document.querySelectorAll(".turn");
    this.saveButton = document.querySelector("#save-btn");
  }

  emptyFiller() {
    let box = Object.values(this.boxes);
    const empty = box.filter((ele) => {
      return ele.innerHTML == "";
    });
    if (empty.length != 0) {
      const emptyBox = empty[Math.floor(Math.random() * empty.length)];

      emptyBox.innerHTML = `${(this.chance + 1) % 2 !== 0 ? "x" : "o"}`;

      emptyBox.style.animationName = "scaling";
      setTimeout(() => {
        emptyBox.style.removeProperty("animation-name");
      }, 1000);
    }
  }

  countDownfun() {
    let countdown = 3;
    //countdown interval
    let countInterval = setInterval(() => {
      if (countdown >= 0) {
        this.boxes[4].innerHTML = `${countdown > 0 ? countdown-- : "Go!"}`;
      }
    }, 1000);
    //AFTER COUNTDOWN
    setTimeout(() => {
      clearInterval(countInterval);
      this.boxes[4].innerHTML = ``;
      //this.timerDiv.style.visibility = "visible";
      this.resetButton.removeAttribute("disabled");
      this.playerTurn();
      //this.roundTime();
      this.eventListeners().onState();
    }, 5000);
  }

  gameCheck(box, turn) {
    let vertices = [];
    const symbol = turn % 2 !== 0 ? "x" : "o";
    const directions = {
      horizontal: [
        [this.boxes[0], this.boxes[1], this.boxes[2]],
        [this.boxes[3], this.boxes[4], this.boxes[5]],
        [this.boxes[6], this.boxes[7], this.boxes[8]],
      ],
      vertical: [
        [this.boxes[0], this.boxes[3], this.boxes[6]],
        [this.boxes[1], this.boxes[4], this.boxes[7]],
        [this.boxes[2], this.boxes[5], this.boxes[8]],
      ],
      diagonal: [
        [this.boxes[0], this.boxes[4], this.boxes[8]],
        [this.boxes[2], this.boxes[4], this.boxes[6]],
      ],
    };
    //filter from all vertices
    for (const direction of Object.values(directions)) {
      for (const square of direction) {
        for (const element of square) {
          element === box ? vertices.push(square) : null;
        }
      }
    }
    //filter from selected vertices
    for (const item of vertices) {
      let result = item.filter((ele) => {
        return ele.innerHTML == symbol;
      });
      if (result.length == 3) {
        return symbol;
      }
    }
  }

  gameOnState() {
    this.gameOn = true;
    this.editButton.setAttribute("disabled", "true");
    this.playButton.setAttribute("disabled", "true");
    this.countDownfun();
  }

  gameOffState() {
    this.gameOn = false;
    this.resetButton.setAttribute("disabled", "true");
    this.playButton.removeAttribute("disabled");
    this.editButton.removeAttribute("disabled");
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

  playerTurn() {
    let count = 5;
    if (this.chance % 2 !== 0) {
      this.turn[1].innerHTML = "";
      this.turn[0].innerHTML = `
      <span class="fa fa-circle active">`;
    } else {
      this.turn[0].innerHTML = "";
      this.turn[1].innerHTML = `
      <span class="fa fa-circle active">`;
    }
    //CREATE TIME BAR
    const timerBar = document.createElement("div");
    const timer = this.wrapper.querySelector(".timer");
    timerBar.className = "timer progress-bar progress-bar-striped";
    // UPDATE TIME BAR
    if (timer === null) {
      this.wrapper.insertBefore(timerBar, this.gameBox);
    } else {
      timer.remove();
      this.wrapper.insertBefore(timerBar, this.gameBox);
    }
    // 5S GAME TIMER
    this.intervals = setInterval(() => {
      count--;
      if (count === 0) {
        //CLEAR TIMER
        clearInterval(this.intervals);
        console.log("time out");
        //CHECK FOR PAIRS
        let ver = this.gameCheck(e.target, this.chance);
        ver ? console.log(`player wins ${ver}`) : null;
        //REDUCE CHANCE BY 1
        this.chance--;
        // AUTO XO_FILLER AFTER TIME ENDS
        this.emptyFiller();
        //UPDATING TURN
        this.playerTurn();
      }
    }, 1000);
  }

  xo_marker = (e) => {
    if (
      Object.values(this.boxes).includes(e.target) &&
      e.target.innerHTML !== "x" &&
      e.target.innerHTML !== "o"
    ) {
      //ADDING XO_MARKER
      e.target.innerHTML = `${this.chance % 2 !== 0 ? "x" : "o"}`;
      //CLEARING TIMER
      clearInterval(this.intervals);
      //CHECK FOR PAIRS
      let ver = this.gameCheck(e.target, this.chance);
      ver ? console.log(`player wins ${ver}`) : null;
      //DECREMENT CHANCE
      this.chance--;
      //updating turn
      this.playerTurn();
      //ADDING and Removing ANIMATION
      e.target.style.animationName = "scaling";
      setTimeout(() => {
        e.target.style.removeProperty("animation-name");
      }, 1000);
    }
  };

  eventListeners() {
    //onstate actions
    const onState = () => {
      this.resetButton.addEventListener("click", (e) => {
        window.location.reload();
      });
      this.gameBox.addEventListener("click", this.xo_marker);
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
