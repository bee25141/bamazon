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
    console.log("Updating product inventory... \n");
    connection.query("UPDATE products SET ? WHERE ?", [{
            STOCK_QUANTITY: quantity,
        },
        {
            id: productID
        }
    ], (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} Product inventory update successful!`);
    });
};

//This function adds a new item to the database based on user input
function addProduct(name, department, price, quantity){
    console.log("Adding a new product... \n");
    connection.query("INSERT INTO products SET ?",
    {
        PRODUCT_NAME: name,
        DEPARTMENT_NAME: department,
        PRICE: price,
        STOCK_QUANTITY: quantity
    },
    function(err, res){
        console.log(`${res.affectedRows} New product successfully added... \n`)
    });
}

//Running start function to intialize program
start();
