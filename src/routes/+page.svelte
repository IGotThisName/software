<script>
  const props = $props();
  const data = props.data;
</script>

<h1>Documents</h1>
<ul>
  {#each data.titles as title}
    <ul><a href={'/document/' + title}>title</a></ul>
  {/each}
</ul>