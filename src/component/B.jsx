import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { message } from "antd";
import Axios from "axios";
function B(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const senddata = (event) => {
    Axios.post("http://localhost:3001/register", {
      //send data to backend
      uname: name,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res.data);
      message.success("sign in Successfull", 20);
      window.location.replace("/");
    });
    event.preventDefault();
  };

  return (
    <div>
      <div className="cotainer">
        <div className="row">
          <div className="col-4 mt-3 c-border mx-auto">
            <h4 className="text-center">Sign In</h4>
            <form method="get" action="" onSubmit={senddata}>
              <div className="form-group tex">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="ename"
                  className="form-control"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail11">Email address</label>
                <input
                  type="email"
                  name="eemail"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="exampleInputEmail11"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="epassword"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="form-group mt-3 text-center">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="submit"
                />
              </div>
            </form>
            <div className="c-right">
              <BsArrowLeftCircleFill onClick={props.fun} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default B;
