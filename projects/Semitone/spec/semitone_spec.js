const { JamBuddy } = require("../src/semitone");
const buddy = new JamBuddy();
describe("selectNotes function: ", () => {
  it("Should return only two notes", () => {
    expect(buddy.selectNotes().length).toBe(2);
  });
});

describe("checkAnswer function: ", () => {
  it("Should return true when the difference in semitones ['C', 'D'] is correct", () => {
    buddy.randomNotes = ["C", "D"];
    expect(buddy.checkAnswer(2)).toBe(true);
  });
  it("Should return true when the difference between sharp notes and normal notes is correct", () => {
    buddy.randomNotes = ["D#", "F"];
    expect(buddy.checkAnswer(2)).toBe(true);
  });
  it("Shoud return the true when the answer between notes calculated in a clockwise direction is correct", () => {
    buddy.randomNotes = ["F", "D#"];
    expect(buddy.checkAnswer(10)).toBe(true);
  });
  it("should return true when the difference between two sharp notes calculated clockwise is correct", () => {
    buddy.randomNotes = ["G#", "A#"];
    expect(buddy.checkAnswer(2)).toBe(true);
  });
  it("Should return false when the answer is wrong",() =>{
    buddy.randomNotes = ["A","A#"];
    expect(buddy.checkAnswer(4)).toBe(false);
  });
  it("Should be able to handle sharp and flat notes",()=>{
   buddy.randomNotes = ['A#', 'Db']
   expect(buddy.checkAnswer(3)).toBe(true);
  })
});
