<script lang='ts'>
  import { enhance } from "$app/forms";

  const props = $props();
  const data = props.data;

  let seldoc = $state(-1);
  let sel = $state(-1);


  const buttonStyle = "text-center shadow-lg rounded-md inset-shadow-slate-400/50 inset-shadow-sm p-2 transition-all hover:shadow-xl/25 hover:my-4 cursor-pointer";
</script>

<div class="w-screen h-screen flex flex-row bg-slate-300">
  
  <div class="h-screen w-1/6 bg-slate-500 rounded-r-xl flex flex-col justify-center text-white inset-shadow-sm/50 shadow-sm/50">

    <form class="text-4xl p-6 gap-4 flex flex-col" action="?/create" method="POST" use:enhance={({ formData }) => {
      formData.append('id', seldoc.toString());

      return async ({ update }) => {
        update({ reset: false })
      };
    }}>
      <a class={buttonStyle} href='/document/{seldoc}' >Open</a>
      <button class={buttonStyle} formaction="?/delete" >Delete</button>
      <button class={buttonStyle} formaction="?/create" >Create</button>
    </form>

  </div>

  <div class="flex w-5/6 h-screen p-12 gap-12 flex-wrap justify-start overflow-scroll">

    {#each data.documents as document, i}

      <button 
        onclick={() => {seldoc = document.id; sel = i}}
        class='
          {sel === i ? "border-4" : "border-none"}
          size-96 bg-slate-400 cursor-pointer transition-all 
          border-solid border-blue-700/50 rounded-lg
        '
      >
        {document.title}
      </button>
    {/each}

  </div>
</div>

