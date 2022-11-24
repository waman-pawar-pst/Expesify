import React from "react";
import Axios from "axios";
import "../index.css";
import { GiReceiveMoney } from "react-icons/gi";
import { useState, useEffect } from "react";

function Layout() {
   
    var [income, setincome] = useState('');
    var [expense, setexpense] = useState('');
    var incomereason = useState();
    var expensereason = useState('');
    const [valueexpense, setvalueexpense] = useState('');
    const [valueincome, setvalueincome] = useState('');
    const [radioname, setradioname] = useState('');
    const [currDate, setcurrDate] = useState('');
    var [reason, setreason] = useState('');
    const [cuurentuser] = useState(sessionStorage.getItem("username"));
    const [userdetailsincome, setuserdetailsincome] = useState([]);
    const [userdetailsexpense, setuserdetailsexpense] = useState([]);
    const [icomereasonselect, seticomereasonselect] = useState('');
    const [expensereasonselect, setexpensereasonselect] = useState('');
    const [incometotal, setincometotal] = useState(0);
    const [expensetotal, setexpensetotal] = useState(0);
    const [passbook, setpassbook] = useState([]);
    const [passbook1, setpassbook1] = useState([]);
    const [passbook2, setpassbook2] = useState([]);
    const [passbook3, setpassbook3] = useState([]);


    useEffect(() => {
        var date = new Date(),
            dis =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds();
        setcurrDate(
            dis
        );
        Axios.post("http://localhost:3001/layoutincome", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setuserdetailsincome(
                arr
            );
        });
        Axios.post("http://localhost:3001/layoutexpense", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setuserdetailsexpense(
                arr
            );
        });
        Axios.post("http://localhost:3001/incometotal", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let incometotal;
            incometotal = res.data;
            setincometotal(
                incometotal
            );
        });

        Axios.post("http://localhost:3001/expensetotal", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let expensetotal;
            expensetotal = res.data;
            setexpensetotal(
                expensetotal
            );
        });

        Axios.post("http://localhost:3001/passbook", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setpassbook(
                arr
            );
        });

    }, [incometotal, expensetotal])

    const handleSubmit = (event) => {

        const data = new FormData(event.target);
        let incomes = data.get("flexRadioDefault");
        if (incomes === "income") {
            let selectvalue = data.get("chec1");
            var date = new Date(),
                dis =
                    date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate() +
                    " " +
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds();
            income = Number(data.get("paisa"));
            incomereason = data.get("reason");
            setincome(income);
            setreason(incomereason);
            setvalueincome(selectvalue);
            setcurrDate(dis);
        }
        if (incomes === "expese") {
            let selectvalue = data.get("chec2");
            var dates = new Date(),
                diss =
                    dates.getFullYear() +
                    "-" +
                    (dates.getMonth() + 1) +
                    "-" +
                    dates.getDate() +
                    " " +
                    dates.getHours() +
                    ":" +
                    dates.getMinutes() +
                    ":" +
                    dates.getSeconds();

            expense = Number(data.get("paisa"));
            expensereason = data.get("reason");
            setexpense(expense)
            setreason(expensereason)
            setvalueexpense(selectvalue)
            setcurrDate(diss)
        }

        Axios.post("http://localhost:3001/layout", {
            name: JSON.parse(sessionStorage.getItem("username")),
            incomeamount: income,
            expenseamount: expense,
            incomereason: incomereason,
            expensereason: expensereason,
            incomereasondes: icomereasonselect,
            expensereasondes: expensereasonselect,
            dateentry: currDate,
        }).then((res) => {
            console.log(res.data);
        });
        Axios.post("http://localhost:3001/layoutincome", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setuserdetailsincome(
                arr
            );
        });

        Axios.post("http://localhost:3001/passbook", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setpassbook(
                arr
            );
        });

        Axios.post("http://localhost:3001/layoutexpense", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setuserdetailsexpense(
                arr
            );
        });

        Axios.post("http://localhost:3001/incometotal", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let incometotal;
            incometotal = res.data.incometotal;
            setincometotal(
                incometotal
            );
        });

        Axios.post("http://localhost:3001/passbook", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setpassbook(
                arr
            );
        });

        Axios.post("http://localhost:3001/expensetotal", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let expensetotal;
            expensetotal = res.data.expensetotal;
            setexpensetotal(
                expensetotal
            );
        });


        event.preventDefault();
    }

    const limitTransact = (event) => {
        event.preventDefault();

        Axios.post("http://localhost:3001/passbook1", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setpassbook1(
                arr
            );
        });

        Axios.post("http://localhost:3001/passbook2", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setpassbook2(
                arr
            );
        });

        Axios.post("http://localhost:3001/passbook3", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let arr = [];
            arr.push(res.data);
            setpassbook3(
                arr
            );
        });
    }

    const getvalue = (event) => {
        Axios.post("http://localhost:3001/incometotal", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let incometotal;
            incometotal = res.data;
            setincometotal(
                incometotal
            );
        });
        Axios.post("http://localhost:3001/expensetotal", {
            name: JSON.parse(sessionStorage.getItem("username")),
        }).then((res) => {
            let expensetotal;
            expensetotal = res.data;
            setexpensetotal(
                expensetotal
            );
        });

        let income = event.target.value;
        if (income === "income")
            setradioname(
                "income"
            );
        if (income === "expese")
            setradioname(
                "expese"
            );

        let valueselecvtc = event.target.value;
        let valueselectfieldname = event.target.name;
        if (valueselectfieldname === "check1") {
            setvalueincome(
                valueselecvtc
            );
        }

        let valueselecvtc1 = event.target.value;
        let valueselectfieldname1 = event.target.name;
        if (valueselectfieldname1 === "check2") {
            setvalueexpense(
                valueselecvtc1
            );
        }


        let icomereason = event.target.value;
        let icomereasonfieldname = event.target.name;
        if (icomereasonfieldname === "chec1") {
            seticomereasonselect(
                icomereason
            );
        }
        let expensereason = event.target.value;
        let expensereasonfieldname = event.target.name;
        if (expensereasonfieldname === "chec2") {
            setexpensereasonselect(
                expensereason
            );
        }
    };

    const deltesesion = () => {
        sessionStorage.clear();
    };


    return (
        <div className="container-fluid" id="bg">
            <nav
                className="navbar sticky-top navbar-dark bg-dark mt-1 mb-3"
                id="navs"
            >
                <div className="container-fluid">
                    <h3 className="navbar-text" style={{ color: "black" }}>
                        Expensify <GiReceiveMoney />
                    </h3>
                    <h3
                        className="navbar-text text-right"
                        style={{ color: "black", textTransform: "capitalize" }}
                    >
                        Welcome,{JSON.parse(cuurentuser)}
                    </h3>
                    <h3 className="navbar-text text-right" style={{ color: "black" }}>
                        <a href="/" onClick={deltesesion} rel="noopener noreferrer">
                            <button className="btn btn-success">Log-out</button>
                        </a>
                    </h3>
                </div>
            </nav>

            <div className="row">
                <div className="col-4">
                    <div className="card-body mt-1" id="wally">
                        <form method="" action="" onSubmit={handleSubmit}>
                            <div className="">
                                <h4
                                    className="text-black text-center"
                                    style={{ fontSize: "25px", fontWeight: "bold" }}
                                >
                                    {" "}
                                    Balance
                                </h4>
                                <hr class="my-2 dividerClass" />
                                <h4
                                    className="text-success text-center"
                                    style={{ fontSize: "25px", fontWeight: "bold" }}
                                >
                                    ₹
                                    {incometotal > expensetotal
                                        ? incometotal - expensetotal
                                        : 0}
                                </h4>
                                <label
                                    for="exampleInputEmail1"
                                    className="form-label"
                                ></label>
                                <input
                                    type="number"
                                    name="paisa"
                                    className="form-control border-black border-2"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Amount"
                                    required
                                />
                                <div
                                    id="emailHelp"
                                    className="form-text d-flex text-black"
                                    style={{ fontSize: "18px" }}
                                >
                                    Enter the amount.
                                </div>
                                <div class="form-check d-inline-flex m-1 pt-2=">
                                    <input
                                        value="expese"
                                        onChange={(e) => { setradioname(e.target.value) }}
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                        required
                                    />
                                    <label
                                        className="form-check-label ms-1 text-black"
                                        for="flexRadioDefault1"
                                        style={{ fontSize: "18px" }}
                                    >
                                        Expense
                                    </label>
                                </div>
                                <div className="form-check d-inline-flex m-1 pt-2">
                                    <input
                                        className="form-check-input"
                                        onChange={(e) => { setradioname(e.target.value) }}
                                        value="income"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        required
                                    />
                                    <label
                                        className="form-check-label ms-1 text-black"
                                        for="flexRadioDefault2"
                                        style={{ fontSize: "18px" }}
                                    >
                                        Income
                                    </label>
                                </div>
                                <br />
                                {radioname === "income" ? (
                                    <select
                                        class="form-select mt-1"
                                        required
                                        onChange={getvalue}
                                        name="chec1"
                                        aria-label="Default select example"
                                    >
                                        <option

                                            onChange={getvalue}
                                            value=""
                                        >
                                            Reason
                                        </option>
                                        <option
                                            onChange={getvalue}
                                            value="Salary"
                                        >
                                            Salary
                                        </option>
                                        <option
                                            onChange={getvalue}
                                            value="Bonus"
                                        >
                                            Bonus
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Stock"
                                        >
                                            Stock
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Property"
                                        >
                                            Property
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="FD"
                                        >
                                            FD
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Other"
                                        >
                                            Other
                                        </option>
                                    </select>
                                ) : (
                                    ""
                                )}
                                {radioname === "expese" ? (
                                    <select
                                        class="form-select mt-1"
                                        required
                                        onChange={getvalue}
                                        name="chec2"
                                        aria-label="Default select example"
                                    >
                                        <option

                                            onChange={getvalue}
                                            value=""
                                        >
                                            Reason
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Grocery"
                                        >
                                            Grocery
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Light Bill"
                                        >
                                            Light Bill
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Petrol"
                                        >
                                            Petrol
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Rent"
                                        >
                                            Rent
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Cook"
                                        >
                                            Cook
                                        </option>
                                        <option

                                            onChange={getvalue}
                                            value="Other"
                                        >
                                            Other
                                        </option>
                                    </select>
                                ) : (
                                    ""
                                )}
                                <label
                                    for="exampleInputPassword1"
                                    className="form-label"
                                ></label>
                                <input
                                    type="text"
                                    name="reason"
                                    required
                                    className="form-control border-black border-2 "
                                    id="exampleInputPassword1"
                                    placeholder="Enter the description"
                                />
                                <div
                                    id="emailHelp"
                                    className="form-text d-flex text-black"
                                    style={{ fontSize: "18px" }}
                                >
                                    Enter the reason for Expense and Income.
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <button type="submit" className="btn btn-primary">
                                    Add Transaction
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center mt-5 ">
                        <a href="/graph" rel="noopener noreferrer">
                            <button
                                className="btn text-right btn-success"
                                style={{ fontSize: "20px" }}
                            >
                                {" "}
                                View Graph
                            </button>
                        </a>
                    </div>
                </div>

                <div className="col-4">
                    <div className="bg-white text-center mt-1 " id="news">
                        <h4 className="text-success">Income</h4>
                        <table className="table my-custom-scrollbar table-wrapper-scroll-y  custom mt-2">
                            <thead>
                                <tr className="heading tb border">
                                    <th className=" text-center" style={{ fontSize: "20px" }}>
                                        Amount
                                    </th>
                                    <th
                                        className=" text-center th1"
                                        style={{ fontSize: "20px" }}
                                    >
                                        Description
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="tb">
                                {userdetailsincome.map((Element) => {
                                    return Element.map((e) => {
                                        return (
                                            <tr>
                                                <td
                                                    className=" text-center"
                                                    style={{ fontSize: "20px" }}
                                                >
                                                    Rs.{e.incomeamount}
                                                </td>
                                                <td
                                                    className=" text-center"
                                                    style={{ fontSize: "20px" }}
                                                >
                                                    {e.incomereasondes},{e.incomereason}
                                                </td>
                                            </tr>
                                        );
                                    });
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white text-center mt-2 " id="news">
                        <h4 className="text-danger">Expense</h4>

                        <table className="table my-custom-scrollbar table-wrapper-scroll-y  custom mt-2">
                            <thead>
                                <tr className="heading tb">
                                    <th className=" text-center" style={{ fontSize: "20px" }}>
                                        Amount
                                    </th>
                                    <th
                                        className=" text-center th1"
                                        style={{ fontSize: "20px" }}
                                    >
                                        Description
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="tb">
                                {userdetailsexpense.map((Element) => {
                                    return Element.map((e) => {
                                        return (
                                            <tr>
                                                <td
                                                    className=" text-center"
                                                    style={{ fontSize: "20px" }}
                                                >
                                                    Rs.{e.expenseamount}
                                                </td>
                                                <td
                                                    className=" text-center"
                                                    style={{ fontSize: "20px" }}
                                                >
                                                    {e.expensereasondes},{e.expensereason}
                                                </td>
                                            </tr>
                                        );
                                    });
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-4">
                    <div className="bg-white text-center mt-2" id="news">
                        <h4>Pass Book</h4>

                        <table className="table my-custom-scrollbar table-wrapper-scroll-y  custom mt-2">
                            <thead>
                                <tr className="heading tb">
                                    <th scope="col">#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date & Time</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody className="tb">
                                {passbook.map((Element) => {
                                    let a = 1;
                                    return Element.map((e) => {
                                        return (
                                            <tr>
                                                <th scope="row">{a++}</th>
                                                <td className="text-success">
                                                    {e.incomeamount === "" ? (
                                                        <p className="text-danger">{e.expenseamount}</p>
                                                    ) : (
                                                        e.incomeamount
                                                    )}{" "}
                                                </td>
                                                <td>{e.date}</td>
                                                <td>
                                                    {e.incomereasondes === ""
                                                        ? e.expensereasondes
                                                        : e.incomereasondes}
                                                </td>
                                                <td>
                                                    {e.incomereason === ""
                                                        ? e.expensereason
                                                        : e.incomereason}{" "}
                                                </td>
                                            </tr>
                                        );
                                    });
                                })}
                            </tbody>
                        </table>
                        <div className="text-center">
                            <h3 className="text-center pt-2"> Limited Transactions</h3>
                            <button
                                type="button"
                                class="btn btn-primary"
                                onClick={limitTransact}
                                data-toggle="modal"
                                data-target="#exampleModal"
                            >
                                5 Transaction
                            </button>

                            <div
                                class="modal fade"
                                id="exampleModal"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                                Limited Transactions
                                            </h5>
                                            <button
                                                type="button"
                                                class="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <table
                                                className="table my-custom-scrollbar table-wrapper-scroll-y table-borderless custom mt-2"
                                                id="new"
                                            >
                                                <thead>
                                                    <tr className="heading tb">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Date&Time</th>
                                                        <th scope="col">Reason</th>
                                                        <th scope="col">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tb">
                                                    {passbook1.map((Element) => {
                                                        let a = 1;
                                                        return Element.map((e) => {
                                                            return (
                                                                <tr>
                                                                    <td>{a++}</td>
                                                                    <td className="text-success">
                                                                        {e.incomeamount === "" ? (
                                                                            <p className="text-danger">
                                                                                {" "}
                                                                                {e.expenseamount}{" "}
                                                                            </p>
                                                                        ) : (
                                                                            e.incomeamount
                                                                        )}{" "}
                                                                    </td>
                                                                    <td>{e.date}</td>
                                                                    <td>
                                                                        {e.incomereasondes === ""
                                                                            ? e.expensereasondes
                                                                            : e.incomereasondes}
                                                                    </td>
                                                                    <td>
                                                                        {e.incomereason === ""
                                                                            ? e.expensereason
                                                                            : e.incomereason}{" "}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        });
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                class="btn btn-primary ms-2"
                                onClick={limitTransact}
                                data-toggle="modal"
                                data-target="#modalexs"
                            >
                                10 Transaction
                            </button>

                            <div
                                class="modal fade"
                                id="modalexs"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                                Limited Transactions
                                            </h5>
                                            <button
                                                type="button"
                                                class="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <table
                                                className="table my-custom-scrollbar table-wrapper-scroll-y table-borderless custom mt-2"
                                                id="new"
                                            >
                                                <thead>
                                                    <tr className="heading tb">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Date&Time</th>
                                                        <th scope="col">Reason</th>
                                                        <th scope="col">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tb">
                                                    {passbook2.map((Element) => {
                                                        let a = 1;
                                                        return Element.map((e) => {
                                                            return (
                                                                <tr>
                                                                    <td>{a++}</td>
                                                                    <td className="text-success">
                                                                        {e.incomeamount === "" ? (
                                                                            <p className="text-danger">
                                                                                {" "}
                                                                                {e.expenseamount}{" "}
                                                                            </p>
                                                                        ) : (
                                                                            e.incomeamount
                                                                        )}{" "}
                                                                    </td>
                                                                    <td>{e.date}</td>
                                                                    <td>
                                                                        {e.incomereasondes === ""
                                                                            ? e.expensereasondes
                                                                            : e.incomereasondes}
                                                                    </td>
                                                                    <td>
                                                                        {e.incomereason === ""
                                                                            ? e.expensereason
                                                                            : e.incomereason}{" "}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        });
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                class="btn btn-primary ms-2"
                                onClick={limitTransact}
                                data-toggle="modal"
                                data-target="#limit3"
                            >
                                15 Transaction
                            </button>

                            <div
                                class="modal fade"
                                id="limit3"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                                Limited Transactions
                                            </h5>
                                            <button
                                                type="button"
                                                class="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <table
                                                className="table my-custom-scrollbar table-wrapper-scroll-y table-borderless custom mt-2"
                                                id="new"
                                            >
                                                <thead>
                                                    <tr className="heading tb">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Date&Time</th>
                                                        <th scope="col">Reason</th>
                                                        <th scope="col">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tb">
                                                    {passbook3.map((Element) => {
                                                        let a = 1;
                                                        return Element.map((e) => {
                                                            return (
                                                                <tr>
                                                                    <td>{a++}</td>
                                                                    <td className="text-success">
                                                                        {e.incomeamount === "" ? (
                                                                            <p className="text-danger">
                                                                                {" "}
                                                                                {e.expenseamount}{" "}
                                                                            </p>
                                                                        ) : (
                                                                            e.incomeamount
                                                                        )}{" "}
                                                                    </td>
                                                                    <td>{e.date}</td>
                                                                    <td>
                                                                        {e.incomereasondes === ""
                                                                            ? e.expensereasondes
                                                                            : e.incomereasondes}
                                                                    </td>
                                                                    <td>
                                                                        {e.incomereason === ""
                                                                            ? e.expensereason
                                                                            : e.incomereason}{" "}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        });
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Layout;
