import { supabase } from "$lib/supabaseClient.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { Document } from "$lib/types.js";

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (user === null) {
    return redirect(308, "/login");
  }

  const { data, error } = await supabase.from('documents').select().eq('user', user.id);

  // error checking
  error ?? console.log(error);

  // init array for each document
  let documents: Array<Document> = []

  if (data) {
    data.forEach((document) => {
      // documents.push({
      //   id: document.id,
      //   title: document.title,
      //   content: document.content,
      //   user: document.user,
      // });

      documents.push(document);
    })
  }

  return ({ documents, user })
}