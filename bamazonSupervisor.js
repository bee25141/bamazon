//Setting global variables and connection to MySql database
const mysql = require("mysql");
const inquirer = require("inquirer");
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

// inquirer.prompt([{
//     name: "menuOptions",
//     type: "list",
//     choices: ["View Product Sales", "Create Department"]
// }]).then(answers => {
//     console.log(answers);
//     if (answers.menuOptions === "View Product Sales"){
//         supervisorSales();
//     } else if(answers.menuOptions === "Create Department"){

//     }
// })

function supervisorSales(){
    connection.query("SELECT * FROM department", function(err, res){
        console.log(res);
    })
}
supervisorSales();
