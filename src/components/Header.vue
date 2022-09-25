<template>
  <div>
    <header class="bg-custom-tan w-full p-10 mb-10">
      <h2 class="text-4xl m-10 text-custom-blue">Flag-to-Flag Fuel Calculator</h2>
      <nav class="flex flex-row justify-center">
        <router-link class="mx-10" to="/">Fuel Calculator</router-link>
        <router-link class="mx-10" to="/avglap">Average Lap</router-link>
        <router-link class="mx-10" to="/teams">Teams</router-link>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
  .router-link-exact-active {
    font-style: italic;
  }

</style>