import { food, cookpadService, recipe } from "../services/cookpad";
import { Request, Response } from "express";

export class CookpadController {
  async getFoods(req: Request, res: Response) {
    try {
      let foodName: string = req.query.name?.toString()!;
      let page: string = req.query.page?.toString()!;
      let foods: food[] = await cookpadService.getFoods(
        foodName,
        parseInt(page)
      );
      return res.status(200).send({
        status: 200,
        message: `Success get ${foodName} page ${page}`,
        data: foods,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
    }
  }

  async getRecipe(req: Request, res: Response) {
    try {
      let recipeId: string = req.query.id!.toString();
      let recipe: recipe = await cookpadService.getRecipe(recipeId);
      return res.status(200).json({
        status: 200,
        message: `Success get recipe ${recipeId}`,
        data: recipe,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
    }
  }
}
