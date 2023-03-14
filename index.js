const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


// An array of questions for user input
const questions = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: [
            'View All Employee', 
            'Add Employee', 
            'Update Employee Role', 
            'View All Roles', 
            'Add Role', 
            'View All Departments', 
            'Add Department', 
            'Quit'
        ]
    },
];

function askTasks() {
    return inquirer.prompt(questions)
        .then((answers) => {

            // if(answers.task==="Quit") {
            //     process.exit();
            // } else {
            //     // Do MySQL operation
            //     // Display MySQL table
            //     askTasks();
            // }
            
            // if(answers.task==="Quit")
            switch(answers.task) {
                case "Quit":
                    process.exit();
                case "View All Employee":
                    // Do MySQL operation and display MySQL table
                    viewAllEmployees();
                    break;
            } // ends switch
            askTasks();
                
            return answers
        })
        .catch((error) => {
            console.log(error)
        })
}


// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'company_db'
    }
);

function viewAllEmployees() {
    // Query database
    //'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    db.query("SELECT employee.id AS id, employee.first_name AS first_name, employee.role_id AS role_id, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM `employee` LEFT JOIN `employee` as `manager` ON employee.manager_id = manager.id", function (err, results) {
        console.log(results);
        //console.log(results);
        for(var i = 0; i<results.length; i++) {
            anEmployee = results[i];
            aRoleId = anEmployee.role_id;

            var query = `select * from role INNER JOIN department ON role.department_id = department.id AND role.id = ${aRoleId}`;
            // do another query..
            // concat this new role-departments-array to results[i]
        }
        // Print result after the for loop is done expanding the employees info
        console.table(results)
        // TODO:
            //For-loop to combine with the second query to get all role details and department names
    });
}

askTasks()