<script lang="ts">
  import FormInput from "$lib/components/FormInput.svelte";
</script>

<div class="w-screen h-screen flex justify-center items-center bg-slate-600">
  <form
  method="POST" 
  action="?/register"
  class="flex flex-col p-4 min-w-lg shadow-lg rounded-lg bg-slate-700 text-slate-100"
  >
    <h1 class="mb-4 text-xl text-center font-semibold">Sign Up</h1>

    <FormInput label="Username" name="username" type="text"/>
    <FormInput label="Email" name="email" type="email"/>
    <FormInput label="Password" name="password" type="password"/>
    <FormInput label="Confirm Password" name="password-conf" type="password"/>

    <div class="flex flex-col">
      <button class="
          mt-4 bg-slate-800 rounded-lg p-2 cursor-pointer
          shadow-lg font-semibold w-full hover:shadow-xl transition-all
        "
      >Sign Up</button>
      <a 
        class="
          mt-4 bg-slate-800/80 rounded-lg p-2 hover:shadow-xl
          shadow-lg font-semibold w-full text-center transition-all
        "
        href='/login'
      >Log in</a>
    </div>
  </form>
</div>