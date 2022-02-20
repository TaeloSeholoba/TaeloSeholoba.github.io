const { MemoryGame } = require("../src/memoryGame");
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;
global.document = new JSDOM(fs.readFileSync("index.html")).window.document;
describe("selectPhoto function", () => {
  let memoryGame;
  beforeEach(() => {
    memoryGame = new MemoryGame();
    memoryGame.currentMatch = "";
    for (let i = 0; i < memoryGame.ids.length; i++) {
      document.getElementById(memoryGame.ids[i]).style.display = "none";
    }
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it("Should have hidden photo's when no picture is selected", () => {
    expect(
      /^$|none/.test(document.querySelector("#first").style.display)
    ).toEqual(true);
  });
  it("Should Show the photo when it is selected", () => {
    memoryGame.selectPhoto("second");
    expect(document.querySelector("#second").style.display).toBe("block");
  });
  it("Should hide both photos when they are not the same", () => {
    document.getElementById("third").src = "images/20Century.jpeg";
    document.getElementById("fourth").src = "images/Paramount.png";
    memoryGame.selectPhoto("third");
    memoryGame.selectPhoto("fourth");
    jasmine.clock().tick(500);
    expect(document.getElementById("third").style.display).toBe("none");
    expect(document.getElementById("fourth").style.display).toBe("none");
  });
  it("Should show both pictures when they match", () => {
    document.getElementById("fifth").src = "images/Paramount.png";
    document.getElementById("sixth").src = "images/Paramount.png";
    memoryGame.selectPhoto("fifth");
    memoryGame.selectPhoto("sixth");
    jasmine.clock().tick(500);
    expect(document.getElementById("fifth").style.display).toBe("block");
    expect(document.getElementById("sixth").style.display).toBe("block");
  });
  it("should hide the picture when it's selected twice", () => {
    memoryGame.selectPhoto("seventh");
    memoryGame.selectPhoto("seventh");
    jasmine.clock().tick(500);
    expect(document.getElementById("seventh").style.display).toBe("none");
  });
  it("should show both pictures for half a second then hide them if they are not the same", () => {
    document.getElementById("eighth").src = "images/20Century.jpeg";
    document.getElementById("ninth").src = "images/Paramount.png";
    memoryGame.selectPhoto("eighth");
    memoryGame.selectPhoto("ninth");
    jasmine.clock().tick(499);
    expect(document.getElementById("eighth").style.display).toBe("block");
    expect(document.getElementById("ninth").style.display).toBe("block");
    jasmine.clock().tick(500);
    expect(document.getElementById("eighth").style.display).toBe("none");
    expect(document.getElementById("ninth").style.display).toBe("none");
  });
});

describe("Configure Grid Size feature: ", () => {
  beforeEach(() => {
    memoryGame = new MemoryGame();
  });
  const twoFraction = "1fr 1fr";
  const threeFraction = "1fr 1fr 1fr";
  it("Should contain 3 buttons written default, 2x2, and 2x3", () => {
    expect(document.body.innerHTML).toContain("Default");
    expect(document.body.innerHTML).toContain(memoryGame.twoByTwo);
    expect(document.body.innerHTML).toContain(memoryGame.twoByThree);
  });
  it("Should change the grid of the game to the required size when clicked", () => {
    memoryGame.configureGridSize("default");
    expect(document.getElementById("myGrid").style.gridTemplateColumns).toEqual(
      `${twoFraction} ${twoFraction}`
    );

    memoryGame.configureGridSize(memoryGame.twoByTwo);
    expect(document.getElementById("myGrid").style.gridTemplateColumns).toEqual(
      twoFraction
    );
    expect(document.getElementById("myGrid").style.gridTemplateRows).toEqual(
      twoFraction
    );
    memoryGame.configureGridSize(memoryGame.twoByThree);
    expect(document.getElementById("myGrid").style.gridTemplateColumns).toEqual(
      threeFraction
    );
    expect(document.getElementById("myGrid").style.gridTemplateRows).toEqual(
      twoFraction
    );
  });
  it("Should hide all other pictures when the size has been changed", () => {
    memoryGame.configureGridSize(memoryGame.twoByTwo);
    expect(document.getElementById("fifth").style.display).toBe("none");
    expect(document.getElementById("sixth").style.display).toBe("none");
  });
});
describe("timer feature", () => {
  beforeEach(() => {
    memoryGame = new MemoryGame();
    jasmine.clock().install();
    document.getElementById("showTime").innerHTML = "time elapsed: 00:00:00";
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it("Should not start if no picture has been selected", () => {
    clearInterval(memoryGame.myTimer);
    jasmine.clock().tick(1000);
    expect(document.getElementById("showTime").innerHTML).toBe(
      "time elapsed: 00:00:00"
    );
  });
  it("Should start timer when a picture is selected", () => {
    memoryGame.selectPhoto("first");
    jasmine.clock().tick(1000);
    expect(document.getElementById("showTime").innerHTML).toBe(
      "time elapsed: 00:00:01"
    );
  });
  it("Should stop when all the pictures are selected", () => {
    memoryGame.numberOfBlocks = 1;
    memoryGame.selectPhoto("first");
    jasmine.clock().tick(1000);
    expect(document.getElementById("showTime").innerHTML).toBe(
      "time elapsed: 00:00:01"
    );
    jasmine.clock().tick(2000);
    expect(document.getElementById("showTime").innerHTML).toBe(
      "time elapsed: 00:00:01"
    );
  });
});

describe("Count flips feature", () => {
  beforeEach(() => {
    document.getElementById("cardFlips").innerHTML = ""
  })
  const memoryGame = new MemoryGame();
  it("Should be blank before the game ends", () => {
    expect(document.getElementById("cardFlips").innerHTML).toBe("");
  });
  it("Should return how many flips it took for a game to be completed", () => {
    memoryGame.configureGridSize(memoryGame.twoByTwo);
    document.getElementById("first").src = memoryGame.pictures[0];
    document.getElementById("second").src = memoryGame.pictures[0];
    document.getElementById("third").src = memoryGame.pictures[1];
    document.getElementById("fourth").src = memoryGame.pictures[1];
    memoryGame.selectPhoto("first");
    memoryGame.selectPhoto("second");
    memoryGame.selectPhoto("third");
    memoryGame.selectPhoto("fourth");
    expect(document.getElementById("cardFlips").innerHTML).toBe("You completed this game in 4 moves")
  });
});
