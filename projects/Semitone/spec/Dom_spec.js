const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const { myDom } = require("../src/domFunctions");
const { JamBuddy } = require("../src/semitone");
global.JamBuddy = JamBuddy;
global.document = new JSDOM(fs.readFileSync("index.html")).window.document;
const myButton = document.querySelector("#getRandomNotes");
const displayNotes = document.getElementById("displayNotes");
describe("Dom manipulation", () => {
  beforeEach(() => {
    displayNotes.textContent = "";
    document.getElementById("getRandomNotes").addEventListener("click", () => {
      myDom.domManipulator();
    });
    document.getElementById("submission").addEventListener("click", () => {
      myDom.isAnswerCorrect("myAnswer");
    });
  });
  
  it("Should have a button written 'Get random notes'", () => {
    expect(myButton.textContent).toBe("Get random notes");
  });
  it("Should be empty before the button is pressed", () => {
    expect(displayNotes.textContent).toBe("");
    document.getElementById("getRandomNotes").click();
    expect(displayNotes.textContent).not.toBe("");
  });
  it("Should get two notes when a button is clicked", () => {
    document.getElementById("getRandomNotes").click();
    expect(displayNotes.textContent.split(",").length).toBe(2);
  });
  it("Should have an input where a user can write their answer", () => {
    expect(document.querySelector("input")).not.toEqual(null);
  });
  it("Should have an input which accepts only numbers", () => {
    expect(document.querySelector("#myAnswer").type).toBe("number");
  });
  it("Should contain a button with 'Submit Answer'", () => {
    expect(document.querySelector("#submission").textContent).toEqual(
      "Submit Answer"
    );
  });
  it("Should display the message “Wrong answer! Try again” when the user enters an incorrect answer", () => {
    document.getElementById("getRandomNotes").click();
    myDom.notes = ["A", "B"];
    document.getElementById("myAnswer").value = 1;
    document.getElementById("submission").click();
    expect(document.getElementById("isCorrect").textContent).toBe(
      "Wrong answer! Try again"
    );
  });
  it("Should display the message “You got it right .Well Done!” when the user enters a correct answer", () => {
    document.getElementById("getRandomNotes").click();
    myDom.notes = ["A", "A#"];
    document.getElementById("myAnswer").value = 1;
    document.getElementById("submission").click();
    expect(document.getElementById("isCorrect").textContent).toBe(
      "You got it right .Well Done!"
    );
  });
});
describe("Awesome gui", () => {
  beforeEach(() => {
    myDom.domManipulator();
    explanation.innerHTML = "";
  });
  const explanation = document.getElementById("explanation");
  it("Should contain notes before any selection", () => {
    expect(document.getElementById("displayNotes").innerHTML).not.toEqual("");
  });
  it("Should have a button with the text Reveal answer", () => {
    let containsReveal = false;
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerHTML === "Reveal answer") {
        containsReveal = true;
        break;
      }
    }
    expect(containsReveal).toEqual(true);
  });
  it("Should have an empty div tag for explanation id", () => {
    expect(explanation.innerHTML).toEqual("");
  });
  it("Should reveal all the notes with the selected ones highlighted when the reveal answers button is clicked", () => {
    myDom.revealAnswer();
    expect(explanation.innerHTML).toEqual(jasmine.any(String));
  });
  it("Should be emptied when the getRandomNotes button is clicked", () => {
    myDom.revealAnswer();
    expect(explanation.innerHTML).not.toEqual("");
    myDom.domManipulator();
    expect(explanation.innerHTML).toEqual("");
  });
  it("Should have a populated “explanation” div when the user submits the correct answer", () => {
    expect(explanation.innerHTML).toEqual("");
    myDom.notes = ["A", "Bb"];
    document.getElementById("myAnswer").value = 1;
    myDom.isAnswerCorrect("myAnswer");
    expect(explanation.innerHTML).not.toEqual("");
  });
  it("Should Keep track of how many correct answers the user gets in a row and display this answer on the screen",()=>{
    
  })
});
