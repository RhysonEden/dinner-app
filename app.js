let meals = JSON.parse(localStorage.getItem("meals"));

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
  main.empty();

  meal.forEach(Function1);

  function Function1(currentValue, index) {
    console.log(
      "Array Current Index is: " + index + " :: Value is: " + currentValue
    );
    main.append(
      `<div id="meals">${currentValue}<div id="hide">${index}</div></div>`
    );
  }
});

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
});

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
