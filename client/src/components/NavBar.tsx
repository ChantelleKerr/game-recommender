import { useState, useContext, useEffect } from "react";
import { FaUserCog, FaSearch } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { Link, useMatch } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import AuthService from "services/auth";
import { AuthContext } from "context/AuthContext";
import "styles/styles.css";

const NavBar = () => {
  const links = {
    Home: "/",
    Browse: "/browse",
    Rated: "/ratings",
    Recommendations: "/recommend",
  };
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  let { authTokens, logout } = useContext<any>(AuthContext);

  const handleMenuClick = async (e: any) => {
    if (e.key === "signout") {
      await AuthService.signout(logout, authTokens);
    } else if (e.key === "profile") {
    }
    setVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <Link to="/">Profile</Link>
      </Menu.Item>
      <Menu.Item key="signout">
        <Link to="/login">Sign Out</Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-30 w-full flex flex-row justify-between items-center px-5 sm:px-10 py-4 ${
        isScrolled ? "nav-solid" : "nav-gradient"
      }`}
    >
      <div className="flex flex-row gap-4">
        <SlGameController className="text-primary text-4xl ml-2" />
        <ul className="flex flex-row gap-6 items-center mb-0">
          {Object.entries(links).map(([key, value]) => {
            const match = useMatch(value);
            return (
              <li key={key}>
                <Link
                  to={value}
                  className={`text-s ${
                    match ? "text-secondary" : "text-secondary/80"
                  }`}
                >
                  {key}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-row items-center py-1">
        <Dropdown
          overlay={menu}
          trigger={["hover"]}
          open={visible}
          onOpenChange={(flag) => setVisible(flag)}
        >
          <button
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <FaUserCog size="24" className="text-secondary" />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
