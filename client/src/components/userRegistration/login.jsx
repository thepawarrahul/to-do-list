import React, { useState } from "react";
import ToDo from "../todo/todo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginButtonClick = () => {
    if (username === 'abc') {
      setIsLoggedIn(true);
    }
  }; 

  if (isLoggedIn) {
    return <ToDo />;
  }

  return (
    <>
      <div>
        <div>
          <input 
            type='text' 
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
            >
          </input>
        </div>
        <div>
          <button 
            onClick={handleLoginButtonClick}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;