const mysql = require("mysql");
const db = mysql.createConnection(
    {
        host: "localhost",
        user :"root",
        password: "123456798",
        database: "car_renting"
    }
)

module.exports=db;