<script lang="ts">
  const { label, name, type } = $props();
</script>

<div class="flex w-full mb-2 mt-2 last-of-type:mb-0 first-of-type:mt-0 font-normal">
  <label 
    class="w-1/3" 
    for='{name}'
  >{label}</label>
  <input 
    class="
      w-2/3 bg-slate-100 rounded-sm p-1 shadow-sm 
      focus:outline-none focus:shadow-lg focus:shadow-slate-300 transition-shadow
    " 
    name='{name}' 
    type='{type}'
    minlength={type === "username" || type === "password" ? 8 : 0}
    required
  >
</div>