const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MinhAnh_1',
    database: 'iotdb'  // Tên cơ sở dữ liệu của bạn
});

db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối cơ sở dữ liệu: ', err);
    } else {
        console.log('Kết nối đến MySQL thành công');
    }
});

module.exports = db;
