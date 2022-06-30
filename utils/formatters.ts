export const formatTimeString = (date: Date): string =>
  date.toLocaleTimeString([], {
    hour: 'numeric',
  });
