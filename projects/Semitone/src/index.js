const { myDom } = require("./domFunctions");

myDom.domManipulator();
myDom.streak();

document.getElementById("getRandomNotes").addEventListener("click", () => {
  myDom.domManipulator();
});
document.getElementById("submission").addEventListener("click", () => {
  myDom.isAnswerCorrect("myAnswer");
});

document.getElementById("revealAnswer").addEventListener("click", () => {
  myDom.revealAnswer();
  myDom.showFinalAnswer();
});
