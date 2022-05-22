import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/register">
            <FaSignInAlt />
            Register
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaUser />
            User
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
