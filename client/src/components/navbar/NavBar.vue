<template>
  <div
    class="flex flex-row justify-start items-center gap-10 sticky top-0 bg-[#dee4eb] px-5 py-4 z-40"
  >
    <div>
      <img
        @click="goToHome"
        :src="logo"
        alt="logo"
        class="w-[100px] cursor-pointer"
      />
    </div>
  </div>
  <breadCrumb />
</template>

<script>
import logo from "../../assets/img/logo.png";
export default {
  data() {
    return {
      logo: logo,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>
