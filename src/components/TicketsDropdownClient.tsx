import { useState, useEffect, useRef } from 'react';

interface ApiEvent {
  id: number;
  title: string;
  date: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

export default function TicketsDropdownClient() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    fetch('/api/events')
      .then(r => r.json())
      .then((data: ApiEvent[]) => setEvents(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isTicketsActive = currentPath.startsWith('/tickets');

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`font-semibold transition-colors flex items-center gap-1 ${
          isTicketsActive
            ? 'text-white underline underline-offset-4'
            : 'text-[oklch(50.5%_0.213_27.518)] hover:text-[oklch(57.7%_0.245_27.325)]'
        }`}
      >
        TICKETS
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-0 w-56 bg-black border border-[oklch(50.5%_0.213_27.518)] rounded-sm shadow-lg z-50">
          {events.length === 0 ? (
            <span className="block px-4 py-3 text-zinc-500 text-sm">Sin eventos</span>
          ) : events.map(event => {
            const path = `/tickets/${event.id}`;
            const active = currentPath === path;
            return (
              <a
                key={event.id}
                href={path}
                className={`block px-4 py-3 transition-colors border-b border-[oklch(50.5%_0.213_27.518)]/20 last:border-b-0 ${
                  active
                    ? 'bg-[oklch(50.5%_0.213_27.518)]/20 text-white'
                    : 'text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)]/10 hover:text-white'
                }`}
              >
                <span className="block text-sm font-bold uppercase truncate">{event.title}</span>
                <span className="block text-xs opacity-70">{formatDate(event.date)}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
