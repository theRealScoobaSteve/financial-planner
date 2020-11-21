import React from "react";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Forgot() {
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
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Link href="/login">
                <a className="float-left" style={{ marginTop: 7 }}>
                  Sign In
                </a>
              </Link>
              <Button className="float-right" variant="primary" type="submit">
                Submit
              </Button>
              <Form.Group>
                <Link href="/forgot">
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
      </div>
    </div>
  );
}
