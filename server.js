const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "AuraZaira77",
  database: "employee_tracker"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();

});

  function start() {

    inquirer.prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "view all Employees",
          "view Employees by Department",
          "view Employees by Role",
          "add Employee",
          "update Employee",
          "Quit"
        ]
      }
    ]).then(res => {
      if (res.userChoice === "view all Employees") {
        viewAllEmp();
    }
    else if (res.userChoice === "view Employees by Department") {
        viewEmpDepartment();
    }
    else if (res.userChoice === "view Employees by Role") {
        viewEmpRole();
    }
    else if (res.userChoice === "add Employee") {
        addEmployee();
    }
    else if (res.userChoice === "update Employee") {
        updateRole();
    }
   
    else if (res.userChoice === "Quit") {
        console.log("====Goodbye====");
    }
    else {
        connection.end();
    }
});
}
  function viewAllEmp() {
    connection.query("SELECT first_name, last_name, title, yearly_salary,name FROM employee LEFT JOIN role ON employee.role_id = role.RoleId LEFT JOIN department ON role.department_id = department.DepId",
    function (err, result) {
        
        if (err) throw err;

        console.table(result);
        start();
    });
}
  