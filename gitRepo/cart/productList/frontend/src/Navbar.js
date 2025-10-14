import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for dessert:", search);
    // Call your search API or filter function here
  };

  return (
    <nav className="flex justify-between items-center bg-pink-50 px-6 py-3 shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-pink-600">Dessertify 🍨</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search desserts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none bg-transparent w-64"
        />
      </form>

      {/* Avatar Menu */}
      <div className="relative">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
            <p className="text-gray-700 font-semibold px-2 py-1">My Account</p>
            <hr />
            <button className="w-full text-left px-2 py-1 hover:bg-pink-50 rounded">🧁 Previous Orders</button>
            <button className="w-full text-left px-2 py-1 hover:bg-pink-50 rounded">⚙️ Settings</button>
            <button className="w-full text-left px-2 py-1 hover:bg-pink-50 rounded">🚪 Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}