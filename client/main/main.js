const list = document.getElementById("list");
const form = document.getElementById("form");
const add = document.getElementById("popupButton");
const heroPopup = document.getElementById("heroPopup");
let hero = document.getElementById("hero");
const done = document.getElementById("closePopup");
let allIngredients = [];
const numOfRecipies = 30;
const ingredientName = document.querySelector("#additem");

add.addEventListener("click", () => {
  heroPopup.classList.add("open");
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const ingredient = document.createElement("li");
  if (ingredientName.value.trim() !== "") {
    allIngredients.push(ingredientName.value);
    ingredient.textContent = ingredientName.value;
    ingredient.classList.add("ingredient");
    list.appendChild(ingredient);
    ingredientName.value = " ";
    ingredient.addEventListener("click", () => {
      ingredient.parentNode.removeChild(ingredient);
      const index = allIngredients.indexOf(ingredient.textContent);
      if (index !== -1) {
        allIngredients.splice(index, 1);
      }
    });
  }
});
done.addEventListener("click", () => {
  heroPopup.classList.remove("open");
});
done.addEventListener("click", () => {
  while (hero.firstChild) {
    hero.removeChild(hero.firstChild);
  }
  let row = document.createElement("div");
  row.className = `row num${0}`;
  hero.appendChild(row);
  if (allIngredients.length != 0) {
    let result = allIngredients.map((item) => item.toLowerCase()).join(",+");
    result = result.replace(/\s/g, "");
    fetch(`/api/data/${result}`).then(async (res) => {
      const data = await res.json();
      for (let i = 0; i < numOfRecipies; i++) {
        const currRecipe = data[i];
        const card = document.createElement("div");
        card.className = "card";
        const image = document.createElement("img");
        image.src = currRecipe.image;
        image.className = "cardImg";
        const name = document.createElement("h2");
        name.innerText = currRecipe.title;
        name.className = "cardTitle";
        const ingredients = document.createElement("p");
        ingredients.className = "missedIngredients";
        if (
          currRecipe.missedIngredients &&
          currRecipe.missedIngredients.length > 0
        ) {
          ingredients.innerText += "Missing Ingredients: ";
          currRecipe.missedIngredients.forEach((ingredient) => {
            ingredients.innerText += ingredient.name + ", ";
          });
          ingredients.innerText = ingredients.innerText.slice(0, -2);
        }
        row.appendChild(card);
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(ingredients);
        if ((i + 1) % 5 == 0) {
          row = document.createElement("div");
          row.className = `row num${(i + 1) / 5}`;
          hero.appendChild(row);
        }
      }
    });
  }
});
