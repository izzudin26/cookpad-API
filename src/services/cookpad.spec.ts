import { CookpadService } from "./cookpad";

describe("Testing Cookpad Scrap Service", () => {
  const cookpad = new CookpadService();

  it("Will get foods from foodname and pagination", async () => {
    let foods = await cookpad.getFoods("Kue", 1);

    expect(foods.length).not.toEqual(0);
  });

  it("Will get recipe kue pukis", async () => {
    let recipes = await cookpad.getRecipe("15429130");
    expect(recipes.title).toEqual("Kue pukis");
    expect(recipes.ingredements).toEqual([
      "Bahan adonan :",
      "2 butir telur",
      "250 gr terigu serbaguna / protein sedang",
      "100 gr gula pasir",
      "10 gr susu bubuk",
      "370 ml santan hangat (rebus dgn daun pandan lalu biarkan hangat)",
      "1 sdt ragi instan / merk fermipan",
      "1 sacet kental manis",
      "Sejumput garam",
      "1/2 sdt vanili cair / bubuk",
      "75 gr mentega / margarin leleh",
      "Bahan topping :",
      "sesuai selera Mesis coklat atau lainnya",
    ]);
    expect(recipes.steps).toEqual([
      "Pecah telur dalam wadah, masukan gula lalu mixer sampai mengembang.",
      "Setelah mengembang masukan ragi instan, terigu saya masukan ½ dulu, masukan santan ½, dan 1 sacet SKM\n" +
        "Aduk lagi dgn speed rendah hanya sampai tercampur rata tidak perlu lama-lama",
      "Masukan lagi ½ dari terigu dan sisa santan, tambahkan susu bubuk dan sejumput garam lalu aduk lagi..",
      "Setelah tercampur, masukan lelehan margarin/mentega kedalam adonan dan aduk balik dengan spatula.",
      "Diamkan adonan selama minimal 1 jam supaya bergelembung dan mengembang.\n" +
        "Tahap ini penting, supaya menghasilkan kue pukis yang mengembang.",
      "Panaskan cetakan kue pukis selama 5 menit dengan api kecil saja.. lalu oles dengan margarin. tuang adonan kedalam cetakan ¾ bagian. Karena kalau diisi full adonan akan beleber mengembang. Tutup cetakan agar bagian atas pukis matang merata",
      "Setelah ½ matang dan bagian atasnya tidak begitu basah, beri topping meses coklat. Sesekali cek bagian bawah kue pukis agar tidak gosong. Jika sudah kecoklatan angkat dan oles sisi samping dengan mentega/margarin.",
    ]);
  });
});
