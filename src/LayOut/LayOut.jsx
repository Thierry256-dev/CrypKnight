import SideBar from "../Components/SideBar";

export default function LayOut({ children }) {
  return (
    <div className="flex relative w-screen dark dark:bg-primary">
      <div className="sticky h-[100vh] w-auto">
        <SideBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
