import { supabase } from '$lib/supabaseClient.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

// get md from database
export const load: PageServerLoad = async ({ locals, params }) => {
  console.log(locals.user)
  if (locals.user === null) {
		return redirect(308, "/login");
	}

  const { data, error } = await supabase.from("documents").select().eq('title', params.slug);

  error ?? console.log(error);

  if (data) {
    const document = data[0];

    return ({
      title: document.title,
      content: document.content,
    })
  }
  
  return ({});
}

// upload markdown to database
export const actions = {
	default: async ({ request }:{ request:Request }) => {
		const formData = await request.formData();
    const md = formData.get('input');
    const title = formData.get('title');

    const { error } = await supabase
      .from('documents')
      .update({ content: md })
      .eq('title', title)
      .select();

    error ?? console.log(error);

    return { success: true };
	}
};