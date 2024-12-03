import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import MarketNews from './MarketNews';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import About from './About';
import Help from './Help';
import Portfolio from './Portfolio';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public routes */}
      {!isAuthenticated && <Route path="/" element={<Home />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* Shared routes */}
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />

      {/* Protected routes */}
      {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
      {isAuthenticated && <Route path="/portfolio" element={<Portfolio />} />}

      {/* Fallback route */}
      {!isAuthenticated ? (
        <Route path="*" element={<Navigate to="/" />} />
      ) : (
        <Route path="*" element={<Navigate to="/dashboard" />} />
      )}
    </Routes>
  );
}

// Define PrivateRoute to restrict access for authenticated users
function PrivateRoute({ component: Component }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

// Define PublicRoute to redirect logged-in users away from public routes
function PublicRoute({ component: Component }) {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Component /> : <Navigate to="/dashboard" />;
}

export default App;