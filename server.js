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
          "add Department",
          "add Roles",
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
  function viewEmpDepartment(){
    connection.query("SELECT name, first_name, last_name from department LEFT JOIN role ON role.department_id = department.DepId LEFT JOIN employee ON employee.role_id = role.RoleId",
    function (err, result) {
        
      if (err) throw err;

      console.table(result);
      start();
  });
  }
  function viewEmpRole(){
    connection.query("SELECT first_name, last_name, title, yearly_salary FROM employee LEFT JOIN role ON employee.role_id = role.RoleId",
    function (err, result) {
        
      if (err) throw err;

      console.table(result);
      start();
  });
  }
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
  ])

    .then(answer => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
      connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        start();
      })
    })
}
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

function addRoles() {
  let depArray = connection.query(`SELECT DepId, name FROM department `);
  depArray = JSON.stringify(depArray);
  depArray = JSON.parse(depArray);

  let depChoices = [];
  for (var i = 0; i < depArray.length; i++) {
      depChoices.push(depArray[i].name);
  }

  console.log(depChoices);

  inquirer.prompt([
  {
      type: "input",
      name: "roleName",
      message: "Provide the name of the role",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary for this role?",
},
{
    type: "list",
    name: "deptId",
    message: "What is the name of the department?",
    choices: depChoices
}
]).then(res =>{

const roleAdded = [res.depName,res.salary,res.deptId ];
for (var i = 0; i < depArray.length; i++) {
  if (roleAdded.deptId == depArray[i].name) {
      const insertRow = connection.query('INSERT INTO role(title, yearly_salary, department_id ) VALUES(?,?,?)',
          [roleAdded.roleName, roleAdded.salary, depArray[i].DepId]);
      break;
  }
}

start();
})}