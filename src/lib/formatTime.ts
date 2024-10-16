export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString();
}

export function formatDateAndTime(date: Date) {
  return new Date(date).toLocaleString();
}
