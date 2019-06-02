const mysql = require("mysql");
const enquirer = require("enquirer");
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

function storeView() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(Object.keys(RowDataProduct));
        // for (i=0; i<res.RowDataPacket.length; i++){
        //     console.log(res[i])
        // }
        connection.end();
    });
};
storeView();