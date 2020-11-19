import React, { useState } from "react";
import Link from "next/link";
import ApiRequest from "../utilities/api-request";
import { useRouter } from "next/router";
import { Form, Button, Popover, OverlayTrigger, Modal } from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState([]);

  const handleClose = () => setShow(false);

  const register = (e) => {
    e.preventDefault();

    password.trim();
    confirmPassword.trim();
    email.trim();
    firstName.trim();
    lastName.trim();

    const formErrors = validateForm();
    const passwordErrors = validatePassword();
    const errors = [...formErrors, ...passwordErrors];
    setModalText((modalText) => [...modalText, ...errors]);

    if (errors.length < 1) {
      ApiRequest.post("http://localhost:3001/auth/register", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
        .then(function (response) {
          if (response.successCode) {
            router.push("/login");
          } else {
            setShow(true);
          }
        })
        .catch(function (error) {
          console.error("ERROR: ", error);
        });
    } else {
      setShow(true);
    }
  };

  function validateForm() {
    let errors = [];

    if (email.length < 1) {
      errors.push("Your email can't be empty");
    }

    if (firstName.length < 1) {
      errors.push("Your first name can't be empty");
    }

    if (lastName.length < 1) {
      errors.push("Your last name can't be empty");
    }

    return errors;
  }

  function validatePassword() {
    // validates the password
    let errors = [];
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (password.length < 8) {
      errors.push("Password is to short");
    }

    if (password.length > 16) {
      errors.push("Password is to long");
    }

    if (!regularExpression.test(password)) {
      errors.push("Password is missing a number or special character");
    }

    return errors;
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Password Constraints</Popover.Title>
      <Popover.Content>
        <ul>
          <li>Must contain a special character ($,%,*,^)</li>
          <li>Must contain at least one number</li>
          <li>Must be at least 8-16 characters in length</li>
        </ul>
      </Popover.Content>
    </Popover>
  );

  const generateErrorList = () => {
    return modalText.map((error) => {
      return <li key={error}>{error}</li>;
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
          <h3 className="login-header login-spacing ">Register</h3>
        </div>
        <div className="row justify-content-center">
          <div className="panel">
            <Form onSubmit={register}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <OverlayTrigger
                  trigger={["hover", "click"]}
                  placement="right"
                  overlay={popover}
                >
                  <FaQuestion />
                </OverlayTrigger>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </Form.Group>
              <Link href="/login">
                <a
                  className="float-left"
                  style={{ marginTop: 10, marginRight: 10 }}
                >
                  Already have an account?
                </a>
              </Link>
              <Button className="float-right" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Failed to Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>{generateErrorList()}</ul>
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
