const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function LogoutButton() {
  async function handleLogout() {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
    } catch {}
    window.location.href = "/admin/login";
  }

  return (
    <button
      className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition"
      onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  );
}
