import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Schabowy',
  //     'Kotlet',
  //     'https://upload.wikimedia.org/wikipedia/commons/5/50/Schabowe_%281%29.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('Potatos', 3)]
  //   ),
  //   new Recipe(
  //     'Schabowy 2',
  //     'Kotlet',
  //     'https://upload.wikimedia.org/wikipedia/commons/5/50/Schabowe_%281%29.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('Potatos', 3)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor(private slService: ShoppingListService) {}
}
