import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function BienvenidaUsuario() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || "");
        }
      } catch {}
    }
    fetchUser();
  }, []);

  return (
    <p className="text-zinc-400 mb-8">
      {username ? `Bienvenido de nuevo, ${username}` : "Bienvenido al panel de Heatrow Club"}
    </p>
  );
}
