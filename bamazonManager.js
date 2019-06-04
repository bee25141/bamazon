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

//Prompting the user to choose a menu item of actions to make in the store inventory
inquirer.prompt([{
    name: "menuOptions",
    type: "list",
    choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
}]).then(answers => {
    if (answers.choices === "View Products"){
        viewProducts();
    } else if (answers.choices === "View Low Inventory"){
        lowInventory();
    } else if (answers.choices === "Add to Inventory"){
        addInventory();
    } else if (answers.choices === "Add New Product"){
        addProduct();
    }
})