import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { RecipeService } from '../recipe.service';
//import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        //if the params has a parameter of 'id' it will be a string,
        //otherwise, it will be undefined. and therefore != will result in true.
        //it is going to be an edit mode since id exists.
        //if id does not exist and it results in false, then we are in NEW mode.
        console.log(this.editMode);

        //when route params change, that indicates that we reloaded the page.
        //that is when we call the initForm method to create the form.
        this.initForm();
      }
    );
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    //since the value of our form has the same format of our recipe model, and the same names(name, imagePath..), you can skip this step of saving it in a new constant.
    //and just pass this recipeForm.value. Because the object is the same to fit one of out recipes.
    //the advantage of reactie approach.

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) //only positive numbers
        ])
      })
    )

    //we convert this into the FormArray bc Angular/TS does not know that this is a FormArray type
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route}); //navigate just one level back
    console.log("");
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]); //this is initialized with the default value of an empty array. Since we dont have any ingredients by default.
    //these are all empty, and will prepopulate the controls/input fields with nothing when NEW mode is selected
    //or will prepopulate controls with the values of the current recipe for EDIT mode.

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        //we first check if there are any ingredients
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) //only positive numbers
              ])
            })
          );
        }

      }
    }


    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }



}
