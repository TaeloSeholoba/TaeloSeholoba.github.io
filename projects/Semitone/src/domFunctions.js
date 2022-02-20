const {JamBuddy} = require("../src/semitone");
class MyDomClass {
  constructor() {
    this.notes;
    this.wins = 0;
    this.buddy = new JamBuddy();
  }
  domManipulator() {
    this.notes = this.buddy.selectNotes();
    const displayInline = "inline";
    document.getElementById("displayNotes").innerHTML = this.notes;
    document.getElementById("explanation").innerHTML = "";
    document.getElementById("isCorrect").innerHTML = "";
    document.getElementById("myAnswer").style.display = displayInline;
    document.getElementById("submission").style.display = displayInline;
    document.getElementById("finalAnswer").innerHTML = "";
  }
  isAnswerCorrect(id) {
    const buddy = new JamBuddy();
    const isCorrect = "isCorrect";
    if (
      buddy.checkAnswer(parseInt(document.getElementById(id).value), this.notes)
    ) {
      document.getElementById(isCorrect).innerHTML =
        "You got it right .Well Done!";
      this.revealAnswer();
      this.streak();
    } else {
      document.getElementById(isCorrect).innerHTML = "Wrong answer! Try again";
      this.wins = 0;
      this.streak();
    }
  }
  revealAnswer() {
    const selectedNotes = document
      .getElementById("displayNotes")
      .innerHTML.split(",");
    const allNotes = this.buddy.notes;
    let explanation = "";
    for (let i = 0; i < allNotes.length; i++) {
      if (selectedNotes.includes(allNotes[i])) {
        explanation += `<b>${allNotes[i]}</b>, `;
      } else if (Array.isArray(allNotes[i])) {
        if (
          selectedNotes.includes(allNotes[i][0]) ||
          selectedNotes.includes(allNotes[i][1])
        ) {
          explanation += `<b>${allNotes[i][0]}/${allNotes[i][1]}</b>, `;
        } else {
          explanation += `${allNotes[i][0]}/${allNotes[i][1]}, `;
        }
      } else {
        explanation += allNotes[i] + ", ";
      }
    }
    explanation = explanation.slice(0, explanation.length - 2);
    document.getElementById("explanation").innerHTML = explanation;
   
  }
  streak() {
    document.getElementById("streak").innerHTML = `Streak: ${this.wins++}`;
  }
  showFinalAnswer(){
    let finalAnswer;
    const firstNote = document
      .getElementById("displayNotes")
      .innerHTML.split(",")[0];
    const secondNote = document
      .getElementById("displayNotes")
      .innerHTML.split(",")[1];
    function isFlatOrSharp(note, allNotes) {
      note = new RegExp("^" + note + "$");
      for (let i = 0; i < allNotes.length; i++) {
        if (
          note.test(allNotes[i]) ||
          note.test(allNotes[i][0]) ||
          note.test(allNotes[i][1])
        ) {
          return i;
        }
      }
    }
    const firstIndex = isFlatOrSharp(firstNote, this.buddy.notes);
    const secondIndex = isFlatOrSharp(secondNote, this.buddy.notes);
    if (secondIndex > firstIndex) {
      finalAnswer = secondIndex - firstIndex;
    } else {
      finalAnswer = this.buddy.notes.length - firstIndex + secondIndex;
    }
    document.getElementById("finalAnswer").innerHTML =
      "The final answer is " + finalAnswer;
  }
}
const myDom = new MyDomClass();
module.exports = { myDom };
