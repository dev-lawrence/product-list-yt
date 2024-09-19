import { Outlet } from "react-router-dom";
import Home from "../Home";

const RootLayout = () => {
  return (
    <>
      <Home />
      <Outlet />
    </>
  );
};

export default RootLayout;
