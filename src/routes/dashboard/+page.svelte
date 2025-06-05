<script lang='ts'>
  import { enhance } from "$app/forms";
  import Markdown from "svelte-exmarkdown";

  const props = $props();
  const data = props.data;

  let seldoc = $state(-1);
  let sel = $state(-1);

  const buttonStyle = "text-center shadow-lg rounded-md inset-shadow-slate-600/50 inset-shadow-sm p-2 transition-all hover:shadow-xl/25 hover:my-4 cursor-pointer";
</script>

<div class="w-screen h-screen flex flex-row bg-slate-700">
  <div class="h-screen w-1/6 bg-slate-800 rounded-r-xl flex flex-col justify-center text-white inset-shadow-sm/50 shadow-sm/50 relative">
    <form class="text-4xl p-6 gap-4 flex flex-col" action="?/create" method="POST" use:enhance={({ formData }) => {
      formData.append('id', seldoc.toString());

      return async ({ update }) => {
        await update()
        location.reload();
      };
    }}>
      <a class={buttonStyle} href={sel !== -1 ? '/document/' + seldoc : '/dashboard'} >Open</a>
      <button class={buttonStyle} formaction="?/delete" >Delete</button>
      <button class='{buttonStyle} group' formaction="?/create" >Create</button>
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

  <div class="flex w-5/6 h-screen p-12 gap-12 flex-wrap justify-start overflow-scroll">
    {#each data.documents as document, i}
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
          formData.append('id', document.id);

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