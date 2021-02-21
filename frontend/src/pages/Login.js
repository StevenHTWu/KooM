import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
// import { Link, useHistory } from "react-router-dom";
import { Link, useHistory } from "react-router-dom" 
import classroom from '../assets/631.jpg';
import logo from '../assets/logo.jpg';
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in"); 
    }
    setLoading(false);
  }
  return (
    <>
        {/* < img src={logo} alt="logo" style={{ 
                width:'200px',
                height: '150px',
                position: "absolute",
                left: 0,
                top: 20
        }}></img> */}
      <div style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // height: "200px",
                // width: "1000px",
                // position: "absolute",
                // left: 400,
                // top: 400
        }}>
        {/* < img src={monitor} alt="monitor" style={{ 
                width:'500px',
                height: '380px',
                position: "relative",
                right: 80
        }}></img> */}
        <div id="logo-container"><img id="logo-img" src={logo}/></div>
        <div style={{ 
                // height: "300px",
                width: "390px",
        }}>
            <Card.Body id="card-body">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Log In</h2>
                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                Log In
                </Button>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Form>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            </Card.Body>
        </div>
      </div>
    </>
  );
}