import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

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
      }
    );
  }

}
