import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import LoginPage from './Pages/Login';
import TravelDestinations from './Pages/TravelDestinations';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminAndPayment from './Pages/Admin';
import { ThemeProvider } from '../src/context/ThemeContext';

function App() {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem('admin')) || null
  );

  return (
    <ThemeProvider>
      <Router>
        <Header admin={admin} setAdmin={setAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage setAdmin={setAdmin} />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute admin={admin}>
                <AdminAndPayment />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/travel-destinations" element={<TravelDestinations />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
