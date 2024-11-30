import { Card, Col, Row, Progress } from "antd";
import { useMQTT } from "../../config/MQTTContext.js";

function EnvironmentFactors() {
  const { connected, dataSensor, temperatureData, humidityData, brightnessData } = useMQTT();
  // const temperature = 30;
  // const humidity = 70;
  // const brightness = 100;
  // Màu sắc của các thanh tiến độ
  const brightnessColors = {
    '0%': '#87d068',
    '30%': '#ffe58f',
    '100%': '#ffccc7',
  };

  const temperatureColors = {
    '0%': '#e1eec3',
    '30%': '#f05053',
    '100%': '#f05053',
  };

  const humidityColors = {
    '0%': '#E5CCC3',
    '100%': '#6047DF',
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px" }}>Temperature</p>
            <Progress
              type="dashboard"
              percent={(dataSensor.temperature / 50) * 100}
              strokeColor={temperatureColors}
              strokeWidth={12}
              size={90}
              format={(percent) => Math.round((percent / 100) * 50) + " °C"}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px" }}>Humidity</p>
            <Progress
              type="dashboard"
              percent={dataSensor.humidity}
              strokeColor={humidityColors}
              strokeWidth={12}
              size={90}
              format={(percent) => percent + "%"}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px" }}>Brightness</p>
            <Progress
              type="dashboard"
              percent={(dataSensor.brightness / 400) * 100}
              strokeColor={brightnessColors}
              strokeWidth={12}
              size={90}
              format={(percent) => Math.round((percent / 100) * 400) + " lux"}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EnvironmentFactors;

// import { Card, Col, Row, Progress } from "antd";
// import React, { useState, useEffect } from "react"; // Sử dụng useState và useEffect để gọi API

// function EnvironmentFactors() {
//   // Khởi tạo state để lưu dữ liệu cảm biến
//   const [dataSensor, setDataSensor] = useState(null);
//   const [loading, setLoading] = useState(true); // Để quản lý trạng thái loading

//   // Màu sắc của các thanh tiến độ
//   const brightnessColors = {
//     '0%': '#87d068',
//     '30%': '#ffe58f',
//     '100%': '#ffccc7',
//   };

//   const temperatureColors = {
//     '0%': '#e1eec3',
//     '30%': '#f05053',
//     '100%': '#f05053',
//   };

//   const humidityColors = {
//     '0%': '#E5CCC3',
//     '100%': '#6047DF',
//   };

//   // Gọi API để lấy dữ liệu cảm biến
//   useEffect(() => {
//     const fetchSensorData = async () => {
//       try {
//         const response = await fetch('/api/get-latest-sensor-data'); // Địa chỉ API của bạn
//         if (!response.ok) {
//           throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }

//         const data = await response.json(); // Dữ liệu trả về từ API
        
//         // Kiểm tra nếu API trả về mảng dữ liệu và lấy dữ liệu mới nhất (cái đầu tiên)
//         if (Array.isArray(data) && data.length > 0) {
//           const latestData = data[0]; // Lấy bản ghi mới nhất (cái đầu tiên)
//           setDataSensor(latestData); // Cập nhật dữ liệu vào state
//         }

//         setLoading(false); // Đặt trạng thái loading là false khi dữ liệu đã được tải thành công
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false); // Đặt trạng thái loading là false nếu có lỗi
//       }
//     };

//     // Gọi hàm fetchSensorData khi component mount
//     fetchSensorData();

//     // Nếu bạn muốn gọi lại API sau mỗi 5 giây (có thể tùy chỉnh thời gian)
//     const intervalId = setInterval(fetchSensorData, 5000);

//     // Dọn dẹp khi component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   // Hiển thị khi dữ liệu đang tải
//   if (loading) {
//     return <p>Loading sensor data...</p>;
//   }

//   // Kiểm tra nếu không có dữ liệu
//   if (!dataSensor) {
//     return <p>No sensor data available.</p>;
//   }

//   return (
//     <>
//       <Row gutter={16}>
//         <Col span={8}>
//           <Card bordered={false}>
//             <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px" }}>Temperature</p>
//             <Progress
//               type="dashboard"
//               percent={(dataSensor.temperature / 50) * 100} // Chuyển đổi giá trị nhiệt độ thành phần trăm
//               strokeColor={temperatureColors}
//               strokeWidth={12}
//               size={90}
//               format={(percent) => Math.round((percent / 100) * 50) + " °C"}
//             />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card bordered={false}>
//             <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px" }}>Humidity</p>
//             <Progress
//               type="dashboard"
//               percent={dataSensor.humidity} // Trực tiếp sử dụng giá trị độ ẩm
//               strokeColor={humidityColors}
//               strokeWidth={12}
//               size={90}
//               format={(percent) => percent + "%"}
//             />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card bordered={false}>
//             <p style={{ margin: 0, marginBottom: "10px", marginTop: "-10px" }}>Brightness</p>
//             <Progress
//               type="dashboard"
//               percent={(dataSensor.brightness / 400) * 100} // Chuyển đổi giá trị độ sáng thành phần trăm
//               strokeColor={brightnessColors}
//               strokeWidth={12}
//               size={90}
//               format={(percent) => Math.round((percent / 100) * 400) + " lux"}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default EnvironmentFactors;
