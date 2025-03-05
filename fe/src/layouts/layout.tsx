import { Outlet } from "react-router-dom";
import Navbar from '../Components/Client/Home/Navbar' 

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
