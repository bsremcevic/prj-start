import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs/Subscription';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeList implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(){
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    console.log("new");
    this.router.navigate(['new'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
