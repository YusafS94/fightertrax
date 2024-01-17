import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, Favorites, Profile } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Exported the App, Favorites, and Profile components in App.js and imported them here because they are needed for routing between Home, Favorites and fighter Profiles

// Getting the "root" div in index.html by id, and rendering the app in there
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter is needed for routing so i could set the app up as an SPA
  // Used BrowserRouter to wrap the whole app, then identified all my routes within the Routes wrapper
  <BrowserRouter>
    <Routes>
      {/* / is default route, /favorites loads in the Favorites component, and /profile/"id" loads in whatever fighter JSON data that id corresponds to */}
      <Route path="/" element={<App />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
