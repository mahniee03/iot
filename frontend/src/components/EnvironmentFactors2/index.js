import { Card, Col, Row, Progress } from "antd";
import { useMQTT } from "../../config/MQTTContext.js";

function EnvironmentFactors2() {
//   const { connected, dataSensor, temperatureData, humidityData, brightnessData } = useMQTT();
  const random_value = 30;
  // const humidity = 70;
  // const brightness = 100;
  // Màu sắc của các thanh tiến độ
  const random_valueColors = {
    '0%': '#87d068',
    '30%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <>
      <Row gutter={16} >
        <Col span={8} style={{marginLeft: "830px"}}>
          <Card bordered={false}>
            <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px"}}>Cảm biến</p>
            <Progress
              type="dashboard"
              percent={(random_value)}
              strokeColor={random_valueColors}
              strokeWidth={12}
              size={90}
            //   format={(percent) => Math.round((percent / 100) * 400) + " lux"}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EnvironmentFactors2;