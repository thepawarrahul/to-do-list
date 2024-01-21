import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ToDo from "../todo/todo";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginButtonClick = async () => {
    const response = await fetch(`http://localhost:4000/login?username=${username}&${password}`);
    const jsonResponse = await response.json();
    
    if ('id' in jsonResponse) {
      setIsLoggedIn(true);
      setuserId(jsonResponse.id);
    } else {
      alert(jsonResponse.message);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  if (isLoggedIn) {
    return <ToDo username={username} userId={userId}/>;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row>
        <Col md={12} className="mx-auto">
          <Form>
            
              <Form.Control
                className="border border-primary"
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={handleUsernameChange}
              />
              <Form.Control
                className="mt-2 border border-primary"
                type="password" 
                placeholder="Password" 
                value={[password]}
                onChange={handlePasswordChange}
              />
            
            <Button 
              variant="primary"
              onClick={handleLoginButtonClick}
              className="w-100 mt-3">
                Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
