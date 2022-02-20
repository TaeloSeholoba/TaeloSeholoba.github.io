class JamBuddy {
  constructor() {
    this.notes = [
      "A",
      ["A#", "Bb"],
      "B",
      "C",
      ["C#", "Db"],
      "D",
      ["D#", "Eb"],
      "E",
      "F",
      ["F#", "Gb"],
      "G",
      ["G#", "Ab"],
    ],
      this.randomNotes = [];
  }
  selectNotes() {
    this.randomNotes = [];
    for (let i = 0; i < 2; i++) {
      let note = this.notes[parseInt(Math.random() * this.notes.length)];
      if (Array.isArray(note)) {
        this.randomNotes.push(note[parseInt(Math.random() * note.length)]);
      } else {
        this.randomNotes.push(note);
      }
    }

    return this.randomNotes;
  }

  noteIndex(randomNote) {
    let noteIndex = this.notes.indexOf(randomNote);

    if (randomNote.includes("#") || randomNote.includes("b")) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].includes(randomNote)) {
          noteIndex = this.notes.indexOf(this.notes[i]);
        }
      }
    }
    return noteIndex;
  }

  checkAnswer(answer,randomNotes = this.randomNotes) {
    let checker;
    const firstNote = this.noteIndex(randomNotes[0]);
    const secondNote = this.noteIndex(randomNotes[1]);

    if (secondNote > firstNote) {
      checker = secondNote - firstNote;
    } else {
      checker = this.notes.length - firstNote + secondNote;
    }

    return checker === answer;
  }
}


module.exports = { JamBuddy};
