"use strict";

//FUNCTION TO ASSIGN ROAST FONT COLORS BASED ON ROAST SELECTION
const assignColor = (darkness) => {
    let fontColor = '';
    if (darkness === 'light') {
        fontColor += "light";
    } else if (darkness === 'medium') {
        fontColor += "medium";
    } else if (darkness === 'dark') {
        fontColor += "dark";
    }
    return fontColor
}

//FUNCTION TO ASSIGN IMG TO COFFEE BASED ON COFFEE ROAST
const assignPic = (roaster) => {
    let imgCoffee = '';
    if (roaster === 'light') {
        imgCoffee += "images/coffee-cup3.jpeg";
    } else if (roaster === 'medium') {
        imgCoffee += "images/coffee-cup2.jpg";
    } else if (roaster === 'dark') {
        imgCoffee += "images/coffee-cup.jpeg";
    }
    return imgCoffee
}

//FUNCTION TO TURN COFFEES OBJECT INTO HTML CODE
function renderCoffee(coffee) {
    let html = '<div class="coffee show">';
    html += `<img class="coffee-img" src="${assignPic(coffee.roast)}" alt="${coffee.name}">`;
    html += '<div class="coffee-title column">';
    html += '<div class="coffee-name">' + coffee.name + '</div>';
    html += `<div class="coffee-roast ${assignColor(coffee.roast)} ">` + coffee.roast + '</div>';
    html += '</div>';
    html += '</div>';

    return html;
}

//LOOP THROUGH COFFEES ARRAY TURN INTO HTML
function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

let tableBody = document.querySelector('.coffeebody');

//FUNCTION TO UPDATE COFFEE DISPLAY BASED ON ROAST SELECTION
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all') {
            filteredCoffees = coffees;
        }
    });
    tableBody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let tbody = document.querySelector('#coffees');
let roastSelection = document.querySelector('#roast-selection');
tbody.innerHTML = renderCoffees(coffees);

//EVENT LISTENER TO UPDATE DISPLAYED COFFEES WHEN ROAST SELECTION CHANGES
roastSelection.addEventListener('change', updateCoffees);
let userSearch = document.querySelector("#coffee-search");

// FUNCTION TO SEARCH THROUGH COFFEES ARRAY AND FILTER COFFEES BASED ON USER SEARCH
const coffeesSearch = () => {
    let currentSearch = userSearch.value.toLowerCase();
    let userCoffees = [];
    coffees.forEach((coffee) => {
        if (coffee.name.toLowerCase().includes(currentSearch) && (coffee.roast.includes(roastSelection.value) || roastSelection.value === "all")) {
            userCoffees.push(coffee);
        }
        tableBody.innerHTML = renderCoffees(userCoffees);
    })
}

//EVENT LISTENER THAT REFRESHES COFFEE SEARCH ON EACH KEYUP
userSearch.addEventListener('keyup', coffeesSearch);


let newCoffeeName = document.querySelector("#new-coffee");
let newCoffeeRoast = document.querySelector("#new-roast-selection");

//FUNCTION TO CREATE AND PUSH NEW COFFEE OBJECT TO COFFEES ARRAY
function addNewCoffee () {
    let userCoffee = {id: coffees.length + 1, name: newCoffeeName.value, roast: newCoffeeRoast.value};
    if (newCoffeeName.value === "") {
        alert("Please enter a coffee name!");
    } else {
        coffees.push(userCoffee);
        console.log(`Added new coffee "${userCoffee.name}"`);
        tbody.innerHTML = renderCoffees(coffees); // update the array with the new coffee
        localStorage.setItem('newCoffees', JSON.stringify(coffees)); //stores it locally
        newCoffeeName.value = "";
    }
}

// ADD NEW COFFEE OBJECT TO THE COFFEES ARRAY AND REFRESHING COFFEE LIST ON BUTTON CLICK
let submitCoffeeButton = document.querySelector("#new-coffee-button");
submitCoffeeButton.addEventListener("click", () => {
    addNewCoffee();
    coffeesSearch();
    updateStorage();
});

// ADD NEW COFFEE OBJECT TO THE COFFEES ARRAY AND REFRESHING COFFEE LIST ON ENTER
let submitCoffeeEnter = document.querySelector("#new-coffee");
submitCoffeeEnter.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addNewCoffee();
        coffeesSearch();
        updateStorage();
    }
});

// FUNCTION TO UPDATE STORED COFFEES ARRAY WITH USER COFFEE
function updateStorage() {
    sessionStorage.setItem('oldCoffees', JSON.stringify(coffees));
}

// EVENT LISTENER-- WHEN PAGE RELOADS/LOADS LOAD STORED LOCAL COFFEE ARRAY
window.addEventListener('load', function() {
    let oldCoffees = JSON.parse(sessionStorage.getItem('oldCoffees'));
    if (oldCoffees !== null) {
        coffees = oldCoffees;
        tbody.innerHTML = renderCoffees(coffees);
    }
});

