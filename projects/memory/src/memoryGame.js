class MemoryGame {
  constructor() {
    this.currentMatch = "";
    this.pictures = [
      "images/WaltDisney.jpeg",
      "images/universal.jpeg",
      "images/dreamWorks.jpg",
      "images/avangers.jpg",
      "images/Paramount.png",
      "images/20Century.jpeg",
    ];
    this.ids = [
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
      "tenth",
      "eleventh",
      "twelfth",
    ];
    this.blocks = [
      "block1",
      "block2",
      "block3",
      "block4",
      "block5",
      "block6",
      "block7",
      "block8",
      "block9",
      "block10",
      "block11",
      "block12",
    ];
    this.numberOfBlocks = this.ids.length;
    this.openedPictures = [];
    this.cardFlips = 0;
    this.gameStarted = false;
    this.myTimer;
    this.twoByThree = "2x3";
    this.twoByTwo = "2x2";
  }

  populatePictures(defaultLength = this.ids.length) {
    document.getElementById("showTime").innerHTML = "time elapsed: 00:00:00";
    const chosen = [];

    for (let i = 0; i < defaultLength; i++) {
      let count = 0;
      const randomNum = parseInt((Math.random() * defaultLength) / 2);

      for (let j = 0; j < defaultLength; j++) {
        if (chosen[j] === this.pictures[randomNum]) {
          count++;
        }
      }
      if (count < 2) {
        chosen.push(this.pictures[randomNum]);
      } else {
        i--;
      }
    }
    for (let k = 0; k < defaultLength; k++) {
      document.getElementById(this.ids[k]).src = chosen[k];
    }
    this.cardFlips = 0;
  }
  selectPhoto(id) {
      let audio = new Audio("/home/recruit/Documents/myProjects/Taelo-Seholoba-222-memory-game-in-vanilla-js-javascript/sounds/button-21.mp3");
      audio.play()
   
    if (this.gameStarted === false) {
      this.timer();
      this.gameStarted = true;
      document.getElementById("showTime").style.display = "block";
    }
    const myImage = document.getElementById(id);
    if (!this.openedPictures.includes(myImage)) {
      if (this.currentMatch.length === 0) {
        myImage.style.display = "block";
        this.currentMatch = myImage;
        this.cardFlips++;
      } else {
        if (
          this.currentMatch.src === myImage.src &&
          myImage.id !== this.currentMatch.id
        ) {
          this.openedPictures.push(myImage);
          this.openedPictures.push(this.currentMatch);
          myImage.style.display = "block";
          this.currentMatch = "";
          this.cardFlips++;
        } else {
          myImage.style.display = "block";
          setTimeout(() => {
            if (this.currentMatch !== "" && myImage.style.diplay !== "block") {
              document.getElementById(this.currentMatch.id).style.display =
                "none";
              myImage.style.display = "none";
              this.currentMatch = "";
            } else {
              this.currentMatch = myImage;
            }
          }, 500);
          this.cardFlips++;
        }
      }
    }
    if (this.openedPictures.length === this.numberOfBlocks) {
      document.getElementById("cardFlips").style.display = "block";
      document.getElementById(
        "cardFlips"
      ).innerHTML = `You completed this game in ${this.cardFlips} moves`;
    }
  }
  timer() {
    let counter = 0;
    const start = () => {
      counter++;
      document.getElementById("showTime").innerHTML =
        "time elapsed: " + this.visiblePicCounter(counter, myTimer);
    };
    const myTimer = setInterval(start, 1000);
    this.myTimer = myTimer;
  }
  visiblePicCounter(counter, myTimer) {
    let blockedPhotos = 0;
    let message = "congratulations you finished this game in ";
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    for (let i = 0; i < this.numberOfBlocks; i++) {
      if (document.getElementById(this.ids[i]).style.display === "block") {
        blockedPhotos++;
      }
    }
    if (counter >= 3600) {
      hours = Math.floor(counter / 3600);
      minutes = Math.floor(counter / 60) % 60;
      seconds = (counter % 3600) - minutes * 60;
      message += `${hours} hour(s) and ${minutes} minute(s) and ${seconds} second(s)`;
    } else if (counter >= 60) {
      minutes = Math.floor(counter / 60);
      seconds = counter % 60;
      message += `${minutes} minute(s) and ${seconds} second(s)`;
    } else {
      seconds = counter;
      message += `${seconds} second(s)`;
    }
    if (blockedPhotos === this.numberOfBlocks) {
      clearInterval(myTimer);
      document.getElementById("timer").style.display = "block";
      document.getElementById("timer").innerHTML = message;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  }
  configureGridSize(size) {
    document.getElementById("timer").style.display = "none";
    document.getElementById("cardFlips").style.display = "none";
    clearInterval(this.myTimer);
    this.gameStarted = false;
    this.openedPictures = [];
    this.currentMatch = "";
    const twoFraction = "1fr 1fr";
    const threeFraction = "1fr 1fr 1fr";
    for (let i = 0; i < this.ids.length; i++) {
      document.getElementById(this.ids[i]).style.display = "none";
    }
    this.hidePictures(size);
    switch (size) {
      case "default":
        document.getElementById(
          "myGrid"
        ).style.gridTemplateColumns = `${twoFraction} ${twoFraction}`;
        this.populatePictures();
        this.numberOfBlocks = this.ids.length;
        break;
      case this.twoByThree:
        this.rowsAndColumns(twoFraction, threeFraction);
        this.populatePictures(6);
        this.numberOfBlocks = 6;
        break;
      case this.twoByTwo:
        this.rowsAndColumns(twoFraction, twoFraction);
        this.populatePictures(4);
        this.numberOfBlocks = 4;
    }
  }
  hidePictures(size) {
    const changeDisplay = (i = 0, display) => {
      for (i; i < this.blocks.length; i++) {
        document.getElementById(this.blocks[i]).style.display = display;
      }
    };
    changeDisplay(0, "block");
    if (size === this.twoByThree) {
      changeDisplay(6, "none");
    } else if (size === this.twoByTwo) {
      changeDisplay(4, "none");
    }
  }
  rowsAndColumns(rows, columns) {
    document.getElementById("myGrid").style.gridTemplateColumns = columns;
    document.getElementById("myGrid").style.gridTemplateRows = rows;
  }
}

const memoryGame = new MemoryGame();
module.exports = { MemoryGame };
