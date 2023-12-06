import React , {lazy} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./pages/login/Login.page"));
const Home = lazy(() => import("./pages/home/Home.page"));
const Search = lazy(() => import("./pages/search/Search.page"));
const Hotel = lazy(() => import("./pages/hotel/Hotel.page"));
const Checkout = lazy(() => import("./pages/checkout/Checkout.page"));
const Confirmation = lazy(() => import("./pages/confirmation/Confirmation.page"));
const Admin = lazy(() => import("./pages/admin/Admin.component"));
const AdminCities = lazy(() => import("./pages/admin/adminCities/AdminCities.page"));
const AdminHotels = lazy(() => import("./pages/admin/adminHotels/AdminHotels.page"));
const AdminRooms = lazy(() => import("./pages/admin/adminRooms/AdminRooms.page"));
const PageNotFound = lazy(() => import("./pages/pageNotFound/PageNotFound.page"));

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
