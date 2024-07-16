export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
