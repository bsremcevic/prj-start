import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'tasty Schnitzel',
      'A super tasty one',
      'https://www.fillmurray.com/300/202',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Salt', 20)
      ]),
    new Recipe(
      'Big fat burger',
      'With mustard',
      'https://www.fillmurray.com/300/201',
      [
        new Ingredient('Pepper', 1),
        new Ingredient('Honey', 20)
      ]),
    new Recipe(
      'Another one',
      'This is simply a test',
      'https://www.fillmurray.com/300/200',
      [
        new Ingredient('Water', 1),
        new Ingredient('Salad', 20)
      ])
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
    //bc direct reference is returned and if we change something in the array, it will be changed on the original one.
    //therefore we call slice so new array is returned, which is the exact copy of this onRecipeSelected
    //that way there is no way to get the original array from outside
  }

  addIngredientsToShoppingList(inigredients: Ingredient[]){
    this.slService.addIngredients(inigredients);
  }
}
