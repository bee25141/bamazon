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

let queryType = process.argv[2];
let userInput = process.argv.slice(3).join(" ");
storeView();

function storeView() {
    // console.log("Selecting all products...\n");
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
            let itemToBuy = res.find(item => item.id == answers.id);
            if (itemToBuy.STOCK_QUANTITY < answers.quantity) {
                console.log("Insufficient quantity!")
                throw err;
            } else {
                let cost = itemToBuy.PRICE * answers.quantity;
                let itemsLeft = itemToBuy.STOCK_QUANTITY - answers.quantity;
                connection.query(
                    "UPDATE products SET ? WHERE ?" [{
                            STOCK_QUANTITY: itemsLeft
                        },
                        {
                            id: itemToBuy.id
                        }
                    ], (error, response) => {
                        console.log(itemsLeft);
                        // console.log(`${itemToBuy.PRODUCT_NAME} Price: ${itemToBuy.PRICE} Quantity: ${answers.quantity}`);
                        // console.log(`Final cost: ${cost} /n Remaining Quantity: ${itemToBuy.STOCK_QUANTITY}`);
                    }
                )

            }
        });
        connection.end();
    });
};