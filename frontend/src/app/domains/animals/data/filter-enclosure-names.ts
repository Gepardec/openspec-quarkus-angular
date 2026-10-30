export function filterEnclosureNames(enclosureNames: string[], input: string | null): string[] {
  const query = (input ?? '').toLowerCase();
  return enclosureNames.filter((name) => name.toLowerCase().includes(query));
}
