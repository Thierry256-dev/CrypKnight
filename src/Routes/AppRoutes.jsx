import { Routes, Route } from "react-router-dom";
import About from "../Pages/About";
import Markets from "../Pages/Markets";
import Dashboard from "../Pages/Dashboard";
import News from "../Pages/News";
import CoinDetails from "../Pages/CoinDetails";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/news" element={<News />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/coindetails/:coinId" element={<CoinDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
