import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaNewspaper,
  FaInfoCircle,
} from "react-icons/fa";

export default function SideBar() {
  const routes = [
    { pathName: "Dashboard", to: "/", icon: <FaTachometerAlt /> },
    { pathName: "Markets", to: "/markets", icon: <FaChartLine /> },
    { pathName: "News", to: "/news", icon: <FaNewspaper /> },
    { pathName: "About", to: "/about", icon: <FaInfoCircle /> },
  ];
  return (
    <div>
      <div>CryptoKnight</div>
      <div>
        {routes.map((route) => {
          <NavLink to={route.to}>
            {route.icon}
            {route.pathName}
          </NavLink>;
        })}
      </div>
    </div>
  );
}
