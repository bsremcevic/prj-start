import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetail {
  @Input() recipe: Recipe;
  //console.log(this.singleRecipe);
}
