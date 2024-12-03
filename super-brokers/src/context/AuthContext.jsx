import { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Add userId state

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Login successful, update authentication state and save userId
        setIsAuthenticated(true);
        setUserId(data._id); // Save _id returned from backend
        return true;
      } else {
        // Handle errors from the server
        alert(data.message); // Show error message from the backend
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null); // Clear userId on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}