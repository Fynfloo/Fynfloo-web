export function getCartTokenClient(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const found = document.cookie
    .split('; ')
    .find((c) => c.startsWith('cart_token='));

  return found ? decodeURIComponent(found.split('=')[1] ?? '') : null;
}

export function setCartTokenClient(token: string) {
  if (typeof document === 'undefined') {
    return;
  }

  // Host-only cookie: DO NOT set Domain=
  document.cookie = `cart_token=${encodeURIComponent(
    token
  )}; Path=/; SameSite=Lax`;
}
