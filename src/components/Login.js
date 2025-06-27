import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock authentication data
const mockCredentials = {
  admin: { username: "admin@example.com", password: "admin123" },
  user: { username: "user@example.com", password: "user123" },
};

const Login = ({ onLogin }) => {
  const [role, setRole] = useState(""); // Role: admin or user
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [error, setError] = useState(""); // Error message
  const [showPassword, setShowPassword] = useState(false); // Toggle Password Visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the role is selected
    if (!role) {
      setError("⚠️ Please select a role (Admin or User)");
      return;
    }

    // Get the correct credentials for the selected role
    const credentials = mockCredentials[role];

    // Validate username and password
    if (username === credentials.username && password === credentials.password) {
      onLogin(role); // Pass the role to parent
      setError(""); // Clear error
      navigate(`/${role}`); // Navigate to respective dashboard
    } else {
      setError("❌ Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🥜 🌶️ Login Page</h2><br></br>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">📧 Email Id :</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div><br></br>

          {/* Password Input with Toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">🔒 Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            /><br></br>
            {/* Show Password Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 text-sm"
            >
              {showPassword ? "🙈 Hide" : "👀 Show"}
            </button>
          </div><br></br>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">👤 Select Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">-- Select Role --</option>
              <option value="admin">👑 Admin</option>
              <option value="user">🙋 User</option>
            </select>
          </div><br></br>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition duration-300"
          >
            🔐 Login
          </button>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition duration-300"
          >
            🏠 Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
