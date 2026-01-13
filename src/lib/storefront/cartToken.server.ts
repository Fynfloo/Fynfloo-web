import 'server-only';
import { cookies } from 'next/headers';

export async function getCartTokenServer(): Promise<string | null> {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get('cart_token');
  return cartToken ? cartToken.value : null;
}
