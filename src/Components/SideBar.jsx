import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaNewspaper,
  FaInfoCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useTheme } from "../Context/ThemeContextProvider";

export default function SideBar() {
  const { theme, toggleTheme } = useTheme();

  const routes = [
    {
      pathName: "Dashboard",
      to: "/",
      icon: <FaTachometerAlt className="inline mr-2" />,
    },
    {
      pathName: "Markets",
      to: "/markets",
      icon: <FaChartLine className="inline mr-2" />,
    },
    {
      pathName: "News",
      to: "/news",
      icon: <FaNewspaper className="inline mr-2" />,
    },
    {
      pathName: "About",
      to: "/about",
      icon: <FaInfoCircle className="inline mr-2" />,
    },
  ];
  return (
    <div className="relative flex flex-col items-center gap-10 p-6 bg-black/20 h-[100vh]">
      <div className="text-accent font-bold text-2xl mb-6">CryptoKnight</div>
      <div className="flex flex-col gap-6 text-xl">
        {routes.map((route, i) => (
          <NavLink
            to={route.to}
            key={i}
            className={({ isActive }) =>
              isActive ? "bg-secondary/8 p-2 rounded-lg" : "p-2"
            }
          >
            {route.icon}
            {route.pathName}
          </NavLink>
        ))}
      </div>
      <div className="absolute bottom-10">
        <button onClick={toggleTheme}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}
