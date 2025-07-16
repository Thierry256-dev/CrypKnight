import SideBar from "../Components/SideBar";

export default function LayOut({ children }) {
  return (
    <div className="flex relative w-screen">
      <div className="sticky h-[100vh] w-auto">
        <SideBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
