const result = document.getElementById("result");
let meals = []; //will contain the search's result
const form = document.querySelector("form");
const input = document.querySelector("input");

async function fetchMeals(search){    
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+search)
    .then((response) => response.json())
    .then((data) => meals = data.meals)
 
    console.log(meals);
}

function mealsDisplay(){
    if (meals ===null){
        result.innerHTML = "<h2>No match to your search</h2>";
    }else{        
        meals.length = 12
        result.innerHTML = meals.map((meal) =>{
        
            let ingredients = [];
            for (i =1; i<21 ; i++){
                if (meal[`strIngredient${i}`]) {
                    let ingredient = meal[`strIngredient${i}`];
                    let mesure = meal[`strMeasure${i}`];
                    ingredients.push(`<li>${ingredient} - ${mesure}`); // we push the result in the table in list 
                }
            }
            return `
            <li class ="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src =${meal.strMealThumb} alt ="photo of ${meal.strMeal}">
            <ul>
                ${ingredients.join("")}
            </ul>
            </li>
            `
        }
        ).join("");
    }
}
input.addEventListener("input", (e)=>{
    fetchMeals(e.target.value); // recover the input in real-time
});

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    mealsDisplay();
});

fetchMeals();
