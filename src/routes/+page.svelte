<script>
// @ts-nocheck

	import Markdown from 'svelte-exmarkdown';

  let md = $state("loading...")

	async function fetchData() {
    const res = await fetch("/api");

    if (res.ok) {
      const json = await res.json();
      console.log(json);

      md = json.markdown;
    }
    else {
      return new Error("Fetch error");
    }
	}
</script>

{#await fetchData()}
<p>Loading...</p>
{:then}

<form action="POST">
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

{/await}