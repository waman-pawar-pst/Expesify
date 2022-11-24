const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();





app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'shiv',
  database: 'mydatabase'
})

//  databases connectivity
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
})

app.post('/register', (req, res) => {
  let uname = req.body.uname;
  let email = req.body.email;
  let password = req.body.password;
  var sql = `INSERT INTO expensifyuser (name,email,password) VALUES ("${uname}","${email}","${password}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json(result)
  });
});

app.post('/login', (req, res) => {
  let logemail = req.body.lemaill;
  let logpassword = req.body.lpassword;
  var sql1 = `select * from expensifyuser where email="${logemail}" and password="${logpassword}"`;
  con.query(sql1, (err, result) => {
    if (!err) {
      console.log(result);
      res.json(result);
    }

  })
})

app.post('/layout', (req, res) => {
  let incomeamount = req.body.incomeamount;
  let expenseamount = req.body.expenseamount;
  let incomereason = req.body.incomereason;
  let expensereason = req.body.expensereason;
  let incomereasondes = req.body.incomereasondes;
  let expensereasondes = req.body.expensereasondes;
  let datteentry = req.body.dateentry;
  let name = req.body.name;

  var sqlq = `INSERT INTO layout (incomeamount,expenseamount,name,incomereason,expensereason,incomereasondes,expensereasondes,date) VALUES ('${incomeamount}','${expenseamount}','${name}','${incomereason}','${expensereason}','${incomereasondes}','${expensereasondes}','${datteentry}')`
  con.query(sqlq, function (err, result) {
    if (err) throw err;
    res.json(result);
    console.log("1 record inserted");
  });
});

app.post('/layoutincome', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT incomeamount,incomereason,incomereasondes from layout where incomeamount != 0 AND name="${name}" `
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);

  })
})

app.post('/layoutexpense', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT expenseamount,expensereason,expensereasondes from layout where expenseamount != 0 AND name="${name}"`
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);

  })
})

app.post('/incometotal', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount) as incometotal from layout where name="${name}"`
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.incometotal;
      res.json(a);
    })
  })
})

app.post('/expensetotal', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount) as expensetotal from layout where name="${name}"`
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.expensetotal;
      res.json(a);

    })

  })
})

app.post('/passbook', (req, res) => {
  let name = req.body.name;
  var sql = `select * from layout where name="${name}"`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

app.post('/passbook1', (req, res) => {
  let name = req.body.name;
  var sql = `select * from layout  where name="${name}"  LIMIT 5`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

app.post('/passbook2', (req, res) => {
  let name = req.body.name;
  var sql = ` select * from layout where name="${name}" LIMIT 10`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

app.post('/passbook3', (req, res) => {
  let name = req.body.name;
  var sql = `select * from layout where name="${name}" LIMIT 15`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})


// for expense graph

app.post('/Grocery', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount)*100 as grocerytotal from layout where name="${name}" AND expensereasondes='Grocery' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.grocerytotal;
      res.json(a);

    })

  })
})

app.post('/lightbill', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount)*100 as lightbill from layout where name="${name}" AND expensereasondes='Light Bill' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.lightbill;
      res.json(a);

    })

  })
})

app.post('/petrol', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount)*100 as petrol from layout where name="${name}" AND expensereasondes='Petrol' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.petrol;
      res.json(a);

    })

  })
})

app.post('/Rent', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount)*100 as rent from layout where name="${name}" AND expensereasondes='Rent' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.rent;

      res.json(a);

    })

  })
})

app.post('/cook', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount)*100 as cook from layout where name="${name}" AND expensereasondes='Cook' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.cook;

      res.json(a);

    })

  })
})

app.post('/OtherExp', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount)*100 as other from layout where name="${name}" AND expensereasondes='Other' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.other;

      res.json(a);

    })

  })
})

// for total graph

app.post('/expensetotal', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(expenseamount) as expensetotal from layout where name="${name}"`
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.expensetotal;

      res.json(a);

    })

  })
})

app.post('/incometotal', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount) as incometotal from layout where name="${name}"`
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.incometotal;


      res.json(a);

    })

  })
})

// for income graph

app.post('/Salary', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount)*100 as salary from layout where name="${name}" AND incomereasondes='Salary' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.salary;
      res.json(a);
    })
  })
})

app.post('/bonus', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount)*100 as bonus from layout where name="${name}" AND incomereasondes='Bonus' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.bonus;

      res.json(a);
    })
  })
})

app.post('/stock', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount)*100 as stock from layout where name="${name}" AND incomereasondes='Stock' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.stock;

      res.json(a);
    })
  })
})

app.post('/property', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount)*100 as property from layout where name="${name}" AND incomereasondes='Property' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.property;

      res.json(a);
    })
  })
})

app.post('/fd', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount)*100 as fd from layout where name="${name}" AND incomereasondes='FD' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.fd;

      res.json(a);
    })
  })
})

app.post('/OtherInc', (req, res) => {
  let name = req.body.name;
  var sql = `SELECT SUM(incomeamount)*100 as other from layout where name="${name}" AND incomereasondes='Other' `
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.map(e => {
      let a = e.other;

      res.json(a);
    })
  })
})


app.listen(3001, () => {
  console.log("running server");
});