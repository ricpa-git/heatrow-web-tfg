import { useState } from "react";

const sections = [
  { href: "/admin", label: "Dashboard", icon: "fi fi-rr-apps" },
  { href: "/admin/eventos", label: "Eventos", icon: "fi fi-rr-calendar" },
  { href: "/admin/djs", label: "DJs", icon: "fi fi-rr-music-alt" },
  { href: "/admin/galeria", label: "Galería", icon: "fi fi-rr-picture" },
  { href: "/admin/usuarios", label: "Usuarios", icon: "fi fi-rr-users" },
  { href: "/admin/subscriptores", label: "Suscriptores", icon: "fi fi-rr-envelope" },
];

export default function AdminSidebar({ currentPath = "" }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`transition-all duration-200 bg-zinc-950 border-r border-zinc-800 flex flex-col ${collapsed ? "w-14" : "w-48"}`}
      style={{ minHeight: "100%" }}
    >
      <div className="flex justify-end p-2 border-b border-zinc-800">
        <button
          className="text-zinc-500 hover:text-white transition p-1.5 text-xs"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex flex-col mt-2">
        {sections.map((section) => {
          const isActive = currentPath === section.href;
          return (
            <a
              key={section.href}
              href={section.href}
              title={section.label}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition border-l-2 whitespace-nowrap overflow-hidden ${
                isActive
                  ? "border-l-white text-white bg-zinc-900"
                  : "border-l-transparent text-zinc-500 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <i className={`${section.icon} text-base flex-shrink-0`} aria-hidden="true" />
              {!collapsed && <span>{section.label}</span>}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
