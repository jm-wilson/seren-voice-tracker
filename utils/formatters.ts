export const formatTimeString = (date: Date): string =>
  date.toLocaleTimeString([], {
    hour: 'numeric',
  });

export const formatShortDateTimeString = (date: Date): string =>
  date.toLocaleDateString([], {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });