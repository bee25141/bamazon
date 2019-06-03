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

storeView();

function updateTest() {
    connection.query("UPDATE products SET ? WHERE ?", [{
            STOCK_QUANTITY: 500,
        },
        {
            id: 2
        }
    ], (error, response) => {
        console.log(response)
    })
};
// updateTest();

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
                connection.query("UPDATE products SET ? WHERE ?", [{
                        STOCK_QUANTITY: itemToBuy.STOCK_QUANTITY - answers.quantity,
                    },
                    {
                        id: itemToBuy.id
                    }
                ], (error, response) => {
                    console.log(itemToBuy.id);
                    // console.log(`${itemToBuy.PRODUCT_NAME} Price: ${itemToBuy.PRICE} Quantity: ${answers.quantity}`);
                    // console.log(`Final cost: ${cost} /n Remaining Quantity: ${itemToBuy.STOCK_QUANTITY}`);
                    console.log(response);
                })

            }
        });
        connection.end();
    });
};