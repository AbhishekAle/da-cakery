import React, { useState } from "react";
import "./MainLayout.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/OhoCake.png";
import { items } from "./routes/MenuItems";
import AppHeader from "./appHeader/AppHeader";
import MetaData from "../../../pages/metaData/MetaData";

const { Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <MetaData title="admin dashboard" />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg" // Add this breakpoint for responsiveness
          collapsedWidth={80} // Set the collapsed width for small screens
          onBreakpoint={(broken) => {
            // Handle sidebar breakpoint changes
            if (broken) {
              setCollapsed(true);
            } else {
              setCollapsed(false);
            }
          }}
        >
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Company Logo" className="img-fluid" />
            </Link>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[""]}
            style={{
              height: "100%",
            }}
            onClick={({ key }) => {
              if (key === "signout") {
                // Handle sign out
              } else {
                navigate(key);
              }
            }}
          >
            {items &&
              items.map((item) => (
                <React.Fragment key={item.key}>
                  {item.children && item.children.length > 0 ? (
                    <Menu.SubMenu
                      key={item.key}
                      icon={item.icon}
                      title={item.label}
                    >
                      {item.children.map((child) => (
                        <Menu.Item
                          key={child.key}
                          icon={child.icon}
                          label={child.label}
                        >
                          {child.label}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      label={item.label}
                    >
                      {item.label}
                    </Menu.Item>
                  )}
                </React.Fragment>
              ))}
          </Menu>
        </Sider>
        <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      </Layout>
    </>
  );
};

export default MainLayout;
