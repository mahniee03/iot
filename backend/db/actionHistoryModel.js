const db = require("./dbConnect");

// Hàm thêm bản ghi mới
const addAction = (device, action) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO action_history (device, action) VALUES (?, ?)";
    db.query(query, [device, action], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Hàm lấy tất cả các bản ghi
const getAllActions = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM action_history ORDER BY time DESC";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Hàm xóa bản ghi theo ID
const deleteActionById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM action_history WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  addAction,
  getAllActions,
  deleteActionById,
};
