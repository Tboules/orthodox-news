export function createArrayOfPages(num: number, issuesPerPage: number) {
  const totalPages = Math.ceil(num / issuesPerPage);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
