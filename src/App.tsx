import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.page";
import Home from "./pages/home/Home.page";
import Hotel from "./pages/hotel/Hotel.page";
import AdminCities from "./pages/admin/adminCities/AdminCities.page";
import AdminHotels from "./pages/admin/adminHotels/AdminHotels.page";
import AdminRooms from "./pages/admin/adminRooms/AdminRooms.page";
import PageNotFound from "./pages/pageNotFound/PageNotFound.page";
import Search from "./pages/search/Search.page";
import Checkout from "./pages/checkout/Checkout.page";
import Confirmation from "./pages/confirmation/Confirmation.page";
import Admin from "./pages/admin/Admin.component";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/hotel" element={<Hotel />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/confirmation" element={<Confirmation />}></Route>
          <Route path="/admin/*" element={<Admin />}>
            <Route index element={<AdminCities />} />
            <Route path="cities" element={<AdminCities />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="rooms" element={<AdminRooms />} />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
