import { Router } from "express";
import { CookpadController } from "../controller";

class CookpadRoute {
  constructor(
    public router: Router = Router(),
    private readonly cookpadController: CookpadController = new CookpadController()
  ) {
    this.routes();
  }
  routes() {
    this.router.get("/food", this.cookpadController.getFoods);
    this.router.get("/recipe", this.cookpadController.getRecipe);
  }
}

export const cookpadroute = new CookpadRoute();
