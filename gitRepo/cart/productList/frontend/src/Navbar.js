import { useState ,useEffect} from "react";
import { FaSearch } from "react-icons/fa";
import PreviousOrders from "./services/PreviousOrders";
import "./Navbar.css";

export default function Navbar({ user, dessertList }) {
  console.log(user, "user from navbar")
  console.log(dessertList, "dessertList from navbar")
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filteredDessert, setFilteredDessert] = useState([]);
 useEffect(() => {
    if (search.trim() === "") {
      setFilteredDessert([]);
      return;
    }

    const result = dessertList.filter((dessert) =>
      dessert.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDessert(result);
  }, [search, dessertList]); // runs whenever search or dessertList changes

  const handleSearch = (e) => {
    e.preventDefault();

    // const result = dessertList.filter((dessert) => (
    //   dessert.name.toLowerCase().includes(search.toLowerCase())
    // ))
    // setFilteredDessert(result)
    // setSearch("")
    console.log("Searching for dessert:", search);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const highlightMatch = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "ig");
    return text.replace(regex, `<mark>$1</mark>`);
  };
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1 className="navbar-logo">இனிப்பகம் 🍨</h1>

        <form onSubmit={handleSearch} className="navbar-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search desserts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <button className="account-btn" onClick={() => setShowModal(true)}>
          My Account
        </button>
        {search.trim() !== "" && (
          <div className="searchResults">
            {filteredDessert.length === 0 ? (
              <div className="searchNoResults">No desserts found 🍰</div>
            ) : (
              filteredDessert.map((dessert) => (
                <div key={dessert.name} className="searchResultItem">
                  <img src={dessert.image.desktop} className="searchResultImg" />
                  <span className="searchResultName">{dessert.name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </nav>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h2 className="modal-title">My Account</h2>
            <PreviousOrders user={user} />
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}