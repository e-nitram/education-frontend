/**
 * Delivers a JS bundle to a requesting pixel.
 *
 * @param request must
 * @returns
 */
export async function GET(_request: Request): Promise<Response> {
  const script = `
    console.log('CM Script running!');
  `;

  return new Response(script, {
    headers: { 'Content-Type': 'application/javascript' },
  });
}
