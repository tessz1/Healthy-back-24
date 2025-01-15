import HomePage from "./pages/HomePage.tsx";
import Orders from "./pages/Orders.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<HomePage />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  )
}

export default App;
