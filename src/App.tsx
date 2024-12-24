// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from '@/pages/home'; 
import Navbar from "@/components/navbar";
import Contact from '@/components/contact';
import LineChart from "@/pages/line-chart";
import MultiLineChartPage from "@/pages/ch1";
import Login from '@/pages/login';
import { Login2 } from '@/pages/login2';
// import { Signup } from '@/pages/signup';


function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = !!localStorage.getItem('token');
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function ConditionalNavbar() {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);
  return !hideNavbar ? <Navbar /> : null;
}

function App() {
  return (
    <BrowserRouter>
      <ConditionalNavbar /> {/* Conditionally render the Navbar */}
      <Routes>
        <Route path="/login3" element={<Login />} />
        <Route path="/login" element={<Login2 />} />
        {/* <Route path="/signup" element={<Signup />} />  no sign up for now */} 
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/line-chart" element={<LineChart />} />
        <Route path="/ch1" element={
          <ProtectedRoute>
            <MultiLineChartPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;