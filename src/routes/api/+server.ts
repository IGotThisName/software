import { json } from "@sveltejs/kit";

export async function GET() {

  await delay(1000);

  return json(
    {
      'markdown': "# Hello World!"
    }
  );
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}