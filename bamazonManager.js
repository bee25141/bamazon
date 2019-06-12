//Setting global variables and connection to MySql database
const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"

});
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

//Prompting the user to choose a menu item of actions to make in the store inventory
function start() {
    inquirer.prompt([{
        name: "menuOptions",
        type: "list",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(answers => {
        if (answers.menuOptions === "View Products") {
            viewProducts();
        } else if (answers.menuOptions === "View Low Inventory") {
            lowInventory();
        } else if (answers.menuOptions === "Add to Inventory") {
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
            inquirer.prompt([{
                    name: "name",
                    type: "input",
                    message: "Enter new product name"
                },
                {
                    name: "department",
                    type: "input",
                    message: "Enter new product department"
                },
                {
                    name: "price",
                    type: "input",
                    message: "Enter product price"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Enter product quantity"
                }
            ]).then(answers => {
                addProduct(answers.name, answers.department, answers.price, answers.quantity);
            })
        }
    });
};

//This function displays all available products in the store
function viewProducts() {
    console.log("Displaying all products... \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(item => console.log(`\n ${item.id} ${item.PRODUCT_NAME} PRICE: $${item.PRICE} QUANTITY: ${item.STOCK_QUANTITY}`));
    })
    start();
};

//This function displays products with an inventory of less than 5 items
function lowInventory() {
    console.log("Displaying products with an inventory of less than 5 items... \n");
    connection.query("SELECT * FROM products WHERE STOCK_QUANTITY < 5", [{

    }], (err, res) => {
        if (err) throw err;
        res.forEach(item => console.log(`\n ${item.id} ${item.PRODUCT_NAME} QUANTITY: ${item.STOCK_QUANTITY}`));
        start();
    });
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
        console.log(`${res.affectedRows} Product inventory update successful! \n`);
        start();
    });
};

//This function adds a new item to the database based on user input
function addProduct(name, department, price, quantity) {
    console.log("Adding a new product... \n");
    connection.query("INSERT INTO products SET ?", {
            PRODUCT_NAME: name,
            DEPARTMENT_NAME: department,
            PRICE: price,
            STOCK_QUANTITY: quantity
        },
        function (err, res) {
            console.log(`${res.affectedRows} New product successfully added... \n`);
            start();
        });
}

//Running start function to intialize program
start();