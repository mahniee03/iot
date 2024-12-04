import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { useMQTT } from "../../config/MQTTContext.js";
function LineChart2() {
  const { randomValueData = [] } = useMQTT();
  const { timeData = [] } = useMQTT();
  // const sampleData = [25, 30, 26, 22, 23, 24, 27, 25, 30, 30];
  
  
  return (
    <>
      <CChart
        type="line"
        data={{
          labels: timeData, // Nhãn cho trục X
          datasets: [
            {
              label: "Cảm biến",
              backgroundColor: "rgba(255, 206, 86, 1)",
              borderColor: "rgba(255, 206, 86, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: randomValueData, // Dữ liệu ánh sáng
            }
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              margin: '100px',
              labels: {
                color: "#000",
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "#1E3175",
              },
              ticks: {
                color: "#1E3175",
              },
            },
            y: {
              grid: {
                color: "#1E3175",
              },
              ticks: {
                color: "#1E3175",
              },
            },
          },
        }}
        style={{
            height: "1000px", // Tăng chiều cao
            width: "800px",  // Tăng chiều rộng
            marginLeft: "-20px", // Đẩy biểu đồ về phía bên phải
          }}
        customTooltips={false}
      />
    </>
  );
}

export default LineChart2;
