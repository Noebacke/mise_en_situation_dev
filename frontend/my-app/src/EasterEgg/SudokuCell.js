export class SudokuCell {
  constructor(value, pencilmarks, isGiven, isPenciled) {
    this.value = value;
    this.pencilmarks = pencilmarks;
    this.isGiven = isGiven;
    this.isPenciled = isPenciled;
  }
}