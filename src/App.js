import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Admin from './Pages/Admin';
import LoginPage from './Pages/Login';
import TravelDestinations from './Pages/TravelDestinations';

function App() {
  const [admin, setAdmin] = useState(null);
  return (
    <Router>
      <Header admin={admin} setAdmin={setAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setAdmin={setAdmin} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/travel-destinations" element={<TravelDestinations />} />
        {/* <Route path="#contract" element={<Contract />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
