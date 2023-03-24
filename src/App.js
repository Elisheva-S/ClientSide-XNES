import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import Departments from "./Department/Departments";
import Details from "./Details/Details";
import Products from "./Product/Products";
import EditDep from "./EditDep/EditDep";
import EditPro from "./EditPro/EditPro";
function App() {
  return (
    <div align="center">
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-iten m-1">
            <NavLink
              className="btn btn-dark btn-outline-primary"
              to="Department/Departments"
            >
              Departments
            </NavLink>
            <NavLink
              className="btn btn-dark btn-outline-primary"
              to="Product/Products"
            >
              Products
            </NavLink>
            <NavLink
              className="btn btn-light btn-outline-primary"
              to="Details/Details"
            >
              Details
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="Department/Departments" element={<Departments />} />
        <Route path="Product/Products" element={<Products />} />
        <Route path="Details/Details" element={<Details />} />
        <Route path="EditDep/EditDep" element={<EditDep />} loader />
        <Route path="EditPro/EditPro" element={<EditPro />} loader />
      </Routes>
    </div>
  );
}

export default App;
