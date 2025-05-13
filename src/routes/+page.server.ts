import { supabase } from '$lib/supabaseClient.js';

export async function load() {
  const { data, error } = await supabase.from("documents").select();

  if (data) {
    const document = data.find(element => element.id === 1);

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

    const { data, error } = await supabase
      .from('documents')
      .update({ content: md })
      .eq('id', 1)
      .select();

    console.log(data);

    return { success: true };
	}
};