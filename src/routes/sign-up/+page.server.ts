import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { supabase } from "$lib/supabaseClient.js";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/session.js";

export const load: PageServerLoad = async ({ locals }) => {
  // If already logged in, redirect to dashboard
  if (locals.user) {
    redirect(303, '/dashboard')
  }
}

export const actions =  {
  register: async (event) => {

    // get form data
    const data = await event.request.formData();
    const email = data.get('email');
    const username = data.get('username');
    const password = data.get('password');
    const passwordConf = data.get('password-conf');

    // TODO check len, special characters, etc.
    if (!email || !username || !password || !passwordConf) {
      // TODO fix fail response
      return fail(400);
    }

    // check matching passwords
    if (password !== passwordConf) {
      // TODO fix fail response
      return fail(400);
    }

    // add to db, get error incase duplicate details eg. username exists
    const res = await supabase
      .from('users')
      .insert({
        username: username,
        email: email,
        password: password,
      })
      .select()
      .limit(1)
      .single();

    // check for error on db call, unique fields may be matching
    if (res.error) {
      // TODO fix error response on db fail
      return fail(400);
    }

    // from now on assumes user successfully created and will log in
    const token = generateSessionToken();
    const session = await createSession(token, res.data.id);
    
    // set session cookie
    setSessionTokenCookie(event, token, session.expiresAt);

    // redirect to dashboard
    redirect(303, '/dashboard');
  }
} satisfies Actions