import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetail {
  @Input() recipe: Recipe;
  //console.log(this.singleRecipe);

  constructor(private recipeService: RecipeService){}

  onAddToShoppingList(ingredients: Ingredient[]){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);


    //MY SOLUTION WORKS WITHOUT ISSUE
    //ADJUSTED THE CODE TO MATCH THE TUTORIAL
    //I used shopping list service right away, he used recipe service that will use shopping list service

    //the only "down side" to my approach is that emits a lot of events. Which is not a bad things with for example 30 ingredients....
    //It is viable option
    
    // ingredients.forEach((elem) => {
    //   this.shoppingListService.addIngredient(elem);
    // });
  }
}
