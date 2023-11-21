import { useState, useContext } from "react";
import { FaUserCog, FaSearch } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import AuthService from "../services/auth";
import { AuthContext } from "context/AuthContext";

const NavBar = () => {
  const links = {
    home: "/",
    rated: "/ratings",
    recommendations: "/",
  };
  const [visible, setVisible] = useState(false);
  let { authTokens } = useContext<any>(AuthContext);

  const handleMenuClick = async (e: any) => {
    if (e.key === "signout") {
      const res = await AuthService.signout();
      console.log(res);
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

  return (
    <>
      {authTokens && (
        <div className="bg-dark fixed z-10 w-full flex flex-row justify-between items-center px-5 sm:px-10 py-2">
          <div className="flex flex-row gap-4">
            <SlGameController className="text-secondary text-4xl ml-2" />
            <ul className="flex flex-row gap-3 items-center mb-0">
              {Object.entries(links).map(([key, value]) => (
                <li key={key}>
                  <Link to={value} className="text-secondary text-xs">
                    {key}
                  </Link>
                </li>
              ))}
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
      )}
    </>
  );
};

export default NavBar;
