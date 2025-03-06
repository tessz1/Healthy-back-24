import HomePage from "./pages/HomePage.js";
import Shop from "./pages/ShopPage.js";
import CoursePage from "./pages/coursesPage/CoursePage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat.js";
import UploadCourse from "./pages/admin/UploadCourse.js";
import Header from "./components/Header.tsx";
import Reviews from "./pages/Reviews";
import Cart from "./pages/Cart.tsx";
import NavigationAdmin from "./pages/admin/NavigationAdmin.tsx";
import CreatePromoCode from "./pages/admin/CreatePromocode.tsx"
import PurchasedCourses from "./pages/PurchasedCourses.tsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<PurchasedCourses />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/uploadCourse" element={<UploadCourse />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/admin" element={<NavigationAdmin/>} />
        <Route path="/createPromoCode" element={<CreatePromoCode />} /> 
        {/* <Route path="/course/:courseId" element={<CoursePage />} /> */}
        {/* <Route path="/payment-webhook" element={<div>Payment webhook</div>} /> */}
        <Route path="/createPromoCode" element={<CreatePromoCode />} />
        <Route path="/CoursePage" element={<CoursePage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
