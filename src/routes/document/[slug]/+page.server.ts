import { supabase } from '$lib/supabaseClient.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

// get md from database
export const load: PageServerLoad = async ({ locals, params }) => {

  // check any user is logged in, if not go to login.
  if (locals.user === null) {
		return redirect(308, "/login");
	}

  // get document from database
  const { data: document, error: documentError } = await supabase.from("documents").select().eq('id', params.slug).single();

  // error checking
  documentError ?? console.log(documentError);

  // check for not null
  if (document) {

    // check for user auth
    if (locals.user.id !== document.user) {
      error(401, {message: "User not authorised for this document!"})
    }

    return ({ document })
  }
}

// upload markdown to database
export const actions = {
	default: async ({ request }:{ request:Request }) => {
		const formData = await request.formData();
    const md = formData.get('input');
    const id = formData.get('id');

    const { error } = await supabase
      .from('documents')
      .update({ content: md })
      .eq('id', id)
      .select();

    error ?? console.log(error);

    return { success: true };
	}
};