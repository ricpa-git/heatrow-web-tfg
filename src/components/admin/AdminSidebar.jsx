import { useState } from "react";

const sections = [
  { href: "/admin", label: "Dashboard", icon: "fi fi-rr-apps" },
  { href: "/admin/eventos", label: "Gestión de eventos", icon: "fi fi-rr-calendar" },
  { href: "/admin/djs", label: "Gestión de DJs", icon: "fi fi-rr-music-alt" },
  { href: "/admin/usuarios", label: "Gestión de usuarios", icon: "fi fi-rr-users" },
  { href: "/admin/subscriptores", label: "Gestión de subs", icon: "fi fi-rr-envelope" },
];

export default function AdminSidebar({ currentPath = "" }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`transition-all duration-300 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full ${collapsed ? "w-16 px-2" : "w-56 px-4"}`}
      style={{ minHeight: "100vh" }}
    >
      <div className={`flex ${collapsed ? "justify-center" : "justify-end"} pt-4 pb-4`}>
        <button
          className="bg-zinc-800 text-zinc-100 px-3 py-2 rounded-lg border border-zinc-700 hover:text-[oklch(50.5%_0.213_27.518)] transition"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        {sections.map((section) => {
          const isActive = currentPath === section.href;
          return (
            <a
              key={section.href}
              href={section.href}
              className={`font-semibold transition whitespace-nowrap overflow-hidden ${collapsed ? "text-xs px-0 text-center" : "text-base px-2"} ${isActive ? "text-[oklch(50.5%_0.213_27.518)]" : "text-zinc-100 hover:text-[oklch(50.5%_0.213_27.518)]"}`}
              title={section.label}
            >
              <i className={`${section.icon} text-lg mr-2`} aria-hidden="true"></i>
              {!collapsed && section.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}