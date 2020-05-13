let mealJson = JSON.parse(localStorage.getItem("meals"));

let index = [];

let searchTerm;

let winez = [];

let modal = document.getElementById("myModal");

let btn = $("#view-wine")

let span = document.getElementsByClassName("close")[0];

let wine = $("#wine-place");

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
  mealHide();
  main.empty();
  searchTerm = $(".search-terms").val()
  getSearch();
  $(".search-terms").val( "Search...")
})


//Front-End To get Wine information
async function getWine(){
let wineTerm = searchTerm;
console.log(wineTerm)
try {
  let response = await fetch(`/pairing?wineTerm=${wineTerm}`),
  data = await response.json();
  console.log(data);
  
  winez = data.results.pairingText;
  displayWine(winez)
} catch (error) {
  console.log(error);
}
};

function displayWine(winez){
  console.log(winez)
  modalOpen()
  $("#wine-place").append(`${winez}`)
}

$(document).on('click', '#view-wine', function() {
  getWine();
});

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
  // $(".search-terms").val("");
};

function displayData(post){
  main.append(`<div class="mealsearch"><span class="add-meal-click"><h2><a href="${post.sourceUrl}" target="_blank">${post.title}</a></h2></span>
  <h4>Ready in: ${post.readyInMinutes} minutes <br> Servings: ${post.servings} </h4> <br> <br><img src="https://spoonacular.com/recipeImages/${post.image}" height="250" width="250"><br> <br><button id="view-wine">View Wine Pairing</button><br><br><button class="add-meal">Add Meal</button></div>`)

}

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
  $("#deletemeal").show();
  $("#canceldelete").show();
}

function mealHide(){
  $("#deletemeal").hide();
  $("#canceldelete").hide();
}
function storeData() {
  localStorage.setItem("meals", JSON.stringify(meal));
}

function retrieveData() {
  meal = JSON.parse(localStorage.getItem("meals"));
}

function bootStrap() {
  if (
    localStorage.getItem("meals") === null ||
    localStorage.getItem("meals") === false
  ) {
    meal = meals;
  } else {
    retrieveData();
    mealHide();
  }
  shuffle(meal);
  storeData();
}

// When the user clicks on the button, open the modal
btn.onclick = function() {
   console.log("clicked")
  modal.style.display = "block";
}

function modalOpen(){
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

bootStrap();
