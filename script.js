const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const hotelContainer = document.getElementById("hotelContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let hotels = [];
let filteredHotels = [];

// Fetch Hotels
async function fetchHotels() {
loading.style.display = "block";
    error.textContent = "";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch hotels");
        }

        const result = await response.json();

        hotels = result.data;      // IMPORTANT
        filteredHotels = [...hotels];

        displayHotels(filteredHotels);

    }
    catch (err) {

        error.textContent = err.message;

    }
    finally {

        loading.style.display = "none";

    }
}

// Display Hotels
async function fetchHotels() {

    loading.style.display = "block";
    error.textContent = "";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch hotels");
        }

        const result = await response.json();

        hotels = result.data;      // IMPORTANT
        filteredHotels = [...hotels];

        displayHotels(filteredHotels);

    }
    catch (err) {

        error.textContent = err.message;

    }
    finally {

        loading.style.display = "none";

    }

}
function displayHotels(data) {

    hotelContainer.innerHTML = "";

    data.forEach(hotel => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

        <img src="${hotel.thumbnail}" alt="${hotel.name}">

        <div class="card-content">

            <h2>${hotel.name}</h2>

            <p>📍 ${hotel.location}</p>

            <p class="price">₹${Number(hotel.price).toFixed(2)}</p>

            <p class="rating">⭐ ${hotel.rating}</p>

            <button onclick="showDetails(${hotel.id})">
                View Details
            </button>

        </div>

        `;

        hotelContainer.appendChild(card);

    });

}

// Search
searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(value) ||
        hotel.location.toLowerCase().includes(value)
    );

    displayHotels(filteredHotels);

});

// Sort
sortSelect.addEventListener("change", () => {

    const value = sortSelect.value;

    if (value === "low") {
        filteredHotels.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (value === "high") {
        filteredHotels.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (value === "rating") {
        filteredHotels.sort((a, b) => b.rating - a.rating);
    }

    displayHotels(filteredHotels);

});

// Modal
const modal=document.getElementById("modal");

function showDetails(id){

    const hotel = hotels.find(item => item.id === id);

    document.getElementById("modalImage").src = hotel.thumbnail;

    document.getElementById("modalName").textContent = hotel.name;

    document.getElementById("modalLocation").textContent =
        "📍 " + hotel.location;

    document.getElementById("modalPrice").textContent =
        "₹ " + Number(hotel.price).toFixed(2);

    document.getElementById("modalRating").textContent =
        "⭐ " + hotel.rating;

    document.getElementById("modalDescription").textContent =
        hotel.description;

    modal.style.display = "flex";

}

document.getElementById("closeModal").onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target===modal){
modal.style.display="none";
}

}

// Dark Mode

const themeBtn=document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

// Start
fetchHotels();