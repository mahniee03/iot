import { ConfigProvider, Layout, Tabs } from 'antd';
import Switches from "../../components/Switch";
import EnvironmentFactors from "../../components/EnvironmentFactors";
import LineChart from '../../components/Chart';

const { Header, Sider, Content } = Layout;

const envStyle = {
  textAlign: "center",
  color: "#fff",
  height: 200,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#E8E8EC",
};
const chartStyle = {
  textAlign: "center",
  minHeight: 500,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#E8E8EC",
};
const switchStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#E8E8EC",
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(100% - 8px)",
  height: "100vh",
  maxWidth: "calc(100% - 8px)",
};

function Dashboard() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: "#000",
              itemSelectedColor: "#1E3175",
              inkBarColor: "#1E3175",
              itemHoverColor: "#1E3175",
              itemActiveColor: "#1E3175",
            }
          },
          token: {
            fontSize: 16,
          },
        }}
      >
        <Layout style={layoutStyle}>
          <Header style={envStyle}>
            <h3></h3>
            <EnvironmentFactors />
          </Header>

          <Layout>

            <Content style={chartStyle}>
              <h3 style={{ margin: "0", color: "#1E3175", marginTop: "-20px", marginBottom: "-20px"}}>Chart</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <Tabs defaultActiveKey="3" items={tabItems} tabBarStyle={{marginLeft: "55px"}} /> */}
                <LineChart />
              </div>

            </Content>
            <Sider width="35%" style={switchStyle}>
              <h3 style={{ margin: "0", color: "#1E3175", marginTop: "-20px", marginBottom: "10px" }}>Device's Switch</h3>
              <Switches />
            </Sider>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default Dashboard;


