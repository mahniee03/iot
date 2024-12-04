import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChartOutlined, UserOutlined, HomeOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './Sider.scss'; // Import custom CSS

const { Sider } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <LineChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "dashboard2",
    icon: <LineChartOutlined />,
    label: "Dashboard 2",
  },
  {
    key: "environment",
    icon: <HomeOutlined />,
    label: "Environment",
  },
  {
    key: "device",
    icon: <ThunderboltOutlined />,
    label: "Device",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  }
];

function PageSider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.substring(1) || ""
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (item) => {
    navigate(`/${item.key}`);
    setSelectedKey(item.key);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedColor: "white",
              itemSelectedBg: "#1E3175",
              iconSize: 22,
            },
          },
        }}
      >
        <Sider
          trigger={null}
          width={90} // Adjust width as needed
          style={{
            background: colorBgContainer
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{
              borderRight: 0,
              textAlign: 'center', // Center text and icons
              marginTop: '20px', // Adjust top margin as needed
              height: '100px', // Adjust height as needed
              width: '100px',
            }}
            items={items.map(item => ({
              key: item.key,
              icon: (
                <div className="menu-item-content">
                  {item.icon}
                  <span className="menu-item-label">{item.label}</span>
                </div>
              ),

            }))}
            onSelect={handleSelect}
          />
        </Sider>
      </ConfigProvider>
    </>
  );
}

export default PageSider;
