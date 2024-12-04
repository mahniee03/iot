import { get } from "../config/api.js";

export const getDataSensor = async (pageSize, page, searchText, searchedColumn, sortField, sortOrder) => {
    const result = await get(`api/get-sensor-data?pageSize=${pageSize}&page=${page}&searchText=${searchText}
      &searchedColumn=${searchedColumn}&sortField=${sortField}&sortOrder=${sortOrder}`);
    return result;
};

// export const getLatestSensorData = async () => {
//     try {
//         // Gửi yêu cầu GET để lấy dữ liệu cảm biến mới nhất
//         const result = await get('api/get-latest-sensor-data');  // Giả sử API này trả về dữ liệu mới nhất
//         return result;  // Trả về dữ liệu cảm biến mới nhất
//     } catch (error) {
//         console.error('Error fetching latest sensor data:', error);
//         throw error;  // Đảm bảo rằng lỗi sẽ được xử lý nếu có sự cố
//     }
// };
export const getLatestSensorData = async (setDataSensor, setError, setLoading) => {
    try {
      const response = await fetch('/api/get-latest-sensor-data');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();  // Dữ liệu trả về từ API
      
      // Kiểm tra nếu API trả về mảng dữ liệu và lấy dữ liệu mới nhất (cái đầu tiên)
      if (Array.isArray(data) && data.length > 0) {
        const latestData = data[0]; // Lấy bản ghi mới nhất (cái đầu tiên)
        setDataSensor(latestData); // Cập nhật dữ liệu vào state
      } else {
        setError("No sensor data available.");
      }
  
      setLoading(false); // Đặt trạng thái loading là false khi dữ liệu đã được tải thành công
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Đặt trạng thái loading là false nếu có lỗi
      setError("Failed to fetch sensor data.");
    }
  };
  
