var mysql = require('mysql');
var inquirer = require('inquirer');

//start connection with my database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Serina',
    database: 'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

//Ask the user what action they want to perform
function runSearch(){
    inquirer
    .prompt({
       name: 'action',
       type: 'rawlist',
       message: 'What action would you like to perform?',
       choices: [
           'Add a department',
           'Add a role',
           'Add an employee'
       ]
       //Adding functions based on the option selected above
    })
    .then(function(answer) {
        switch (answer.action) {
            case 'Add a department':
            addDept();
            break;

            case 'Add a role':
                addRole();
                break;

                case 'Add an employee':
                    addEmp();
                    break;
                
                case 'Search department':
                    searchDept();
                    break;
        }
    });
}

function addDept() {
    inquirer
    .prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the department name.'
    })
.then(function(answer) {
    //add a new row in the department table
    connection.query(
    'INSERT INTO department SET ?',
    {
        name: answer.name
    },
    function(err) {
        if (err) throw err;
        console.log("You have successfully added a new department!");
    runSearch();
    }
    );
});
}

function addRole() {
    var query = 'SELECT name, departmentId FROM department'
    var depts;
    connection.query(query, function(err, res) {
    if (err) throw err;
   console.log("RES!", res.map(depts=>depts.name));
   console.log('The department ids for the corresponding names are as follows:  ' + res.map(depts=>depts.departmentId));
   //depts = res.map(dept=>depts.departmentId);
  //runSearch();
  })
    inquirer
    .prompt([
        {
        name: 'departmentId',
        choices: depts,
        message: 'Please select a department ID for this role.'
    },
    {
        name: 'title',
        type: 'input',
        message: 'What is title or role you would like to enter?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Please enter an annual salary using digit only.'
    }
    ])

.then(function(answer) {
  //Insert a new row into the role table  
  
  connection.query(
      'INSERT INTO role SET ?',
      {
          title: answer.title,
          salary: answer.salary,
          departmentId: answer.departmentId
         },
    
      //Search the department table for options

    function(err) {
        if (err) throw err;
        console.log("You have successfully added a new role!");
      //  searchDept();
    // inquirer
    // .prompt({
    //     name: 'name',
    //     choices: 'name',
    //     message: 'Please select a department from the list.'
    // })
    // .then(function(answer) {
    //     console.log("answer", answer);
    //     })
    });
});
}
