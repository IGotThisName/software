<script lang="ts">
  import FormInput from "$lib/components/FormInput.svelte";
</script>

<div class="w-screen h-screen flex justify-center items-center bg-slate-200">
  <form
  method="POST" 
  action="?/register"
  class="flex flex-col p-4 min-w-lg shadow-lg rounded-lg bg-slate-50"
  >
    <h1 class="mb-4 text-xl text-center font-semibold">Sign Up</h1>

    <FormInput label="Username" name="username" type="text"/>
    <FormInput label="Email" name="email" type="email"/>
    <FormInput label="Password" name="password" type="password"/>
    <FormInput label="Confirm Password" name="password-conf" type="password"/>

    <div class="flex flex-col">
      <button class="
          mt-4 bg-gradient-to-r from-blue-100 to to-blue-200 rounded-lg p-2
          shadow-lg font-semibold w-full
        "
      >Sign Up</button>
      <a 
        class="
          mt-4 bg-gradient-to-r from-slate-100 to to-blue-100 rounded-lg p-2
          shadow-lg font-semibold w-full text-center
        "
        href='/login'
      >Log in</a>
    </div>
  </form>
</div>