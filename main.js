"use strict"

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

function renderCoffee(coffee) {
    let html = '<div class="coffee show">';
    html += `<img class="coffee-img" src="${assignPic(coffee.roast)}" alt="${coffee.name}">`;
    html += '<div class="coffee-title column">';
    html += '<div class="coffee-name">' + coffee.name + '</div>';
    html += '<div class="coffee-roast">' + coffee.roast + '</div>';
    html += '</div>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

let tableBody = document.querySelector('.coffeebody')

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

roastSelection.addEventListener('change', updateCoffees);

let userSearch = document.querySelector("#coffee-search")
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
userSearch.addEventListener('keyup', coffeesSearch);


//USER ENTER NEW COFFEE FORM JS
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

let submitCoffeeEnter = document.querySelector("#new-coffee");
submitCoffeeEnter.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addNewCoffee();
        coffeesSearch();
        updateStorage();
    }
});
//END USER ENTER NEW COFFEE FORM JS

function updateStorage() {
    sessionStorage.setItem('oldCoffees', JSON.stringify(coffees));
}

window.addEventListener('load', function() {
    let oldCoffees = JSON.parse(sessionStorage.getItem('oldCoffees'));
    if (oldCoffees !== null) {
        coffees = oldCoffees;
        tbody.innerHTML = renderCoffees(coffees);
    }
});

