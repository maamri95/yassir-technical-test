export abstract class Transformer<From=undefined, To=undefined> {
  abstract transform(from: From): To;
}
