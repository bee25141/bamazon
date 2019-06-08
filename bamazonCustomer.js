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

//Calling function to display all available items in the store
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
                console.log(itemToBuy.STOCK_QUANTITY);
                console.log(cost);
                // buyItem(50, quant, itemToBuy);
                connection.query("UPDATE products SET ? WHERE ?", [{
                        STOCK_QUANTITY: (itemToBuy.STOCK_QUANTITY - answers.quantity),
                    },
                    {
                        id: itemToBuy
                    }], (error, response) => {
                    console.log(itemToBuy.id);
                    console.log(itemToBuy.STOCK_QUANTITY);
                    // console.log(`${itemToBuy.PRODUCT_NAME} Price: ${itemToBuy.PRICE} Quantity: ${answers.quantity}`);
                    // console.log(`Final cost: ${cost} /n Remaining Quantity: ${itemToBuy.STOCK_QUANTITY}`);
                    console.log(response);
                })

            }
        });
        connection.end();
    });
};

function buyItem(){
    connection.query("UPDATE products SET ? WHERE ?", [{
        STOCK_QUANTITY: stock - answers,
    },
    {
        id: item
    }], (error, response) => {
    console.log(response);
})

}