import { leadMeta, User } from '@/app/_modules/meta';

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

  let leadPromise;

  try {
    const user: User = data;

    leadPromise = await leadMeta(user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: capi/lead route failed to post');
    return new Response('failed', { status: 422 });
  }

  if (null == leadPromise) {
    return new Response('empty', { status: 204 });
  }

  return new Response('posted', { status: 201 });
}
