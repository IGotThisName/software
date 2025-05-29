<script>
  const props = $props();
  const data = props.data;
</script>

<div class="p-4">
  <h1 class="text-xl mb-2">User {data.user.username}</h1>
  <ul class="ml-2 text-lg">
    {#each data.titles as title}
      <li><a href={'/document/' + title}>{title}</a></li>
    {/each}
  </ul>
</div>
