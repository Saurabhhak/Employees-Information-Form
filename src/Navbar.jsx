import "./Navbar.css";
import { Link } from "react-router-dom";
function NavbarSection() {
  return (
    <>
      <div className="header">
        <nav className="nav-left">
          <Link to="/" className="navlink">
            <button className="navbtn">Home</button>
          </Link>
          <Link to="/feature" className="navlink">
            <button className="navbtn">Feature</button>
          </Link>
          <Link to="/dashboard" className="navlink">
            <button className="navbtn">Dashboard</button>
          </Link>
        </nav>
        <nav className="nav-right">
          <Link to="/profile" className="navlink">
            <i className="fa-solid fa-user-circle"></i>
          </Link>
          <Link to="/login" className="navlink">
            <i className="fa-solid fa-sign-out"></i>
          </Link>
        </nav>
      </div>
    </>
  );
}
export default NavbarSection;
