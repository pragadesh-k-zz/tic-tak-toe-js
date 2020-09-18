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
    //this.timerDiv = document.querySelector("#timer");
  }
  
  emptyFiller(){
    let box = Object.values(this.boxes);
    const empty = box.filter((ele)=>{
      return ele.innerHTML == "";
    })
    if (empty.length != 0) {
      const emptyBox = empty[Math.floor(Math.random()*(empty.length))];
      
      emptyBox.innerHTML = `${(this.chance +1)% 2 !== 0 ? "x" : "o"}`;
      
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
  
  gameCheck(box,turn){
    let mySet = new Set();
    let squares = {
      b1 : mySet.add()
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
    //this.timerDiv.style.visibility = "hidden";
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
    if (this.chance % 2 !== 0) {
      this.turn[1].innerHTML = "";
      this.turn[0].innerHTML = `
      <span class="fa fa-circle active">`;
    } else {
      this.turn[0].innerHTML = "";
      this.turn[1].innerHTML = `
      <span class="fa fa-circle active">`;
    }
    const timerBar = document.createElement("div");
    const timer = this.wrapper.querySelector(".timer");
    timerBar.className = "timer progress-bar progress-bar-striped";
    if (timer === null) {
      this.wrapper.insertBefore(timerBar, this.gameBox);
    } else {
      timer.remove();
      this.wrapper.insertBefore(timerBar, this.gameBox);
    }
    
    let count = 5;
    this.intervals = setInterval(()=>{
      count--;
      if (count === 0) {
        //count = 10;
        clearInterval(this.intervals);
        console.log("time out");
        this.chance--;
        //this.emptyFiller().innerHTML = `${this.chance % 2 !== 0 ? "x" : "o"}`;
        this.emptyFiller()
        
        this.playerTurn();
        
        this.chance === 0 ? 
        () => {
          clearInterval(this.intervals);
          this.gameOffState();
        } : null
        }
    },1000);
  }

  xo_marker = (e) => {
    if (
      Object.values(this.boxes).includes(e.target) &&
      e.target.innerHTML !== "x" &&
      e.target.innerHTML !== "o"
    ) {
      //ADDING MARKER
      e.target.innerHTML = `${this.chance % 2 !== 0 ? "x" : "o"}`;
      clearInterval(this.intervals);
      //DECREMENT CHANCE
      console.log(this.chance--);
      //changing player turn indicator
      this.playerTurn();
      //start round timing
      //this.roundTime();
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
