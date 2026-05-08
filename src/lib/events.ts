export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  dice_Link: string;
  timeSlot: string;
  djs: Array<{ id: number; name: string }>;
}

export async function getEvents(): Promise<Event[]> {
  const apiUrl = import.meta.env.BACKEND_API_URL ?? 'http://localhost:5257/api';
  try {
    const res = await fetch(`${apiUrl}/events`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
