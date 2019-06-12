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

//This function begins the application and offers the user the choice between
//viewing total sales by department or to creating an entirely new department
let start = function(){
inquirer.prompt([{
    name: "menuOptions",
    type: "list",
    choices: ["View Product Sales", "Create Department"]
}]).then(answers => {
    console.log(answers);
    if (answers.menuOptions === "View Product Sales"){
        supervisorSales();
    } else if(answers.menuOptions === "Create Department"){
        inquirer.prompt([{
            name: "name",
            type: "input",
            message: "Please enter a department name"
        },
    {
        name: "costs",
        type: "input",
        message: "What are the department's overhead costs?"
    }]).then(answers => {
            createDepartment(answers.name, answers.costs)
        })
    }
})
}
 //Function used for creating a new department based on the user's input
let createDepartment = function (name, costs) {
    console.log("Creating new department... \n");
    connection.query("INSERT INTO department SET ?", [{
            department_name: name,
            over_head_costs: costs
        }
    ], (err, res) => {
        if (err) throw err;
        console.log(`Department successfully created \n`);
        start();
    });
};

//Function used to view the total sales for each department
let supervisorSales = function() {
    connection.query("SELECT SUM(p.product_sales) AS sales, p.department_name, d.department_id, d.over_head_costs FROM products p INNER JOIN department d ON p.department_name = d.department_name GROUP BY d.department_id", function (err, res) {
        console.table(res);
        start();
    })
}

//Calling start function to initilize application
start();