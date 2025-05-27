<script>
  // @ts-nocheck
  
  import { enhance } from '$app/forms';
  import { updated } from '$app/state';
	import Markdown from 'svelte-exmarkdown';

  const props = $props();
  const data = props.data

  let md = $state(data.content);

</script>

<form method="POST" use:enhance={({ formData }) => {
  formData.append('title', data.title);

  return async ({ result, update }) => {
    update({ reset: false })
	};
}}>
  <div class="flex flex-row h-screen w-screen">
    <textarea 
        bind:value={md}
        class="flex w-1/2 p-4 resize-none outline-none focus:bg-slate-50"
        name="input"
    ></textarea>
    <div class="prose p-4">
        <Markdown {md} />
    </div>
  </div>

  <div class="fixed bottom-4 right-4">
    <button
        class="bg-slate-200 w-20 h-12 
        flex justify-center items-center 
        rounded-md shadow-md hover:bg-slate-300 transition-all"
        type="submit"
    >Save</button>
  </div>
</form>

