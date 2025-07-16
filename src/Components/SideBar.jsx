import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaNewspaper,
  FaInfoCircle,
} from "react-icons/fa";

export default function SideBar() {
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
    <div className="flex flex-col items-center gap-10 p-6 dark dark:bg-primary text-read h-[100vh]">
      <div className="text-accent font-bold text-2xl mb-6">CryptoKnight</div>
      <div className="flex flex-col gap-6 text-xl">
        {routes.map((route) => (
          <NavLink
            to={route.to}
            className={(isActive) => {
              isActive ? "bg-gray-800 flex items-center" : "flex items-center";
            }}
          >
            {route.icon}
            {route.pathName}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
