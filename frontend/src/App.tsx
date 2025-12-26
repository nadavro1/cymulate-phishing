import React, { useState, useEffect } from "react";
import { getAttempts, sendPhishing, login, register } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const [targetEmail, setTargetEmail] = useState("");
  const [attempts, setAttempts] = useState<any[]>([]);
  const [isRegister, setIsRegister] = useState(false);

  async function handleLogin() {
    const res = await login(email, password);
    setToken(res.access_token);
  }

  async function fetchAttempts() {
    if (!token) return;
    const data = await getAttempts(token);
    setAttempts(data);
  }

  async function handleSend() {
    if (!token) return;
    await sendPhishing(token, targetEmail);
    fetchAttempts();
  }

  useEffect(() => {
    fetchAttempts();
  }, [token]);

  if (!token) {
    return (
      <div>
        <h2>{isRegister ? "Admin Register" : "Admin Login"}</h2>

        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <br />

        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        {isRegister ? (
          <button
            onClick={async () => {
              await register(email, password);
              alert("User registered, you can now login");
              setIsRegister(false);
            }}
          >
            Register
          </button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}

        <br />
        <br />

        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Back to Login" : "Create Admin User"}
        </button>
      </div>
    );
  }
  return (
    <div>
      <h2>Phishing Simulation</h2>

      <input
        placeholder="target email"
        onChange={(e) => setTargetEmail(e.target.value)}
      />
      <button onClick={handleSend}>Send Phishing</button>

      <h3>Attempts</h3>
      <ul>
        {attempts.map((a) => (
          <li key={a.trackingId}>
            {a.email} - {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
