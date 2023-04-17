<template>
  <AddProduct />
</template>

<script lang="ts">
import AddProduct from "@/components/products/AddProduct.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    AddProduct,
  },
});
</script>
