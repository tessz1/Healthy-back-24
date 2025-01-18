import HomePage from "./pages/HomePage.js";
import Orders from "./pages/Orders.tsx";
import Shop from "./pages/ShopPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.tsx";
import Chat from './pages/Chat.jsx'
// import MainLayouts from "./components/Layouts/MainLayouts.jsx"
function App() {
  return (
    // <MainLayouts />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;