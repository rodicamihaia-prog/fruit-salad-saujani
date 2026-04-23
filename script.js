const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

let calories = 0
const fruitCalories = {}

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}

function fetchFruitData(fruit){
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then((data)=> addFruit(data))
        .catch((error)=>console.log(error))
    fetch(`https://pixabay.com/api/?key=55568485-07aafd107a3e9d114d7a254b2&q=${fruit}+fruit&image_type=photo&category=food`)
        .then((response) => response.json())
        .then((data) => {
            const img = document.createElement('img');
            img.src = data.hits[0].webformatURL;
            img.width = 200; 
            document.body.appendChild(img);
        })
        .catch((error) => console.log(error))
}

function processResponse(response){
    if (response.status === 200){
        return response.json()
    } else {
        throw "Error: https status code " + response.status
    }
}

function addFruit(fruit) {
    const li = document.createElement("li")
    li.textContent = fruit.name
    li.addEventListener("click", removeFruit, {once: true})
    fruitList.appendChild(li)

    fruitCalories[fruit.name] = fruit.nutritions.calories
    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
}

function removeFruit(e) {
    const fruitName = e.target.textContent
    calories -= fruitCalories[fruitName]
    fruitNutrition.textContent = calories
    delete fruitCalories[fruitName]

    e.target.remove()
}