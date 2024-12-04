import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { useMQTT } from "../../config/MQTTContext.js";


function LineChart() {
  const { temperatureData = [], humidityData = [], brightnessData = [] } = useMQTT();
  const { timeData = [] } = useMQTT();
  // const sampleData = {
  //   temperatureData: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  //   humidityData: [70, 72, 74, 76, 78, 80, 82, 84, 86, 88],
  //   brightnessData: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190],
  // };
  
  // const { temperatureData, humidityData, brightnessData } = sampleData;

  // if (temperatureData.length === 0 || humidityData.length === 0 || brightnessData.length === 0) {
  //   return <p>Loading chart data...</p>;
  // }
  
  return (
    <>
      <CChart
        type="line"
        data={{
          labels: timeData, // Nhãn cho trục X
          datasets: [
            {
              label: "Brightness",
              backgroundColor: "rgba(255, 206, 86, 1)",
              borderColor: "rgba(255, 206, 86, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: brightnessData, // Dữ liệu ánh sáng
            },
            {
              label: "Temperature",
              backgroundColor: "rgba(255, 99, 132, 1)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#000",
              data: temperatureData, // Dữ liệu nhiệt độ
            },
            {
              label: "Humidity",
              backgroundColor: "rgba(54, 162, 235, 1)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: humidityData, // Dữ liệu độ ẩm
            },
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
          height: "700px", // Tăng chiều cao
          width: "790px",  // Tăng chiều rộng
        }}
        customTooltips={false}
      />
      
    </>
  );
}

export default LineChart;
