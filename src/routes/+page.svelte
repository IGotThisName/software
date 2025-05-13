<script>
  const props = $props();
  const data = props.data;
</script>

<div>
  <h1 class="text-xl mb-2">Documents</h1>
  <ul class="ml-2 text-lg">
    {#each data.titles as title}
      <li><a href={'/document/' + title}>{title}</a></li>
    {/each}
  </ul>
</div>
