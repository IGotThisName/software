import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from "$lib/server/session.js";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve}) => {

  event.locals.disableDB = false;

  // get and check the token
  const token = event.cookies.get('session') ?? null;
  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  // validate session token and set cookie
  const { session, user } = await validateSessionToken(token);
  if (session !== null) {
    // update cookie
    setSessionTokenCookie(event, token, session.expiresAt);
  } else {
    // delete cookie if does not exist
    deleteSessionTokenCookie(event);
  }

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
}