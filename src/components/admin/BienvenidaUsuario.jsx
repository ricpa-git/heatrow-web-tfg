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
    <p className="text-zinc-500 text-sm mb-8">
      {username ? `Sesión iniciada como ${username}` : "Panel de administración"}
    </p>
  );
}
