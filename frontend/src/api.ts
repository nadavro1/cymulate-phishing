const API_URL = "http://localhost:3000";

export async function login(email: string, password: string) {
  console.log(email);
  console.log(password);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function getAttempts(token: string) {
  const res = await fetch(`${API_URL}/attempts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function sendPhishing(token: string, email: string) {
  const res = await fetch(`${API_URL}/attempts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      subject: "Security Alert",
      content: "Please verify your account",
    }),
  });

  return res.json();
}

export async function register(email: string, password: string) {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
