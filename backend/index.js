const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/dbConnect"); // Đảm bảo dbConnect đã cấu hình kết nối MySQL
// const ActionHistory = require("./models/ActionHistory");
// Cấu hình và middleware
app.use(cors());
app.use(express.json());

// Đường dẫn chính để kiểm tra hoạt động
app.get("/", (req, res) => {
  res.send({ message: "Hello from IOT-Project API!" });
});

// Hàm để chuyển đổi ngày từ định dạng "dd/mm/yyyy" sang "yyyy-mm-dd"
const reverseFormatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

// API để thêm dữ liệu cảm biến
app.post("/api/data-sensor", (req, res) => {
  const { temperature, humidity, brightness, random_value } = req.body;

  const query = 'INSERT INTO datasensor (temperature, humidity, brightness, random_value, time) VALUES (?, ?, ?, ?, NOW())';
  db.query(query, [temperature, humidity, brightness, random_value], (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Sensor data created successfully" });
    }
  });
});

// API để lấy dữ liệu cảm biến với phân trang, tìm kiếm và sắp xếp
app.get("/api/get-sensor-data", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const page = parseInt(req.query.page) || 1;
  const searchText = req.query.searchText || "";
  const searchedColumn = req.query.searchedColumn || "";
  const sortField = req.query.sortField || "time";
  const sortOrder = req.query.sortOrder === "ascend" ? "ASC" : "DESC";

  let query = "SELECT * FROM datasensor";
  const params = [];

  if (searchText && searchedColumn) {
    if (searchedColumn === "temperature" || searchedColumn === "humidity" || searchedColumn === "brightness" || searchedColumn === "random_value") {
      query += ` WHERE ${searchedColumn} = ?`;
      params.push(parseFloat(searchText));
    } else if (searchedColumn === "time") {
      const date = reverseFormatDate(searchText);
      query += ` WHERE ${searchedColumn} BETWEEN ? AND ?`;
      params.push(`${date} 00:00:00`, `${date} 23:59:59`);
    }
  }

  query += ` ORDER BY ${sortField} ${sortOrder} LIMIT ? OFFSET ?`;
  params.push(pageSize, (page - 1) * pageSize);

  db.query(query, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error retrieving sensor data" });
    } else {
      db.query("SELECT COUNT(*) AS totalCount FROM datasensor", (err, countResult) => {
        if (err) {
          res.status(500).json({ error: "Error counting sensor data" });
        } else {
          res.json({
            data: results,
            totalCount: countResult[0].totalCount,
            pageSize,
            page,
          });
        }
      });
    }
  });
});



// API để thêm lịch sử hành động của thiết bị
app.post("/api/control-device", (req, res) => {
  const { device, action } = req.body;

  const query = 'INSERT INTO action_history (device, action, time) VALUES (?, ?, NOW())';
  db.query(query, [device, action], (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Action history created successfully" });
    }
  });
});

// API để lấy lịch sử hành động với phân trang và tìm kiếm
app.get("/api/get-action-history", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const page = parseInt(req.query.page) || 1;
  const searchText = req.query.searchText || "";
  const searchedColumn = req.query.searchedColumn || "";

  let query = "SELECT * FROM action_history";
  const params = [];

  if (searchText && searchedColumn) {
    if (searchedColumn === "time") {
      const date = reverseFormatDate(searchText);
      query += ` WHERE ${searchedColumn} BETWEEN ? AND ?`;
      params.push(`${date} 00:00:00`, `${date} 23:59:59`);
    } else {
      query += ` WHERE ${searchedColumn} LIKE ?`;
      params.push(`%${searchText}%`);
    }
  }

  query += " ORDER BY time DESC LIMIT ? OFFSET ?";
  params.push(pageSize, (page - 1) * pageSize);

  db.query(query, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error retrieving action history" });
    } else {
      db.query("SELECT COUNT(*) AS totalCount FROM action_history", (err, countResult) => {
        if (err) {
          res.status(500).json({ error: "Error counting action history" });
        } else {
          res.json({
            data: results,
            totalCount: countResult[0].totalCount,
            pageSize,
            page,
          });
        }
      });
    }
  });
});

// Khởi động server
const port = 3006;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
