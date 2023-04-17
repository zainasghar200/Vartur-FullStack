<template>
  <div class="py-3 sticky bg-white top-[48px] px-6 border-b-[2px] z-40">
    <span
      ><router-link class="text-[#25377B] underline" :to="path">{{
        parent
      }}</router-link>
      / {{ active }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    parent: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: false,
    },
  },
});
</script>
