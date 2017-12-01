export class Ingredient {
  constructor(public name: string, public amount: number){}

  //the above is the same as:
  /*
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount: number;
  }
  */
}
