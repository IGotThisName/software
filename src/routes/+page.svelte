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
<textarea bind:value={md}></textarea>
<div class="prose">
	<Markdown {md} />
</div>
{/await}