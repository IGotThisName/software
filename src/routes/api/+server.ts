import { json } from "@sveltejs/kit";
import { getDownloadUrl, head } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function GET() {

  console.log("begin blob fetch")
  const blob = await head('markdown/test.md', {token:BLOB_READ_WRITE_TOKEN});
  console.log("begin markdown fetch")
  const md = await fetch(blob.downloadUrl);

  return json(
    {
      'markdown': md
    }
  );
}
