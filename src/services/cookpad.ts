import puppeteer, { Page } from "puppeteer";
import { getRandom } from "random-useragent";

export interface food {
  title: string;
  recipeId: string;
  imageUrl: string;
}

export interface recipe {
  title: string;
  imageUrl: string;
  ingredements: string[];
  steps: string[];
}

export class CookpadService {
  public async getRecipe(recipeId: string): Promise<recipe> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page: Page = await browser.newPage();
    await page.setUserAgent(getRandom()!);
    try {
      await page.goto(`https://cookpad.com/id/resep/${recipeId}`);
      const title: string = await page.$eval("h1", (titleelement) =>
        titleelement.innerHTML.trim()
      );
      const imageUrl: string = await page.$eval(
        "#recipe_image > a > div > picture > img",
        (img) => img.getAttribute("src")!
      );
      const ingredements: string[] = await page.$$eval(
        ".ingredient-list > ol > li",
        (ingredements) => {
          return Promise.all(
            ingredements.map((ingredement) =>
              ingredement.querySelector("div")!.innerText.trim()
            )
          );
        }
      );
      const steps: string[] = await page.$$eval("#steps > ol > li", (steps) => {
        return Promise.all(
          steps.map((step) => step.querySelector("div")!.innerText)
        );
      });
      await browser.close();
      return {
        title,
        imageUrl,
        ingredements,
        steps,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getFoods(foodName: string, pageNumber: number): Promise<food[]> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page: Page = await browser.newPage();
    await page.setUserAgent(getRandom()!);

    try {
      await page.goto(
        `https://cookpad.com/id/cari/${foodName}?page=${pageNumber}`
      );
      await page.waitForSelector("ul");
      const foodBlock = await page.$("#main_contents");
      const foodField: food[] = await foodBlock!.$$eval(
        "ul > li.block-link",
        (liList) => {
          return Promise.all(
            liList.map((li) => {
              let recipe: string = li.getAttribute("id")!;
              let recipeId: string =
                recipe.split("_")[recipe.split("_").length - 1];
              let title: string = li.querySelector("a")!.innerText!;
              let imageUrl: string = li
                .querySelector(
                  "div.flex-none.w-20.xs\\:w-auto.h-auto.relative > picture > img"
                )!
                .getAttribute("data-original")!;

              return {
                recipeId,
                title,
                imageUrl: imageUrl,
              };
            })
          );
        }
      );
      await browser.close();
      return foodField;
    } catch (error) {
      throw error;
    }
  }
}

export const cookpadService = new CookpadService();
