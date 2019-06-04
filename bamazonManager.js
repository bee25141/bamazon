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
function start() {
    inquirer.prompt([{
        name: "menuOptions",
        type: "list",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(answers => {
        if (answers.menuOptions === "View Products") {
            console.log("view products")
            viewProducts();
        } else if (answers.menuOptions === "View Low Inventory") {
            console.log("view low inventory")
            lowInventory();
        } else if (answers.menuOptions === "Add to Inventory") {
            console.log("add inventory")
            inquirer.prompt([{
                    name: "updateID",
                    type: "input",
                    message: "Enter a product ID to update"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Enter a new quantity"
                }
            ]).then(answers => {
                addInventory(answers.updateID, answers.quantity);
            })
        } else if (answers.menuOptions === "Add New Product") {
            console.log("add product")
            addProduct();
        }
    });
};

//This function displays all available products in the store
function viewProducts() {
    console.log("Displaying all products... \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(item => console.log(`${item.id} ${item.PRODUCT_NAME} PRICE: $${item.PRICE} QUANTITY: ${item.STOCK_QUANTITY}`));
    })
};

//This product updates a product inventory based on user input
function addInventory(productID, quantity) {
    console.log("Updating product inventory... ");
    connection.query("UPDATE products SET ? WHERE ?", [{
            STOCK_QUANTITY: quantity,
        },
        {
            id: productID
        }
    ], (err, response) => {
        if (err) throw err;
        // console.log(`Successfully updated ${item.id} ${item.PRODUCT_NAME} New Quantity ${item.STOCK_QUANTITY}`);
        console.log("Product inventory update successful!");
    });
};

//Running start function to intialize program
start();