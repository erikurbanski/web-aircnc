import React, { useState } from "react";

import API from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await API.post("/sessions", { email });
    const { _id } = response.data;

    localStorage.setItem("@user:aircnc", _id);
    history.push("/dashboard");
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          id="email"
          name="email"
          placeholder="Seu melhor e-mail"
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
