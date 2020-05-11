let mealJson = JSON.parse(localStorage.getItem("meals"));

let index = [];

const BASE_URL = "https://api.spoonacular.com/recipes/"

let searchTerm;

let meals = [];

let meal = [
  "Tacos",
  "Perogies",
  "Cheese Hamburger Helper",
  "Mac and Cheese",
  "Steak",
  "Hamburgers",
  "Pork Chops",
  "Pizza",
  "Beer Braised Chicken",
  "Breakfast for Dinner",
  "Grilled Pork Tenderloin",
  "Spaghetti Carbonara",
  "Meatloaf",
  "Pot Roast",
];

let defaultz = [
  "Tacos",
  "Perogies",
  "Cheese Hamburger Helper",
  "Mac and Cheese",
  "Steak",
  "Hamburgers",
  "Pork Chops",
  "Pizza",
  "Beer Braised Chicken",
  "Breakfast for Dinner",
  "Grilled Pork Tenderloin",
  "Spaghetti Carbonara",
  "Meatloaf",
  "Pot Roast",
];

let main = $(".main-list");

let side = $(".large");

let ideas;


$("#start-search").on("click", async function(event){
  event.preventDefault();
  main.empty();
  searchTerm = $(".search-terms").val()
  getSearch();
})

async function getSearch(){
try {
    let response = await fetch(`/search?searchTerm=${searchTerm}`),
    data = await response.json();
    console.log(data);
    info = data
    data.results.results.forEach(post => {
      displayData(post);
    })
  } catch (error) {
    console.log(error);
  }
  $(".search-terms").val("");
};

function displayData(post){
  main.append(`<div class="mealsearch"><span class="add-meal-click"><h2><a href="${post.sourceUrl}" target="_blank">${post.title}</a></h2></span>
  <br><img src="https://spoonacular.com/recipeImages/${post.image}" height="250" width="250"><button class="add-meal">Add Meal</button></div>`)

}

function displayIngredients(info){
  side.empty();

  console.log(info.strMeasure1)
  side.append(`
  ${info.strMeasure1}${info.strIngredient1}<br>${info.strMeasure2}${info.strIngredient2}<br>
  ${info.strMeasure3}${info.strIngredient3}<br>${info.strMeasure4}${info.strIngredient4}<br>
  ${info.strMeasure5}${info.strIngredient5}<br>${info.strMeasure6}${info.strIngredient6}<br>
  ${info.strMeasure7}${info.strIngredient7}<br>${info.strMeasure8}${info.strIngredient8}<br>
  ${info.strMeasure9}${info.strIngredient9}<br>${info.strMeasure10}${info.strIngredient10}<br>
  ${info.strMeasure11}${info.strIngredient11}<br>${info.strMeasure12}${info.strIngredient12}<br>
  ${info.strMeasure13}${info.strIngredient13}<br>${info.strMeasure14}${info.strIngredient14}<br>
  ${info.strMeasure15}${info.strIngredient15}<br>${info.strMeasure16}${info.strIngredient16}<br>
  ${info.strMeasure17}${info.strIngredient17}<br>${info.strMeasure18}${info.strIngredient18}<br>
  ${info.strMeasure19}${info.strIngredient19}<br>${info.strMeasure20}${info.strIngredient20}<br>`)
};

// <a href="${post.strSource}" target="_blank" >Recipe</a>

$(document).on('click', '.show-ingredients', function(event){
  event.preventDefault();
  side.empty();
  info.meals.forEach(info => {
    displayIngredients(info)
  })
})

$("#load-defaults").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  meal = defaultz;
  localStorage.setItem("meals", JSON.stringify(meal));
  alert("Defaults Now Loaded");
});

$(document).on('click', '.add-meal', function() {
  console.log("clicky")
  let newMeal = $(this).closest('.mealsearch').find('.add-meal-click')
  let mealAdd = newMeal.text();

  console.log(mealAdd)
  meal.push(mealAdd);
  console.log("complete")
});



function shuffle(array) {
  let currentIndex = meal.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

$("#canceldelete").on("click", function () {
  main.empty();
  mealHide();
});

$(".clearall").on("click", function (event) {
  event.preventDefault();
  let r = confirm(
    "Press ok to clear everthing, or cancel to keep current settings"
  );

  if (r === true) {
    txt = "Clearing Everything";
    localStorage.clear();
    location.reload();
  } else {
    txt = "Cancel";
  }
});

$("#display-meals").on("click", function (event) {
  event.preventDefault();
  mealShow();
  main.empty();
  meal.forEach(Function1);
});

function Function1(currentValue, index) {
  main.append(
    `<div id="meals"><input type="checkbox"><u>${
      1 + index
    }.  ${currentValue}<div id="hide">${index}</div></u></div>`
  );
}

$(document).ready(function () {
  $("#deletemeal").on("click", function () {
    if (confirm("Are you sure to delete selected meal?")) {
      $(":checkbox").each(function () {
        let that = $(this);
        if (that.is(":checked")) {
          let obj = $(this).closest("#meals").find("#hide").text();
          let idx = obj;
          meal.splice(idx, 1);
          main.empty();
          meal.forEach(Function1);
        }
      });
    }
  });
});

//testing code

$("#messagesend").on("click", function (event) {
  event.preventDefault();
  let newMeal = $("#input-message").val();
  meal.push(newMeal);
  $("#input-message").val(" ");
  storeData();
  shuffle(meal);
});

$("#random").on("click", function (event) {
  event.preventDefault();
  retrieveData();
  x = meal;
  main.empty();
  shuffle(x);
  if (`${x[0]}` === "undefined"){
    main.append(`<div class="display">No meals entered, please enter a meal or load default meals</div>`)
  } else {
  main.append(
    `<div class="display"><div id="d1">
           Dinner Day 1 = ${x[0]} <br></div>
     <div id="d2">Dinner Day 2 = ${x[1]}<br></div>
     <div id="d3">Dinner Day 3 = ${x[2]}<br></div>
     <div id="d4">Dinner Day 4 = ${x[3]}<br></div>
     <div id="d5">Dinner Day 5 = ${x[4]}<br></div>
     <div id="d6">Dinner Day 6 = ${x[5]}<br></div>
     <div id="d7">Dinner Day 7 = ${x[6]}</div></div> `
  )};
});

function mealShow() {
  $(".mealhide").removeClass("mealhide");
  $(".mealhide").addClass("mealshow");
  $("#clearalltop").show();
  $("#deletemeal").show()
  $("#canceldelete").show();
  $("#random").hide();
}

function mealHide(){
  $(".mealhide").removeClass("mealshow")
  $(".mealhide").addClass("mealhide")
  $("#deletemeal").hide()
  $("#clearalltop").hide();
  $("#canceldelete").hide();
  $("#random").show();
}
function storeData() {
  localStorage.setItem("meals", JSON.stringify(meal));
}

function retrieveData() {
  meal = JSON.parse(localStorage.getItem("meals"));
}

function bootStrap() {
  //   retrieveData();
  if (
    localStorage.getItem("meals") === null ||
    localStorage.getItem("meals") === false
  ) {
    meal = meals;
  } else {
    retrieveData();
  }
  shuffle(meal);
  storeData();
}

bootStrap();
