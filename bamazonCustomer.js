const mysql = require("mysql");
const userName = "";
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

let queryType = process.argv[2];
let userInput = process.argv.slice(3).join(" ");