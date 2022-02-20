/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {JamBuddy} = __webpack_require__(/*! ../src/semitone */ \"./src/semitone.js\");\nclass MyDomClass {\n  constructor() {\n    this.notes;\n    this.wins = 0;\n    this.buddy = new JamBuddy();\n  }\n  domManipulator() {\n    this.notes = this.buddy.selectNotes();\n    const displayInline = \"inline\";\n    document.getElementById(\"displayNotes\").innerHTML = this.notes;\n    document.getElementById(\"explanation\").innerHTML = \"\";\n    document.getElementById(\"isCorrect\").innerHTML = \"\";\n    document.getElementById(\"myAnswer\").style.display = displayInline;\n    document.getElementById(\"submission\").style.display = displayInline;\n    document.getElementById(\"finalAnswer\").innerHTML = \"\";\n  }\n  isAnswerCorrect(id) {\n    const buddy = new JamBuddy();\n    const isCorrect = \"isCorrect\";\n    if (\n      buddy.checkAnswer(parseInt(document.getElementById(id).value), this.notes)\n    ) {\n      document.getElementById(isCorrect).innerHTML =\n        \"You got it right .Well Done!\";\n      this.revealAnswer();\n      this.streak();\n    } else {\n      document.getElementById(isCorrect).innerHTML = \"Wrong answer! Try again\";\n      this.wins = 0;\n      this.streak();\n    }\n  }\n  revealAnswer() {\n    const selectedNotes = document\n      .getElementById(\"displayNotes\")\n      .innerHTML.split(\",\");\n    const allNotes = this.buddy.notes;\n    let explanation = \"\";\n    for (let i = 0; i < allNotes.length; i++) {\n      if (selectedNotes.includes(allNotes[i])) {\n        explanation += `<b>${allNotes[i]}</b>, `;\n      } else if (Array.isArray(allNotes[i])) {\n        if (\n          selectedNotes.includes(allNotes[i][0]) ||\n          selectedNotes.includes(allNotes[i][1])\n        ) {\n          explanation += `<b>${allNotes[i][0]}/${allNotes[i][1]}</b>, `;\n        } else {\n          explanation += `${allNotes[i][0]}/${allNotes[i][1]}, `;\n        }\n      } else {\n        explanation += allNotes[i] + \", \";\n      }\n    }\n    explanation = explanation.slice(0, explanation.length - 2);\n    document.getElementById(\"explanation\").innerHTML = explanation;\n   \n  }\n  streak() {\n    document.getElementById(\"streak\").innerHTML = `Streak: ${this.wins++}`;\n  }\n  showFinalAnswer(){\n    let finalAnswer;\n    const firstNote = document\n      .getElementById(\"displayNotes\")\n      .innerHTML.split(\",\")[0];\n    const secondNote = document\n      .getElementById(\"displayNotes\")\n      .innerHTML.split(\",\")[1];\n    function isFlatOrSharp(note, allNotes) {\n      note = new RegExp(\"^\" + note + \"$\");\n      for (let i = 0; i < allNotes.length; i++) {\n        if (\n          note.test(allNotes[i]) ||\n          note.test(allNotes[i][0]) ||\n          note.test(allNotes[i][1])\n        ) {\n          return i;\n        }\n      }\n    }\n    const firstIndex = isFlatOrSharp(firstNote, this.buddy.notes);\n    const secondIndex = isFlatOrSharp(secondNote, this.buddy.notes);\n    if (secondIndex > firstIndex) {\n      finalAnswer = secondIndex - firstIndex;\n    } else {\n      finalAnswer = this.buddy.notes.length - firstIndex + secondIndex;\n    }\n    document.getElementById(\"finalAnswer\").innerHTML =\n      \"The final answer is \" + finalAnswer;\n  }\n}\nconst myDom = new MyDomClass();\nmodule.exports = { myDom };\n\n\n//# sourceURL=webpack://npm_demo/./src/domFunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { myDom } = __webpack_require__(/*! ./domFunctions */ \"./src/domFunctions.js\");\n\nmyDom.domManipulator();\nmyDom.streak();\n\ndocument.getElementById(\"getRandomNotes\").addEventListener(\"click\", () => {\n  myDom.domManipulator();\n});\ndocument.getElementById(\"submission\").addEventListener(\"click\", () => {\n  myDom.isAnswerCorrect(\"myAnswer\");\n});\n// document.getElementById(\"revealAnswer\").addEventListener(\"click\", () => {\n//   myDom.revealAnswer();\n//   myDom.showFinalAnswer();\n// });\ndocument.getElementById(\"revealAnswer\").addEventListener(\"click\", () => {\n  myDom.revealAnswer();\n  myDom.showFinalAnswer();\n});\n\n\n//# sourceURL=webpack://npm_demo/./src/index.js?");

/***/ }),

/***/ "./src/semitone.js":
/*!*************************!*\
  !*** ./src/semitone.js ***!
  \*************************/
/***/ ((module) => {

eval("class JamBuddy {\n  constructor() {\n    this.notes = [\n      \"A\",\n      [\"A#\", \"Bb\"],\n      \"B\",\n      \"C\",\n      [\"C#\", \"Db\"],\n      \"D\",\n      [\"D#\", \"Eb\"],\n      \"E\",\n      \"F\",\n      [\"F#\", \"Gb\"],\n      \"G\",\n      [\"G#\", \"Ab\"],\n    ],\n      this.randomNotes = [];\n  }\n  selectNotes() {\n    this.randomNotes = [];\n    for (let i = 0; i < 2; i++) {\n      let note = this.notes[parseInt(Math.random() * this.notes.length)];\n      if (Array.isArray(note)) {\n        this.randomNotes.push(note[parseInt(Math.random() * note.length)]);\n      } else {\n        this.randomNotes.push(note);\n      }\n    }\n\n    return this.randomNotes;\n  }\n\n  noteIndex(randomNote) {\n    let noteIndex = this.notes.indexOf(randomNote);\n\n    if (randomNote.includes(\"#\") || randomNote.includes(\"b\")) {\n      for (let i = 0; i < this.notes.length; i++) {\n        if (this.notes[i].includes(randomNote)) {\n          noteIndex = this.notes.indexOf(this.notes[i]);\n        }\n      }\n    }\n    return noteIndex;\n  }\n\n  checkAnswer(answer,randomNotes = this.randomNotes) {\n    let checker;\n    const firstNote = this.noteIndex(randomNotes[0]);\n    const secondNote = this.noteIndex(randomNotes[1]);\n\n    if (secondNote > firstNote) {\n      checker = secondNote - firstNote;\n    } else {\n      checker = this.notes.length - firstNote + secondNote;\n    }\n\n    return checker === answer;\n  }\n}\n\n\nmodule.exports = { JamBuddy};\n\n\n//# sourceURL=webpack://npm_demo/./src/semitone.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;