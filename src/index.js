import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, Favourites, Profile } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
