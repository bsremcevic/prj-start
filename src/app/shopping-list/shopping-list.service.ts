import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

//@Injectable()

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
    //return a copy of this array.
    //you can use original if you are sure of what are you doing
  }

  getIngredient(index: number){
    return this.ingredients[index];
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

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice()); //again, pass the copy of the updated array so it is visible in shopping list
  }

  deleteIngredient(index: number){
    console.log("pera", index);
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice()); //again, pass the copy of the updated array so it is visible in shopping list
  }
}
