import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeList {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  public recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Fresh_meat.jpg/1024px-Fresh_meat.jpg'),
    new Recipe('A test Recipe 2', 'This is simply a test 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Fresh_meat.jpg/1024px-Fresh_meat.jpg'),
    new Recipe('A test Recipe 3', 'This is simply a test 3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Fresh_meat.jpg/1024px-Fresh_meat.jpg')
  ];

  onRecipeSelected(recipe: Recipe){
    //console.log(e);
    this.recipeWasSelected.emit(recipe);
  }
}
