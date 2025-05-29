<script lang="ts">
  const props = $props();
  const data = props.data;
</script>

<form method="POST" action="?/login">
  <label>
    Email
    <input name="email" type="email">
  </label>
  <label>
    Password
    <input name="password" type="password">
  </label>
  <button>Log in</button>
  <a href='/sign-up'>Sign up</a>
</form>