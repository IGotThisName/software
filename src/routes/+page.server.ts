import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    redirect(303, '/dashboard')
  } else {
    redirect(303, '/login')
  }
}