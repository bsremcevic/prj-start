import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetail } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const recipesRoutes: Routes = [
  { path: '', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent }, //the component to be rendered when neither of the children is selected
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    {path: ':id', component: RecipeDetail },
    {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class RecipesRoutingModule {}
