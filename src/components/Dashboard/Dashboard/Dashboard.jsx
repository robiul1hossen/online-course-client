import { Link, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import Navbar from "../../share/Navbar/Navbar";
import Footer from "../../share/Footer/Footer";

const Dashboard = () => {
  const isAdmin = true;

  return (
    <div>
      <Navbar></Navbar>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  p-4 w-80 min-h-full bg-[#343A40] text-white">
            {isAdmin ? (
              <>
                <li className="hover:bg-[#fff]">
                  <a>Sidebar Item 1</a>
                </li>
                <li className="hover:bg-[#fff]">
                  <a>Sidebar Item 2</a>
                </li>
                <li className="hover:bg-[#fff]">
                  <Link to="/dashboard/allusers">
                    <FaUsers></FaUsers> All Usres
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:bg-[#fff]">
                  <a>Sidebar Item 3</a>
                </li>
                <li className="hover:bg-[#fff]">
                  <a>Sidebar Item 4</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
