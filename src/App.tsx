import HomePage from "./pages/HomePage.js";
import Orders from "./pages/Orders.tsx";
import Shop from "./pages/ShopPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayouts from "./components/Layouts/MainLayouts.jsx"
function App() {
  return (
    // <MainLayouts />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
