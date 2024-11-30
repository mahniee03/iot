const db = require("./dbConnect");

// Hàm thêm dữ liệu cảm biến mới
const addSensorData = (temperature, humidity, brightness, random_value) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO datasensor (temperature, humidity, brightness, random_value) 
      VALUES (?, ?, ?, ?)
    `;
    db.query(query, [temperature, humidity, brightness], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Hàm lấy tất cả dữ liệu cảm biến
const getAllSensorData = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM datasensor ORDER BY time DESC
    `;
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Hàm lấy 10 dữ liệu cảm biến mới nhất
const get10LatestSensorData = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM datasensor 
      ORDER BY time DESC LIMIT 10
    `;
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0]);
    });
  });
};
// Hàm lấy dữ liệu cảm biến mới nhất
const getLatestSensorData = () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM datasensor 
        ORDER BY time DESC LIMIT 10
      `;
      db.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      });
    });
  };

module.exports = {
  addSensorData,
  getAllSensorData,
  getLatestSensorData,
  get10LatestSensorData
};
