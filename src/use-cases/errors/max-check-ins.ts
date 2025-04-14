export class MaxCheckInsError extends Error {
  constructor() {
    super("Max check-in reached");
  }
}
