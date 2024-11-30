import React from 'react';
import { CChart } from '@coreui/react-chartjs';
function LineChart2() {

  const sampleData = [25, 30, 26, 22, 23, 24, 27, 25, 30, 30];
  
  
  return (
    <>
      <CChart
        type="line"
        data={{
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // Nhãn cho trục X
          datasets: [
            {
              label: "Cảm biến",
              backgroundColor: "rgba(255, 206, 86, 1)",
              borderColor: "rgba(255, 206, 86, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: sampleData, // Dữ liệu ánh sáng
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
            height: "800px", // Tăng chiều cao
            width: "790px",  // Tăng chiều rộng
          }}
        customTooltips={false}
      />
    </>
  );
}

export default LineChart2;
