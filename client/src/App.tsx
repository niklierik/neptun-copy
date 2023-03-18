import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import env from "../env.json";
import { getUrl } from "./config";


type LoginResult = { accessToken: string };

function onLogin(
  event: React.FormEvent<HTMLFormElement>,
  setToken: (str: string) => void,
  email: string,
  password: string
): void {
  event.preventDefault();
  axios
    .post<LoginResult>(getUrl("/users/login"), { email, password })
    .then((res) => setToken(res.data.accessToken));
}

function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Login token: {token}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Form onSubmit={(event) => onLogin(event, setToken, email, password)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default App;
