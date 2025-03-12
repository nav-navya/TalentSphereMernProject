import { Outlet } from "react-router-dom";
import Navbar from "../pages/Freelancers/Home/Navbar";

const FLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default FLayout;