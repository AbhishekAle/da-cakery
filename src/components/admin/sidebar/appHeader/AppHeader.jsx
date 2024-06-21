import React, { useEffect } from "react";
import "./AppHeader.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, theme, Dropdown, Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile, setLogout } from "../../../../redux/features/authSlice";
import { toast } from "react-toastify";
import { FaCircle } from "react-icons/fa";
const { Header, Content } = Layout;

const AppHeader = ({ collapsed, toggleCollapsed }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setLogout());
    toast.success("logout successfully!");
    navigate("/login");
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={handleLogout}>Logout</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleCollapsed,
            }
          )}
          <div className="header-actions">
            {user && (
              <Dropdown overlay={menu}>
                <div className="user cursor-pointer">
                  <div className="circle-image ">
                    {user.avatar_url ? (
                      <img
                        objectFit="cover"
                        src={user.avatar_url}
                        alt="User profile"
                        className="img-fluid w-8 h-8 rounded-full"
                      />
                    ) : (
                      <FaCircle size={30} /> // Render the circle icon if avatar_url is not available
                    )}
                  </div>
                  <span className="name">{user.name}</span>
                  <DownOutlined style={{ marginLeft: "8px" }} />
                </div>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default AppHeader;
