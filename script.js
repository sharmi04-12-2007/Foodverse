// LOGIN

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        window.location.href = "home.html";

    });

}


// HOME SEARCH

function searchFood() {

    let search = document.getElementById("searchInput").value;

    if (search == "") {

        alert("Please enter a food name.");

    } else {

        window.location.href =
            "menu.html?search=" + encodeURIComponent(search);

    }

}


// OFFER

function showOffer() {

    alert("🎉 Congratulations! You got 20% OFF on your first order!");

}


// CATEGORY

function openCategory(category) {

    if (category == "South Indian") {

        window.location.href = "menu.html?category=south";

    }
    else if (category == "Non-Veg") {

        window.location.href = "menu.html?category=nonveg";

    }

    else if (category == "Mandi") {

        window.location.href = "menu.html?category=mandi";

    }

}


// MENU CATEGORY FILTER

function filterFood(category) {

    let foods = document.querySelectorAll(".menu-card");

    for (let i = 0; i < foods.length; i++) {

        if (category == "all") {

            foods[i].style.display = "block";

        }

        else if (foods[i].classList.contains(category)) {

            foods[i].style.display = "block";

        }

        else {

            foods[i].style.display = "none";

        }

    }

}


// MENU SEARCH

function searchMenu() {

    let search = document.getElementById("menuSearch").value.toLowerCase();

    let foods = document.querySelectorAll(".menu-card");

    let found = false;

    for (let i = 0; i < foods.length; i++) {

        let foodName =
            foods[i].querySelector("h3").innerText.toLowerCase();

        if (foodName.includes(search)) {

            foods[i].style.display = "block";

            found = true;

        }

        else {

            foods[i].style.display = "none";

        }

    }

    if (search == "") {

        filterFood("all");

        return;

    }

    if (found == false) {

        alert('Sorry! We don\'t have "' + search + '" right now.');

        filterFood("all");

    }

}


// ADD TO CART

function addToCart(food, price) {

    let cart = localStorage.getItem("cart");

    if (cart == null) {

        cart = "";

    }

    cart = cart + food + "|" + price + ",";

    localStorage.setItem("cart", cart);

    alert(food + " added to cart! 🛒");

}


// OPEN CART

function openCart() {

    let modal = document.getElementById("cartModal");

    if (!modal) {
        return;
    }

    modal.style.display = "flex";

    displayCart();

}


// CLOSE CART

function closeCart() {

    let modal = document.getElementById("cartModal");

    if (modal) {

        modal.style.display = "none";

    }

}


// DISPLAY CART

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    let cartTotal = document.getElementById("cartTotal");

    let cart = localStorage.getItem("cart");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart == null || cart == "") {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.innerText = "0";

        return;

    }


    let items = cart.split(",");

    for (let i = 0; i < items.length; i++) {

        if (items[i] == "") {
            continue;
        }

        let details = items[i].split("|");

        let food = details[0];

        let price = Number(details[1]);

        total = total + price;


        cartItems.innerHTML +=
            '<div class="cart-item">' +
                '<div class="cart-item-info">' +
                    '<h4>' + food + '</h4>' +
                    '<p>₹' + price + '</p>' +
                '</div>' +
            '</div>';

    }

    cartTotal.innerText = total;

}


// CHECKOUT

function checkout() {

    let cart = localStorage.getItem("cart");

    if (cart == null || cart == "") {

        alert("Your cart is empty.");

    }

    else {

        alert("🎉 Order placed successfully!");

        localStorage.removeItem("cart");

        closeCart();

    }

}


// MENU PAGE URL FILTER

if (window.location.pathname.includes("menu.html")) {

    let url = window.location.search;


    // SEARCH FROM HOME

    if (url.includes("?search=")) {

        let search = url.replace("?search=", "");

        search = decodeURIComponent(search);

        document.getElementById("menuSearch").value = search;

        searchMenu();

    }


    // CATEGORY FROM HOME

    else if (url.includes("?category=")) {

        let category = url.replace("?category=", "");

        filterFood(category);

    }

}