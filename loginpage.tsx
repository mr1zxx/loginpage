"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillLock } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); 

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
  
    try {
      const response = await fetch("./login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        
        router.push("");
      } else {
        setErrorMessage(data.message || "Erro no login");
      }
    } catch (error) {
      setErrorMessage("Erro ao se conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        style={{
          padding: "5rem",
          border: "0px solid #fff",
          borderRadius: "0px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
          borderBottomLeftRadius : "20px",
          borderTopLeftRadius : "20px",
          height: "495px",
          backgroundColor: "#000",
          color: "#111111", 
        }}
      >
        <img
    src="/NOVAI.png" 
    alt="Novai Logo"
    style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
  />
  <button
  type="button"
  onClick={() => router.push("/cadastro")} 
  style={{
    width: "100%", 
    padding: ".75rem",
    backgroundColor: "#000",
    color: "#ffffff",
    border: "solid 1px #ffff",
    borderRadius: "15px",
    cursor: "pointer",
    marginTop: "164px",
    display: "block", 
  }}
>
  Criar Conta
</button>
      </form>
      <form
        onSubmit={onSubmit}
        style={{
          padding: "5rem",
          height: "495px",
          border: "1px solid #000",
          borderBottomRightRadius : "20px",
          borderTopRightRadius : "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          width: "450px",
          backgroundColor: "#ffff",
          color: "#111111", 
        }}
      >
        <h2 style={{ textAlign: "center", color: "#111111" }}>Login</h2>
        {errorMessage && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {errorMessage}
          </p>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: ".5rem",
              color: "#111111", 
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: ".5rem",
              borderRadius: "20px",
              border: "1px solid #ccc",
              color: "#000", 
              backgroundColor: "#e", 
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: ".5rem",
              color: "#111111", 
            }}
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: ".5rem",
              borderRadius: "20px",
              border: "1px solid #ccc",
              color: "#111111",
              backgroundColor: "#efefe", 
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading} 
          style={{
            marginTop: "5px",
            width: "100%",
            padding: ".75rem",
            backgroundColor: loading ? "#999999" : "#000",
            color: "#fff",
            border: "solid 1px #efefef",
            borderRadius: "20px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
