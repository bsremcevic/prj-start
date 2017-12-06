import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

//@Injectable()

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
    //return a copy of this array.
    //you can use original if you are sure of what are you doing
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    console.log(ingredient, this.ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    //this will emit a new updated copy of the array so we could populate the array in the shopping list component

  }

  addIngredients(ingredients: Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients); //push the array of ingredients as individual ingredients by using the "SPREAD" operator "..."
    this.ingredientsChanged.next(this.ingredients.slice()); //then pass the copy of the updated array
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   console.log(this.ingredients);
  // }

}
