import React, { useState } from "react";
import ToDo from "../todo/todo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginButtonClick = async () => {
    const response = await fetch(`http://localhost:4000/login?username=${username}`);
    const jsonResponse = await response.json();
    
    if ('id' in jsonResponse) {
      setIsLoggedIn(true);
      setuserId(jsonResponse.id);
    } else {
      alert(jsonResponse.message);
    }
  }; 

  if (isLoggedIn) {
    return <ToDo username={username} userId={userId}/>;
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