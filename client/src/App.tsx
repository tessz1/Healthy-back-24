import HomePage from "./pages/HomePage.js";
import Orders from "./pages/Orders.tsx";
import Shop from "./pages/ShopPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductDetail from "./pages/ProductDetail.tsx";
import Chat from "./pages/Chat.jsx";
import UploadCourse from "./pages/UploadCourse.js";
import StartPages from "./components/StartPages.js";
import AdminRouterPage from "./pages/AdminRouterPage.tsx"
// import MainLayouts from "./components/Layouts/MainLayouts.jsx"
function App() {
  return (
    // <MainLayouts />
    <Router>
      <Routes>
        <Route path="/start" element={<StartPages />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/adminTest" element={<UploadCourse />} />
        <Route path="/adminRouterPage" element={<AdminRouterPage />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
