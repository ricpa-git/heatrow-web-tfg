export interface Event {
  id: string;
  slug: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  fourvenuesUrl: string;
  videoUrl: string;
}

export const events: Event[] = [
  {
    id: "1",
    slug: "evento-1",
    title: '"KANYE WEST AFTER CONCERT"',
    venue: "TEATRO MAGNO, MADRID",
    date: "30/07",
    time: "00:00 a 7:30",
    fourvenuesUrl: "https://web.fourvenues.com/es/bao-bao/events/heatrow-ii-273-baobao-27-03-2026-WTXA",
    videoUrl: "/videoye.mp4"
  },
  {
    id: "2",
    slug: "evento-2",
    title: "?????",
    venue: "SALA CLAMORES, MADRID",
    date: "05/05",
    time: "TBD",
    fourvenuesUrl: "https://web.fourvenues.com/es/bao-bao/events/heatrow-ii-273-baobao-27-03-2026-WTXA",
    videoUrl: "/videoye.mp4"
  }
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}
