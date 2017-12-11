import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetail implements OnInit {
  recipe: Recipe;
  //console.log(this.singleRecipe);
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(){
    // const id = this.route.snapshot.params['id'];
    // this.recipe = this.recipeService.getRecipe(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        // const id = this.route.snapshot.params['id'];
        // this.recipe = this.recipeService.getRecipe(id);
        //probaj posle
      }
    );
  }

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

  onEditRecipe(){
    console.log("ee");
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

    //more complex but someties needed approach
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
