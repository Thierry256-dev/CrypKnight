import SideBar from "../Components/SideBar";
import { ThemeProvider, useTheme } from "../Context/ThemeContextProvider";

export default function LayOut({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className={`flex relative w-screen ${
        theme === "dark" ? "dark:bg-primary text-read" : "bg-[#fffafa]"
      } `}
    >
      <div className="sticky h-[100vh] w-auto">
        <SideBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
