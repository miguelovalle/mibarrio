//import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddressModal } from "../components/address/AddressModal";
import { Login } from "../components/auth/Login";
import { ProductList } from "../components/product/ProductList";
import { ShopList } from "../components/comercio/ShopList";
import Gmap from "../components/GoogleMap/Gmap";
import { HeaderBar } from "../components/header/HeaderBar";
import { LandingScreen } from "../components/landing/LandingScreen";
import { SignUp } from "../components/auth/SignUp";
import { OrderSheet } from "../components/product/OrderSheet";
import { SearchList } from "../components/product/SearchList";
import { Prueba } from "../components/helpers/Prueba";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderBar />}>
          <Route index element={<ShopList />} />
          <Route path="shops" element={<ShopList />} />
          <Route path="shops/:shopId" element={<ProductList />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/login/" element={<Login />} />
        <Route path="/landing" element={<LandingScreen />} />
        <Route path="/map" element={<Gmap />} />
        <Route path="/regaddress" element={<AddressModal />} />
        <Route path="/registro" element={<SignUp />} />
        <Route path="/order" element={<OrderSheet />} />
        <Route path="/searchtext" element={<SearchList />} />
        <Route path="/prueba" element={<Prueba />} />
      </Routes>
    </BrowserRouter>
  );
};
