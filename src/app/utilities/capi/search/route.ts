import { searchMeta, User } from '@/app/_modules/meta';

/**
 * Exposes an API route to interface with the Meta module.
 *
 * @param request must
 * @returns
 */
export async function POST(request: Request): Promise<Response> {
  const data = await request.json();

  if (null == data) {
    return new Response('no body', { status: 422 });
  }

  let searchPromise;

  try {
    const user: User = data;

    searchPromise = await searchMeta(user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: capi/subscribe route failed to post');
    return new Response('failed', { status: 422 });
  }

  if (null == searchPromise) {
    return new Response('empty', { status: 204 });
  }

  return new Response('posted', { status: 201 });
}
