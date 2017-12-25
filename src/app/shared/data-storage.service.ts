import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes(){
    const token = this.authService.getToken();

    console.log(this.recipeService.getRecipes());
    return this.http.put('https://ng-recipe-book-14d4e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipe-book-14d4e.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                //console.log(recipe);
                recipe['ingredients'] = [];
                //recipe.name = 'FETCHED_' + recipe.name; //so the update is obvious
              }
            }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        (error: Response) => {
          console.log("Something went wrong!");
          console.log(error);
        }
      );

    //everything is set here, without the need to subscribe in the header...
    // return this.http.get('https://ng-recipe-book-14d4e.firebaseio.com/recipes.json')
    //   .map(
    //     (response: Response) => {
    //       const data = response.json();
    //       // console.dir(data);
    //       // for (const server of data) {
    //       //   server.name = 'FETCHED_' + server.name;
    //       // } //so the update is obvious
    //       return data;
    //     }
    //   )
    //   .catch(
    //     (error: Response) => {
    //       // console.log(error);
    //       return Observable.throw('Something went wrong');
    //     }
    //   );
  }
}
