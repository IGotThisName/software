import { supabase } from "$lib/supabaseClient.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async () => {
  const { data, error } = await supabase.from('documents').select();

  error ?? console.log(error);

  if (data) {
    let titles: Array<string> = []
    data.forEach((document) => {
      titles.push(document.title);
    })

    return ({ titles })
  }

  return ({ })
}