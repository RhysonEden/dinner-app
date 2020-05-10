let mealJson = JSON.parse(localStorage.getItem("meals"));

let index = [];

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

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

let ideas;


$("#start-search").on("click", async function(event){
  event.preventDefault();
  main.empty();
  let searchTerm = $(".search-terms").val()
  let url = `${BASE_URL}/search.php?s=${searchTerm}`
  try {
    let response = await fetch(url),
    data = await response.json();
    console.log(data);
    data.meals.forEach(post => {
      displayData(post);
    })
  } catch (error) {
    console.log(error);
  }
  $(".search-terms").val("");
});

function displayData(post){
  main.append(`<div class="mealsearch"><span class="add-meal-click"><h2>${post.strMeal}</h2></span>${post.strInstructions}<br><br><br>
  '<br><button class="add-meal">Add Meal</button></div>`)

}

// ${
//   post.strMeasure1 === "" ? "img/standin.jpg" : d.image
// }
// ${post.strMeasure1}${post.strIngredient1}<br>${post.strMeasure2}${post.strIngredient2}<br>
// ${post.strMeasure3}${post.strIngredient3}<br>${post.strMeasure4}${post.strIngredient4}<br>
// ${post.strMeasure5}${post.strIngredient5}<br>${post.strMeasure6}${post.strIngredient6}<br>
// ${post.strMeasure7}${post.strIngredient7}<br>${post.strMeasure8}${post.strIngredient8}<br>
// ${post.strMeasure9}${post.strIngredient9}<br>${post.strMeasure10}${post.strIngredient10}<br>
// ${post.strMeasure11}${post.strIngredient11}<br>${post.strMeasure12}${post.strIngredient12}<br>
// ${post.strMeasure13}${post.strIngredient13}<br>${post.strMeasure14}${post.strIngredient14}<br>
// ${post.strMeasure15}${post.strIngredient15}<br>${post.strMeasure16}${post.strIngredient16}<br>
// ${post.strMeasure17}${post.strIngredient17}<br>${post.strMeasure18}${post.strIngredient18}<br>
// ${post.strMeasure19}${post.strIngredient19}<br>${post.strMeasure20}${post.strIngredient20}<br>
// <a href="${post.strSource}" target="_blank" >Recipe</a>
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
