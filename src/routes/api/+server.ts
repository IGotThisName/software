import { json } from "@sveltejs/kit";
import { head } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function GET() {

  console.log("begin blob fetch")
  const blob = await head('markdown/test.md', {token:BLOB_READ_WRITE_TOKEN});
  console.log("begin markdown fetch")

  const resp = await fetch(blob.downloadUrl);
  const md = await resp.text()

  return json(
    {
      'markdown': md
    }
  );
}
