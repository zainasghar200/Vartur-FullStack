<template>
  <div
    class="flex justify-center items-center absolute w-full opacity-50 h-screen bg-black z-50"
  >
    <div>
      <ScaleLoader color="#ffffff" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default defineComponent({
  components: {
    ScaleLoader,
  },
});
</script>
