import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import PreviousOrders from "./services/PreviousOrders";
import "./Navbar.css";

export default function Navbar({ user }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for dessert:", search);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1 className="navbar-logo">Dessertify 🍨</h1>

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