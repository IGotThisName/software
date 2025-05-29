import { supabase } from "$lib/supabaseClient.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ locals }) => {

  if (locals.user === null) {
    return redirect(308, "/login");
  }

  const { data, error } = await supabase.from('documents').select();

  error ?? console.log(error);

  if (data) {
    let titles: Array<string> = []
    data.forEach((document) => {
      titles.push(document.title);
    })

    return ({ titles, user: locals.user })
  }

  return ({ user: locals.user })
}