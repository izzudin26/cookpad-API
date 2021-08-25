import puppeteer from "puppeteer";

interface food {
  title: string;
  recipeId: string;
  imageUrl: string;
}

class CookpadService {
  public async getFood(foodName: string, pageNumber: number) {
    let listFoods: food[] = [];
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(
        `https://cookpad.com/id/cari/${foodName}?page=${pageNumber}`
      );
      await page.waitForSelector("ul");
      const foodBlock = await page.$("#main_contents");
      return foodBlock!.$$eval("ul > li.block-link", (liList) => {
        return Promise.all(
          liList.map((li) => {
            let recipeId: string = li.getAttribute("id")!;
            let title: string = li.querySelector("a")!.innerText!;
            // const regex = /<img.*?data-original='(.*?)'/;
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

const cook = new CookpadService();
const getFod = async () => {
  console.log(await cook.getFood("api", 1));
};
getFod();
