import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedHotel, setSelectedHotel] = useState(null);

  // Sample data (replace with API later if you have one)
  useEffect(() => {
    try {
      const data = [
        {
          id: 1,
          name: "Grand Palace Hotel",
          location: "Delhi",
          price: 5000,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          description: "Luxury hotel in city center",
        },
        {
          id: 2,
          name: "Sea View Resort",
          location: "Goa",
          price: 8000,
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d3",
          description: "Beachside luxury resort",
        },
      ];

      setHotels(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load hotels");
      setLoading(false);
    }
  }, []);

  // Filter + Sort logic
  const filteredHotels = hotels
    .filter((hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className="logo">
          <i className="fa-solid fa-hotel"></i> Hotel Finder
        </div>
        <button id="themeBtn">🌙</button>
      </nav>

      {/* Hero */}
      <header className="hero">
        <h1>Find Your Perfect Stay</h1>
        <p>Discover luxury hotels around the world.</p>
      </header>

      {/* Search */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search hotel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price : Low to High</option>
          <option value="high">Price : High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </section>

      {/* Loading */}
      {loading && <div id="loading">Loading Hotels...</div>}

      {/* Error */}
      {error && <div id="error">{error}</div>}

      {/* Hotel Cards */}
      <section id="hotelContainer">
        {filteredHotels.map((hotel) => (
          <div className="card" key={hotel.id}>
            <img src={hotel.image} alt={hotel.name} />

            <div className="card-content">
              <h2>{hotel.name}</h2>
              <p>{hotel.location}</p>

              <div className="price">₹{hotel.price}</div>
              <div className="rating">⭐ {hotel.rating}</div>

              <button onClick={() => setSelectedHotel(hotel)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {selectedHotel && (
        <div className="modal" onClick={() => setSelectedHotel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span id="closeModal" onClick={() => setSelectedHotel(null)}>
              &times;
            </span>

            <img src={selectedHotel.image} alt="" />

            <h2>{selectedHotel.name}</h2>
            <p>{selectedHotel.location}</p>
            <p>₹{selectedHotel.price}</p>
            <p>⭐ {selectedHotel.rating}</p>
            <p>{selectedHotel.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;