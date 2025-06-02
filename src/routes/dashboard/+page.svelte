<script>
  const props = $props();
  const data = props.data;
</script>

<div class="p-4">
  <h1 class="text-xl mb-2">User {data.user.username}</h1>
  <ul class="ml-2 text-lg">
    {#each data.documents as document}
      <li><a href={'/document/' + document.id}>{document.title}</a></li>
    {/each}
  </ul>
</div>

