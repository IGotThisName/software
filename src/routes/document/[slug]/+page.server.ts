import { supabase } from '$lib/supabaseClient.js';
import type { PageServerLoad } from './$types.js';

// load the file
export const load: PageServerLoad = async ({ params }) => {
  const { data, error } = await supabase.from("documents").select();

  if (data) {
    const document = data.find(element => element.title === params.slug);

    return ({
      title: document.title,
      content: document.content,
    })
  }
  
  return ({});
}

// upload markdown
export const actions = {
	default: async ({ request }:{ request:Request }) => {
		const formData = await request.formData();
    const md = formData.get('input');
    const title = formData.get('title');

    const { data, error } = await supabase
      .from('documents')
      .update({ content: md })
      .eq('title', title)
      .select();

    console.log(data);

    return { success: true };
	}
};