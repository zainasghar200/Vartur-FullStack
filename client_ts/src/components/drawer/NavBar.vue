<template>
  <div
    class="flex flex-row justify-start items-center gap-10 sticky top-0 bg-[#dee4eb] px-5 py-4 z-40"
  >
    <div>
      <img
        @click="goToHome"
        src="../../assets/images/logo.png"
        alt="logo"
        class="w-[100px] cursor-pointer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
});
</script>
