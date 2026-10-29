import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PropertyDetails from "./PropertyDetails";
import SvgSprite from "./SvgSprite";
import CreateProperty from "./CreateProperty";
import EditProperty from "./EditProperty";

import Register from "./authentications/Register";
import Login from "./authentications/Login";

export default function App() {
  return (
    <>
    <SvgSprite />
   
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Dynamic Property Detail Page */}
        <Route path="/property/:slug" element={<PropertyDetails />} />

        <Route path="/create-property" element={<CreateProperty />} />
        <Route path="/edit-property/:slug" element={<EditProperty />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>
  
    </>
  );
}

