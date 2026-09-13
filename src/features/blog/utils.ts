export function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function formatBlogDate(date: Date | null | undefined): string {
  if (!date) return "Recently published";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Recently published";
  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
