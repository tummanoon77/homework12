const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const CFonts = require("cfonts");

//Title section
//========================================
CFonts.say('Employee|Manager!', {
  font: 'block',
  align: 'center',
  colors: ['system'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0',
});

// set connection
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
 // function start
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
          "add Department",
          "add Roles",
          "remove Employee",
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
    else if (res.userChoice === "add Department") {
      addDepartment();
    }
    else if (res.userChoice === "add Roles") {
      addRoles();
    }
    else if (res.userChoice === "update Employee") {
      updateRole();
    }
    else if (res.userChoice === "remove Employee") {
      removeEmp();
    }
   
    else if (res.userChoice === "Quit") {
        console.log("====Goodbye====");
    }
    else {
        connection.end();
    }
});
}
   // view all employee
  function viewAllEmp() {
    connection.query("SELECT first_name, last_name, title, yearly_salary,name FROM employee LEFT JOIN role ON employee.role_id = role.RoleId LEFT JOIN department ON role.department_id = department.DepId",
    function (err, result) {
        if (err) throw err;
        console.table(result);
        start();
    });
}
  // view by employee department
  function viewEmpDepartment(){
    connection.query("SELECT name, first_name, last_name from department LEFT JOIN role ON role.department_id = department.DepId LEFT JOIN employee ON employee.role_id = role.RoleId",
    function (err, result) {if (err) throw err;
      console.table(result);
      start();
  });
  }
  // view by employee role
  function viewEmpRole(){
    connection.query("SELECT first_name, last_name, title, yearly_salary FROM employee LEFT JOIN role ON employee.role_id = role.RoleId",
    function (err, result) {if (err) throw err;
      console.table(result);
      start();
  });
  }
  // add function add employee
    function addEmployee(){
  inquirer.prompt([
    {
      type: 'input',
      message: 'what is the first name of the new employee?',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'what is the last name of the new employee?',
      name: 'last_name'
    },
    {
      type: 'number',
      message: 'what is the role ID of the new employee?',
      name: 'role_id'
    },
    {
      type: 'number',
      message: 'what is the manager ID of the new employee?',
      name: 'manager_id'
    }
  ]).then(answer => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
      connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        start();
      })
    })
}
// function add department
  function addDepartment() {
      inquirer.prompt([
      {
          type: "input",
          name: "depName",
          message: "Provide the name of the department",
      }
  ]).then(res =>{
    const departmentAdded = res.depName ;
    const insertRow = connection.query(
      'INSERT INTO department(name) VALUES(?)',
      [departmentAdded]
  )
  console.log(`${departmentAdded} has been added`);
  start();
})}
// function add role
function addRoles() {
  inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What role title are you adding?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this position?",
        },
        {
          name: "departmentId",
          type: "input",
          message: "What departmentID are we adding?",
        }
      ]).then(answer =>{
        connection.query("INSERT INTO role SET ?",
          {
            title: answer.title,
            yearly_salary: answer.salary,
            department_id: answer.departmentId
          },
          function(err) {
            if (err) throw err;
            console.log("Role Added!");
            start();
          }
        );
      });
  }
// function remove employee
  function removeEmp(){
    inquirer.prompt([
      {
        type: 'input',
        message: 'what is the first name of the new employee?',
        name: 'first_name'
      },
      {
        type: 'input',
        message: 'what is the last name of the new employee?',
        name: 'last_name'
      },
      {
        type: 'number',
        message: 'what is the role ID of the new employee?',
        name: 'role_id'
      },
      {
        type: 'number',
        message: 'what is the manager ID of the new employee?',
        name: 'manager_id'
      }
    ]).then(answer => {
        const query = `DELETE FROM employee WHERE(first_name, last_name, role_id, manager_id) =("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
        connection.query(query, function (err, res) {
          if (err) throw err
          console.table(res)
          start();
        })
      })
  }
  function updateRole(){
// update the employee role
connection.query('SELECT *  FROM employee', function (err, res) {
  if (err) throw err
  console.table(res)
  inquirer.prompt([
    {
      type: 'Number',
      message: 'What is the ID of the employee you would you like to update?',
      name: 'id'
    },
    {
      type: 'number',
      message: 'What new role ID would you like to assign the employee?',
      name: 'role_id'
    }
  ]).then(answer => {
    const query = `UPDATE employee SET role_id = "${answer.role_id}" WHERE id = ${answer.id}`
    connection.query(query, function (err, res) {
      if (err) throw err
      console.log('Employee role updated!')
      start();
    })
  })
})
}