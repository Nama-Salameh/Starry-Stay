import { Routes, Route } from "react-router";
import React, { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute.route";
import TopBar from "../components/bars/regularUser/topBar/TopBar.component";
import {navItemsForHomeLoggedUsers, navItemsForHomeUnLoggedUsers} from "../constants/navItemsForHome.constant";
import { SearchProvider } from "../contexts/SearchContext.context";
import { isLoggedIn, isSessionExpired } from "../utils/TokenUtils";
import RoomDetails from "../pages/room/RoomDetails.page";

const Login = lazy(() => import("../pages/login/Login.page"));
const Home = lazy(() => import("../pages/home/Home.page"));
const Search = lazy(() => import("../pages/search/Search.page"));
const Hotel = lazy(() => import("../pages/hotel/Hotel.page"));
const Checkout = lazy(() => import("../pages/checkout/Checkout.page"));
const Confirmation = lazy(
  () => import("../pages/confirmation/Confirmation.page")
);
const Admin = lazy(() => import("../pages/admin/Admin.component"));
const AdminCities = lazy(
  () => import("../pages/admin/adminCities/AdminCities.page")
);
const AdminHotels = lazy(
  () => import("../pages/admin/adminHotels/AdminHotels.page")
);
const AdminRooms = lazy(
  () => import("../pages/admin/adminRooms/AdminRooms.page")
);
const PageNotFound = lazy(
  () => import("../pages/pageNotFound/PageNotFound.page")
);

export default function AppRoutes() {
  return (
    <div>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <>
                {isLoggedIn() && !isSessionExpired() ? (
                  <TopBar items={navItemsForHomeLoggedUsers} />
                ) : (
                  <TopBar items={navItemsForHomeUnLoggedUsers} />
                )}
                <Home />
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <TopBar />
                <Routes>
                  <Route path="*" element={<PageNotFound />}></Route>
                  <Route path="/search" element={<Search />}></Route>
                  <Route path="/hotel" element={<Hotel />}></Route>
                  <Route path="/room" element={<RoomDetails />}></Route>

                  <Route element={<ProtectedRoute />}>
                    <Route path="/checkout" element={<Checkout />}></Route>
                  </Route>
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/confirmation"
                      element={<Confirmation />}
                    ></Route>
                  </Route>
                  <Route element={<ProtectedRoute onlyAdmins={true} />}>
                    <Route path="/admin/*" element={<Admin />}>
                      <Route index element={<AdminCities />} />
                      <Route path="cities" element={<AdminCities />} />
                      <Route path="hotels" element={<AdminHotels />} />
                      <Route path="rooms" element={<AdminRooms />} />
                    </Route>
                  </Route>
                </Routes>
              </>
            }
          ></Route>
        </Routes>
      </SearchProvider>
    </div>
  );
}
