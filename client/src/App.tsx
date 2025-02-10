import HomePage from "./pages/HomePage.js";
import Orders from "./pages/Orders.tsx";
import Shop from "./pages/ShopPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductDetail from "./pages/ProductDetail.tsx";
// import Chat from "./pages/Chat.jsx";
import UploadCourse from "./pages/admin/UploadCourse.js";
import StartPages from "./components/StartPages.js";
import AdminRouterPage from "./pages/admin/AdminRouterPage.tsx";
import Basket from "./pages/Basket.tsx";
import Header from "./components/Header.tsx";
import Reviews from "./pages/Reviews";
import Cart from "./pages/Cart.tsx";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/start" element={<StartPages />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/adminTest" element={<UploadCourse />} />
        <Route path="/adminRouterPage" element={<AdminRouterPage />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
