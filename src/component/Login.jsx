import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Wave } from "react-animated-text";
import F from "./F";
import B from "./B";
function Login() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div className="">
        <h1 className="mt-5 text-center">
          {" "}
          <Wave text=" Welcome to the Expensify" />
        </h1>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <F fun={handleClick}></F>

          <B fun={handleClick}></B>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default Login;
