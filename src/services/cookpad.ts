import puppeteer, { Page } from "puppeteer";

interface food {
  title: string;
  recipeId: string;
  imageUrl: string;
}

interface recipe {
  title: string;
  ingredements: string[];
  steps: string[];
}

class CookpadService {
  public async getRecipe(recipeId: string): Promise<recipe> {
    const browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();
    try {
      await page.goto(`https://cookpad.com/id/resep/${recipeId}`);
      const title: string = await page.$eval("section > h1", (titleelement) =>
        titleelement.innerHTML.trim()
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
        ingredements,
        steps,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getFoods(foodName: string, pageNumber: number): Promise<food[]> {
    const browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();
    try {
      await page.goto(
        `https://cookpad.com/id/cari/${foodName}?page=${pageNumber}`
      );
      await page.waitForSelector("ul");
      const foodBlock = await page.$("#main_contents");
      return foodBlock!.$$eval("ul > li.block-link", (liList) => {
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
      });
    } catch (error) {
      throw error;
    }
  }
}
