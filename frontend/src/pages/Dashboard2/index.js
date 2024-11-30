import { ConfigProvider, Layout, Tabs } from 'antd';

import EnvironmentFactors2 from '../../components/EnvironmentFactors2';
import Switches2 from '../../components/Switch2';
import LineChart2 from '../../components/Chart2';

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
  maxWidth: "calc(100% - 8px)",
};

function Dashboard2() {
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
            <h1> </h1>
            {/* <h3 style={{ margin: "0", color: "#1E3175" }}>Chart</h3> */}
            <EnvironmentFactors2 />
          </Header>

          <Layout>

            <Content style={chartStyle}>
              {/* <h3 style={{ margin: "0", color: "#1E3175" }}>Chart</h3> */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "-30px"}}>
                {/* <Tabs defaultActiveKey="3" items={tabItems} tabBarStyle={{marginLeft: "55px"}} /> */}
                <LineChart2 />
              </div>
              <h3></h3>
            </Content>
            <Sider width="35%" style={switchStyle}>
              
              <h3 style={{ margin: "0", marginLeft: "-50px", color: "#1E3175" }}>Device's Switch</h3>
              <Switches2 />
            </Sider>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default Dashboard2;
