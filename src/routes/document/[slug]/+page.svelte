<script>
  import { enhance } from '$app/forms';
	import Markdown from 'svelte-exmarkdown';

  const props = $props();
  const document = props.data.document

  let md = $state(document.content);
  let edit = $state(true);
</script>

<div class="w-screen h-screen overflow-hidden flex bg-slate-600 justify-center items-center p-8">
  <form 
    method="POST" 
    class="w-3xl h-full flex flex-col bg-slate-800 rounded-xl shadow-xl transition-all text-white"
    use:enhance={({ formData }) => {
    formData.append('id', document.id);

    return async ({ update }) => {
      update({ reset: false })
    };
  }}>
    {#if edit} 
      <div class="p-4 h-full">
        <textarea 
          bind:value={md}
          class="w-full h-full resize-none outline-none"
          name="input"
        ></textarea>
      </div>
    {:else}
      <div class="prose prose-invert p-4 h-full overflow-scroll">
        <Markdown {md} />
      </div>
      <!-- DO NOT REMOVE, REQUIRED AS FORM SUBMITS ON RELOAD OR EXIT -->
      <textarea 
          bind:value={md}
          class="hidden"
          name="input"
        ></textarea>
    {/if}

    <div class="w-full h-12 flex">
      <a 
        href="/dashboard"
        class="w-1/3 font-semibold bg-gray-700 transition-all hover:bg-gray-600 rounded-bl-xl flex justify-center items-center"
      >Home</a>
      <button
        class="w-1/3 font-semibold bg-gray-700 transition-all hover:bg-gray-600 cursor-pointer"
        type="submit"
      >Save</button>
      <button
        class="w-1/3 font-semibold bg-gray-700 transition-all hover:bg-gray-600 rounded-br-xl cursor-pointer"
        onclick={() => {edit = !edit}}
      >{edit ? "View" : "Edit"}</button>
    </div>
  </form>
</div>