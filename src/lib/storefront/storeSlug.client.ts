export function getStoreSlugFromHostClient(): string {
  const host = window.location.hostname;
  return host.split('.')[0] || '';
}
