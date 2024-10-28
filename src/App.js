import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Admin from './Pages/Admin';
import LoginPage from './Pages/Login';
import TravelDestinations from './Pages/TravelDestinations';
import ProtectedRoute from './routes/ProtectedRoute';
import Payment from './Pages/Payment';
import AdminAndPayment from './Pages/Admin';

function App() {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem('admin')) || null
  );

  return (
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
        {/* <Route
          path="/payment"
          element={
            <ProtectedRoute admin={admin}>
              <Payment />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/about" element={<About />} />
        <Route path="/travel-destinations" element={<TravelDestinations />} />
        {/* <Route path="#contract" element={<Contract />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
