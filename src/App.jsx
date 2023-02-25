import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

function App() {
  return (
    <Router basename="/reserve">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="hotels">
            <Route index element={<List />} />
            <Route path=":hotelId" element={<Hotel />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
