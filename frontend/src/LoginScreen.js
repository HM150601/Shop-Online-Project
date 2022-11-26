import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { login } from "../redux/actions/userActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { signInWithGoogle } from "../firebase"

const LoginScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") dispatch(login(email, password));
  };

  const handelLoginWithGoogle = async () => {
    try{
      await signInWithGoogle();
      setEmail(localStorage.getItem("googleEmail"));
    } catch{

    }
  }

  return (
    <>
      <Meta title="Clothshop | Login" />
      <FormContainer>
        <h2>Sign In</h2>
        <Form onSubmit={handleSubmit}>
          {error && <Message variant="danger">{error}</Message>}
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
          onClick={handelLoginWithGoogle}
          className="d-flex gap-2 justify-content-center align-items-center mt-3 w-100 btn-danger"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          Login With Google
        </Button>
          <Button className="mt-3" type="submit" variant="primary">
            {loading ? <Loading /> : `Sign In`}
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
