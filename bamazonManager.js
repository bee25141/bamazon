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
    if (answers.menuOptions === "View Products"){
        console.log("view products")
        viewProducts();
    } else if (answers.menuOptions === "View Low Inventory"){
        console.log("view low inventory")
        lowInventory();
    } else if (answers.menuOptions === "Add to Inventory"){
        console.log("add inventory")
        addInventory();
    } else if (answers.menuOptions === "Add New Product"){
        console.log("add product")
        addProduct();
    }
})

function viewProducts(){
    console.log("Displaying all products... \n");
    connection.query("SELECT * FROM products", function (err, res){
       if (err) throw err;
       res.forEach(item => console.log(`${item.id} ${item.PRODUCT_NAME} PRICE: $${item.PRICE} QUANTITY: ${item.STOCK_QUANTITY}`)); 
    })
}