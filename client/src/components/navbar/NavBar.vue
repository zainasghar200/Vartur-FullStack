<template>
  <div class="flex gap-10 bg-gray-300 px-10 py-5">
    <div class="text-lg"><router-link to="/">Home</router-link></div>
  </div>
  <breadCrumb />
</template>


<script>
   // import NavBar from '../navbar/NavBar.vue'
   export default {
     components: {
       // NavBar,
     },
   }
   </script>