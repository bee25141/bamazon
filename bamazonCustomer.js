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
    console.log("connected as id " + connection.threadId);
});

//Calling function to display all available items in the store
storeView();

//This function displays all the items available in the store and allows the
//user to purchase a quantity based on user input
function storeView() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(item => console.log(item.id, item.PRODUCT_NAME, item.PRICE));
        inquirer.prompt([{
                name: "id",
                message: "Select a product ID to purchase",
                type: "input"
            },
            {
                name: "quantity",
                message: "Enter a quantity",
                type: "input"
            }
        ]).then(answers => {
            var itemToBuy = res.find(item => item.id == answers.id);
            if (itemToBuy.STOCK_QUANTITY < answers.quantity) {
                console.log("Insufficient quantity!")
                throw err;
            } else {
                var quant = parseInt(answers.quantity);
                let cost = itemToBuy.PRICE * answers.quantity;
                var difference = parseInt(itemToBuy.STOCK_QUANTITY) - parseInt(answers.quantity);
                connection.query(`UPDATE products SET STOCK_QUANTITY = ${difference} WHERE ?`, [{
                        id: itemToBuy.id
                    }], (error, response) => {
                    console.log(`${itemToBuy.PRODUCT_NAME} Price: ${itemToBuy.PRICE} Quantity: ${answers.quantity}`);
                    console.log(`\n Final cost: ${cost}`);
                })

            }
        });
        connection.end();
    });
};