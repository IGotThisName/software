<script lang='ts'>
  // @ts-nocheck
  import { enhance } from "$app/forms";
  import Markdown from "svelte-exmarkdown";

  // svg
  import minus from '$lib/assets/minus.svg';
  import plus from '$lib/assets/plus.svg';
  import rightArrow from '$lib/assets/right-arrow.svg';

  const { data, form } = $props();

  let documents = $state(data.documents);
  const userID = data.user.id;

  let seldoc = $state(-1);
  let sel = $state(-1);

  const buttonStyle = "text-center shadow-lg rounded-md inset-shadow-slate-600/50 inset-shadow-sm p-2 transition-all hover:shadow-xl/25 cursor-pointer size-12 flex justify-center items-center";
</script>

<div class="w-screen h-screen flex flex-row bg-slate-700">
  <div class="h-screen bg-slate-800 rounded-r-xl flex flex-col justify-center text-white inset-shadow-sm/50 shadow-sm/50 relative">
    <form class="text-4xl p-6 gap-4 flex flex-col" action="?/create" method="POST" use:enhance={({ formData }) => {
      formData.append('id', seldoc.toString());

      return async ({ update }) => {
        await update()

        documents.push({
          user: userID,
          id: form.id,
          title: "Document Title",
          content: "",
        });
      };
    }}>
      <a class='{buttonStyle}' href={sel !== -1 ? '/document/' + seldoc : '/dashboard'} aria-label="open" ><img src={rightArrow} alt="open" /></a>
      <button 
        class={buttonStyle} 
        formaction="?/delete" 
        onclick={() => {
          documents.splice(sel, 1);
          sel = -1;
        }}
      ><img src={minus} alt="delete" /></button>
      <button class='{buttonStyle} group' formaction="?/create" ><img src={plus} alt="plus" /></button>
    </form>

    <form 
      method="POST" action="?/logout"
      class="flex justify-center items-center absolute inset-x-0 bottom-0 p-4"
    >
      <button formaction="?/logout" class="
        text-center shadow-lg rounded-md inset-shadow-slate-600/15 
        inset-shadow-sm p-2 transition-all hover:shadow-xl/25 cursor-pointer
        w-full
      "
      >Log Out</button>
    </form>
  </div>

  <div class="flex w-full h-screen p-12 gap-12 flex-wrap justify-center overflow-scroll">
    {#each documents as document, i}
      <button 
        onclick={() => {seldoc = document.id; sel = i}}
        class='
          {sel === i ? "border-4" : "border-none"}
          size-96 bg-slate-800 cursor-pointer transition-all 
          border-solid border-blue-200 rounded-lg
          p-2 flex flex-col shadow-lg hover:shadow-xl/25
        '
      >
        <div class="bg-slate-700/50 w-full h-5/6 rounded-lg overflow-hidden">
          <div class="prose prose-invert scale-50 origin-top p-4 overflow-hidden text-left">
            <Markdown md={document.content} />
          </div>
        </div>
        <form method="POST" action="?/rename" use:enhance={({ formData }) => {
          formData.append('id', document.id.toString());

          return async ({ update }) => {
            await update({ reset: false })
          };
        }}>
          <input class="p-4 text-slate-100 font-semibold text-xl text-center focus:outline-none" value={document.title} name="title" />
        </form>
      </button>
    {/each}
  </div>
</div>