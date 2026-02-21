export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function groupTimelineByDate(timeline: Array<{ date: bigint; topics: string[]; completed: boolean }>) {
  const grouped: {
    [month: string]: {
      [week: string]: Array<{ date: bigint; topics: string[]; completed: boolean }>;
    };
  } = {};

  timeline.forEach((day) => {
    const date = new Date(Number(day.date) / 1_000_000);
    const month = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    const weekNum = Math.ceil(date.getDate() / 7);
    const week = `Week ${weekNum}`;

    if (!grouped[month]) {
      grouped[month] = {};
    }
    if (!grouped[month][week]) {
      grouped[month][week] = [];
    }
    grouped[month][week].push(day);
  });

  return grouped;
}
