import { supabase } from "$lib/supabaseClient.js";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { Document } from "$lib/types.js";
import { deleteSessionTokenCookie, invalidateAllSessions } from "$lib/server/session.js";

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
      documents.push(document);
    })
  }

  return ({ documents, user })
}

export const actions = {
  create: async (event) => {
    const user = event.locals.user;

    const { data: document, error: documentError } = await supabase.from('documents').insert({user: user?.id}).select().single();

    return { id: document.id };
  },
  delete: async (event) => {
    const formData = await event.request.formData();
    const docID = formData.get('id');

    const { error } = await supabase.from('documents').delete().eq('id', docID);
  },
  logout: async (event) => {

    if (!event.locals.user) return;

    // invalidate sessions and delete cookies
    await invalidateAllSessions(event.locals.user.id);
    deleteSessionTokenCookie(event);

    // remove user and session
    event.locals.user = null;
    event.locals.session = null;

    redirect(303, '/login');
  },
  rename: async (event) => {
    const formData = await event.request.formData();
    const title = formData.get('title');
    const id = formData.get('id');

    await supabase.from('documents').update({title: title}).eq('id', id);
  }
} satisfies Actions