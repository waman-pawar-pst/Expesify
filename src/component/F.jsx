import React, { useState } from "react";
import Axios from "axios";
import "antd/dist/antd.min.css";
import { message } from "antd";
function F(props) {
  const [lemail, setLemail] = useState("");
  const [password, setPassword] = useState("");

  const loginuser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      lemaill: lemail,
      lpassword: password,
    }).then((response) => {
      if (response.data.length === 1) {
        message.success("Login Successful!", [20]);
        sessionStorage.setItem(
          "username",
          JSON.stringify(response.data[0].name)
        );
        window.location.replace("/layout");
      } else {
        message.error("Login Failed!", [5]);
      }
    });
  };

  return (
    <div>
      <div className="cotainer">
        <div className="row">
          <div className="col-4 mt-3 c-border mx-auto">
            <h4 className="text-center"> LOG IN</h4>
            <form action="" method="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail12">Email address</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setLemail(e.target.value);
                  }}
                  name="lemail"
                  className="form-control c-bor"
                  id="exampleInputEmail12"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="passwoerd"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  autoComplete="true"
                  required
                />
              </div>
              <div className="mt-3 text-center">
                <button
                  type="submit"
                  onClick={loginuser}
                  className="btn btn-primary text-center"
                >
                  Log In
                </button>
              </div>
              <div className="form-group form-check mt-2 c-align">
                <a
                  href="_self"
                  className="link"
                  onClick={props.fun}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Create Acoount
                </a>
                <span></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default F;
