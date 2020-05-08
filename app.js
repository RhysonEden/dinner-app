let mealJson = JSON.parse(localStorage.getItem("meals"));

let index = [];

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

$("#load-defaults").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  meal = defaultz;
  localStorage.setItem("meals", JSON.stringify(meal));
  alert("Defaults Now Loaded");
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
  location.reload();
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
  console.log(meal);
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
    console.log("deleted click");
    if (confirm("Are you sure to delete selected meal?")) {
      $(":checkbox").each(function () {
        let that = $(this);
        if (that.is(":checked")) {
          // let obj = that.closest("#hide");
          let obj = $(this).closest("#meals").find("#hide").text();
          console.log(obj)
          let idx = obj;
          console.log("test", idx);
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
  console.log(x);
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
  $("#random").hide();
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
