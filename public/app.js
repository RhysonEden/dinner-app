let mealJson = JSON.parse(localStorage.getItem("meals"));

let index = [];

let searchTerm;

let elem;

let winez = [];

let checkedValue = $(".messageCheckbox:checked");

let modal = document.getElementById("myModal");

let btn = $("#view-wine");

let span = document.getElementsByClassName("close")[0];

let wine = $("#wine-place");

let clean = $(".main-list").empty();

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

// JQuery items
$("#start-search").on("click", async function (event) {
  event.preventDefault();
  mealHide();
  main.empty();
  searchTerm = $(".search-terms").val();
  getSearch();
});

$("#load-defaults").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  meal = defaultz;
  localStorage.setItem("meals", JSON.stringify(meal));
  alert("Defaults Now Loaded");
});

$("#canceldelete").on("click", function () {
  main.empty();
  mealHide();
});

$(".clearall").on("click", function (event) {
  event.preventDefault();
  mealHide();
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

$("#messagesend").on("click", function (event) {
  event.preventDefault();
  let newMeal = $("#input-message").val();
  meal.push(newMeal);
  $("#input-message").val(" ");
  storeData();
  shuffle(meal);
  mealHide();
});

$("#random").on("click", function (event) {
  event.preventDefault();
  mealHide();
  retrieveData();
  x = meal;
  main.empty();
  shuffle(x);
  if (`${x[0]}` === "undefined") {
    main.append(
      `<div class="display">No meals entered, please enter a meal or load default meals</div>`
    );
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
    );
  }
});

$("#random-api-meals").on("click", function (event) {
  event.preventDefault();
  randomApiMeals();
});

$("#searchmeal").on("click", function () {
  console.log("search clicked");
  searchTerm = $(".messageCheckbox:checked")
    .closest("#meals")
    .find("#meal-name")
    .text();
  getSearch();
});

//Blues - document ready etc

span.onclick = function () {
  $(".wine-clear").text(" ");
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    $(".wine-clear").text(" ");
    modal.style.display = "none";
  }
};

btn.onclick = function () {
  console.log("clicked");
  modal.style.display = "block";
};

$(document).ready(function () {
  $("#deletemeal").on("click", function () {
    if (confirm("Are you sure to delete selected meal?")) {
      $(":checkbox").each(function () {
        let that = $(this);
        if (that.is(":checked")) {
          let obj = $(this).closest("#meals").find("#hide").text();
          let idx = obj;
          meal.splice(idx, 1);
          storeData();
          main.empty();
          meal.forEach(Function1);
          console.log("ran");
        }
      });
    }
  });
});

$(document).on("click", ".add-meal", function () {
  console.log("clicky");
  let newMeal = $(this).closest(".mealsearch").find(".add-meal-click");
  let mealAdd = newMeal.text();
  console.log(mealAdd);
  meal.push(mealAdd);
  storeData();
  console.log("complete");
});

$(document).on("click", "#view-wine", function () {
  getWine();
});

//Functions

async function foodTrivia() {
  try {
    let response = await fetch(`/trivia`),
      data = await response.json();
    console.log(data);
    trivia = data;
    console.log(trivia);

    main.append(`<h4>Food fact! : <br> ${trivia.results.text}</h4>`);
  } catch (error) {
    console.log(error);
  }
}

//Front-End To get Wine information
async function getWine() {
  let wineTerm = searchTerm;
  console.log(wineTerm);
  try {
    let response = await fetch(`/pairing?wineTerm=${wineTerm}`),
      data = await response.json();
    console.log(data);

    winez = data.results.pairingText;
    displayWine(winez);
  } catch (error) {
    console.log(error);
  }
}

function displayWine(winez) {
  console.log(winez);
  if (winez === undefined) {
    $(".wine-clear").text(" ");
    modalOpen();
    $("#wine-place").append(`I'm sorry, we weren't able to find any pairings.`);
  } else {
    $(".wine-clear").text(" ");
    modalOpen();
    $("#wine-place").append(`${winez}`);
  }
}

async function getSearch() {
  try {
    let response = await fetch(`/search?searchTerm=${searchTerm}`),
      data = await response.json();
    console.log(data);
    info = data;
    $(".main-list").empty();
    data.results.results.forEach((post) => {
      displayData(post);
    });
  } catch (error) {
    console.log(error);
  }
}

async function randomApiMeals() {
  try {
    let response = await fetch(`/mealplanner?mealPlanner=week`),
      data = await response.json();
    console.log(data);
    main.empty();
    data.results.meals.forEach((post) => {
      renderApiMeals(post);
      console.log(post);
    });
  } catch (error) {
    console.log(error);
  }
}

function renderApiMeals(post) {
  main.append(`<div class="mealsearch"><span class="add-meal-click"><h2><a href="${post.sourceUrl}" target="_blank">${post.title}</a></h2></span>
  <h4>Ready in: ${post.readyInMinutes} minutes <br> Servings: ${post.servings} </h4> <br> <br><br><br><button class="add-meal">Add Meal</button></div>`);
}

function displayData(post) {
  main.append(`<div class="mealsearch"><span class="add-meal-click"><h2><a href="${post.sourceUrl}" target="_blank">${post.title}</a></h2></span>
  <h4>Ready in: ${post.readyInMinutes} minutes <br> Servings: ${post.servings} </h4> <br> <br><img src="https://spoonacular.com/recipeImages/${post.image}" height="250" width="250"><br> <br><button id="view-wine">View Wine Pairing</button><br><br><button class="add-meal">Add Meal</button></div>`);
}

function shuffle(array) {
  mealHide();
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

function Function1(currentValue, index) {
  main.append(
    `<div id="meals"><input type="checkbox" class="messageCheckbox">${
      1 + index
    }. <span id="meal-name">${currentValue}</span><div id="hide">${index}</div></div>`
  );
}

function mealShow() {
  $("#deletemeal").show();
  $("#canceldelete").show();
  $("#searchmeal").show();
}

function mealHide() {
  $("#deletemeal").hide();
  $("#canceldelete").hide();
  $("#searchmeal").hide();
}
function storeData() {
  console.log("Storing data");
  localStorage.setItem("meals", JSON.stringify(meal));
}

function retrieveData() {
  meal = JSON.parse(localStorage.getItem("meals"));
}

function modalOpen() {
  modal.style.display = "block";
}

function bootStrap() {
  if (
    localStorage.getItem("meals") === null ||
    localStorage.getItem("meals") === false
  ) {
    meals = meal;
  } else {
    retrieveData();
    mealHide();
  }

  foodTrivia();
  shuffle(meal);
  storeData();
}

bootStrap();
