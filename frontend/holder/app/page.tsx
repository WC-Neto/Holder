"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("Carregando...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg("Erro: O CORS provavelmente não está configurado!"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Holder + FastAPI</h1>
      <p className="mt-4 text-xl">{msg}</p>
    </main>
  );
}
