import { Routes, Route } from "react-router-dom";

import Restaurants from "../Screens/restaurants";
import Restaurant from "../Screens/restaurant";
import AddRestaurant from "../Screens/addRestaurant";
import AddReview from "../Screens/addReview";

import { default as Tags } from "../Components/Payment_method";

export default function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<Restaurant />} />
      <Route path="/add/restaurant" element={<AddRestaurant />} />
      <Route path="/add/review" element={<AddReview />} />
      <Route path="/restaurants/update" element={<h1>update</h1>} />
    </Routes>
  );
}
