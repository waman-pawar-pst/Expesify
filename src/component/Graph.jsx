import React, { useState, useEffect } from "react";
import CanvasJSReact from "./canvasjs.react";
import "./Layout";
import "../index.css";
import Axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Graph() {
  const [Grocry, setGrocery] = useState(0);
  const [LghtBill, setLghtBill] = useState(0);
  const [Petrol, setPetrol] = useState(0);
  const [Rent, setRent] = useState(0);
  const [Cook, setCook] = useState(0);
  const [OtherExp, setOtherExp] = useState(0);
  const [Salary, setSalary] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [property, setProperty] = useState(0);
  const [fd, setFd] = useState(0);
  const [OtherInc, setOtherInc] = useState(0);
  const [income, setIncome] = useState(0);
  const [expensee, setExpense] = useState(0);

  useEffect(() => {
    // for total

    Axios.post("http://localhost:3001/expensetotal", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let total = res.data;
      setExpense(total);
    });

    Axios.post("http://localhost:3001/incometotal", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let total = res.data;
      setIncome(total);
    });

    // for expense

    Axios.post("http://localhost:3001/Grocery", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let grocery = res.data;
      setGrocery(grocery);
    });

    Axios.post("http://localhost:3001/lightbill", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let lightbill = res.data;
      setLghtBill(lightbill);
    });

    Axios.post("http://localhost:3001/petrol", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let petrol = res.data;
      setPetrol(petrol);
    });

    Axios.post("http://localhost:3001/Rent", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let rent = res.data;
      setRent(rent);
    });

    Axios.post("http://localhost:3001/cook", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let cook = res.data;
      setCook(cook);
    });
    Axios.post("http://localhost:3001/OtherExp", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let other = res.data;
      setOtherExp(other);
    });

    // for income

    Axios.post("http://localhost:3001/Salary", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let Salary = res.data;
      setSalary(Salary);
    });

    Axios.post("http://localhost:3001/bonus", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let bonus = res.data;
      setBonus(bonus);
    });

    Axios.post("http://localhost:3001/stock", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let stocks = res.data;
      setStocks(stocks);
    });

    Axios.post("http://localhost:3001/property", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let property = res.data;
      setProperty(property);
    });

    Axios.post("http://localhost:3001/fd", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let fd = res.data;
      setFd(fd);
    });

    Axios.post("http://localhost:3001/OtherInc", {
      name: JSON.parse(sessionStorage.getItem("username")),
    }).then((res) => {
      let other = res.data;
      setOtherInc(other);
    });
  }, []);

  console.log(Grocry);

  const expense = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "",
    backgroundColor: (0, 0, 0, 0),
    title: {
      text: "Expenses",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: (Grocry / expensee).toFixed(2), label: "Grocery" },
          { y: (LghtBill / expensee).toFixed(2), label: "LightBill" },
          { y: (Petrol / expensee).toFixed(2), label: "Petrol" },
          { y: (Rent / expensee).toFixed(2), label: "Rent" },
          { y: (Cook / expensee).toFixed(2), label: "Cook" },
          { y: (OtherExp / expensee).toFixed(2), label: "Other" },
        ],
      },
    ],
  };

  const incomes = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "",
    backgroundColor: (0, 0, 0, 0),
    title: {
      text: "Incomes",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: (Salary / income).toFixed(2), label: "Salary" },
          { y: (bonus / income).toFixed(2), label: "Bonus" },
          { y: (stocks / income).toFixed(2), label: "Stocks" },
          { y: (property / income).toFixed(2), label: "Property" },
          { y: (fd / income).toFixed(2), label: "FD" },
          { y: (OtherInc / income).toFixed(2), label: "Other" },
        ],
      },
    ],
  };

  const both = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "",
    backgroundColor: (0, 0, 0, 0),
    title: {
      text: "Total",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          {
            y: ((income * 100) / (income + expensee)).toFixed(2),
            label: "Income",
          },
          {
            y: ((expensee * 100) / (income + expensee)).toFixed(2),
            label: "Expense",
          },
        ],
      },
    ],
  };

  return (
    <div className="row mt-5">
      <h4 className="text-center text-decoration-underline">
        {" "}
        Graphical Representation
      </h4>

      <div className="col-4 mt-5">
        <div className="App">
          <CanvasJSChart options={expense} />
        </div>
      </div>

      <div className="col-4 mt-5">
        <div className="App">
          <CanvasJSChart options={incomes} />
        </div>
      </div>

      <div className="col-4 mt-5">
        <div className="App">
          <CanvasJSChart options={both} />
        </div>
      </div>
      <a href="/layout" className="text-center">
        <button className="btn btn-success mt-5 btn-inline">Home</button>
      </a>
    </div>
  );
}

export default Graph;
