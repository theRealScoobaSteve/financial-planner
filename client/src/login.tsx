import React, { useState } from "react";
import Link from "next/link";
import ApiRequest from "../utilities/api-request";
import { useRouter } from "next/router";
import { Form, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUserData } from "../redux/actions/user.action";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleClose = () => setShow(false);

  const login = (e) => {
    e.preventDefault();

    ApiRequest.post("http://localhost:3001/auth/login", {
      username,
      password,
    })
      .then(function (response) {
        if (response.email) {
          if (response.is_admin) {
            router.push("/admin");
          } else {
            router.push("/refund");
          }
          updateUserData(response);
        } else {
          setModalText(response.message);
          setShow(true);
        }
      })
      .catch(function (error) {
        console.error("ERROR: ", error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="login-header page-top login-spacing">
            MRKTPulse Client Portal
          </h2>
        </div>
        <div className="row justify-content-center">
          <h3 className="login-header login-spacing ">Login</h3>
        </div>
        <div className="row justify-content-center">
          <div className="panel">
            <Form onSubmit={login}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <Link href="/forgot">
                <a className="float-left" style={{ marginTop: 7 }}>
                  Forgot your password?
                </a>
              </Link>
              <Button className="float-right" variant="primary" type="submit">
                Submit
              </Button>
              <Form.Group>
                <Link href="/signup">
                  <a
                    className="float-left"
                    style={{ marginTop: 20, marginLeft: 35 }}
                  >
                    Don't have an account?
                  </a>
                </Link>
              </Form.Group>
            </Form>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Failed to Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>{modalText}</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default connect(null, { updateUserData })(Login);
