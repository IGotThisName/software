import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/session.js";
import { supabase } from "$lib/supabaseClient.js";

export const load: PageServerLoad = async ({ locals }) => {
  // If already logged in, redirect to dashboard
  if (locals.user) {
    redirect(303, '/dashboard')
  }
}

export const actions = {
  login: async (event) => {

    // get form data
		const data = await event.request.formData();  
    const email = data.get('email');
		const password = data.get('password');

    // check email
    if (!email) {
			return fail(400, { email, missing: true });
		}

    // check against db
    const user = await supabase.from('users').select().eq('email', email).single();

    // check for existing user or password fail
    if (!user || user.error) {
      console.log('failed')
			return fail(400, { email, incorrect: true });
		}
    if (user.data.password !== password) {
      return fail(400, { email, incorrect:true })
    }

    // create token and session
    const token = generateSessionToken();
    const session = await createSession(token, user.data.id);

    // set session cookie
    setSessionTokenCookie(event, token, session.expiresAt);

    // send to dashboard
    redirect(303, '/dashboard');
	}
} satisfies Actions