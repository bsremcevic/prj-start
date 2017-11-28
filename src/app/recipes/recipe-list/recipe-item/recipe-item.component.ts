import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeList } from '../recipe-list.component';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'
})

export class RecipeItem {
  @Input() singleRecipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();


  onSelected(){
    this.recipeSelected.emit();
    //console.log(sentRecipe);
  }
}
