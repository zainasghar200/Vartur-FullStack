<template>
  <SpinnerLoader v-if="loading" />
  <transition name="modal-fade" v-if="showModal">
    <div class="modal-backdrop">
      <div class="bg-white w-[400px] rounded-[4px]">
        <div
          class="border-b-[1px] rounded-tl-[4px] rounded-tr-[4px] h-[40px] px-[10px] bg-gray-100 flex items-center border-b-gray-200"
        >
          <p class="text-[18px] font-semibold">Confirm</p>
        </div>
        <div class="py-[20px] px-[10px]">
          <p>Are your sure to add this product?</p>
        </div>
        <div
          class="flex border-t-[1px] px-[10px] h-[50px] items-center flex-row justify-end border-t-gray-200 gap-3"
        >
          <button
            @click="addProduct"
            class="bg-[#344b9e] text-white px-[30px] py-[5px] rounded-[5px]"
          >
            Yes
          </button>
          <button
            @click="close"
            class="bg-red-500 text-white px-[30px] py-[5px] rounded-[5px]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </transition>

  <div>
    <NavBar />
    <BreadCrumbs parent="Home" path="/" active="Add Product" />
    <div class="flex mt-[60px] flex-col items-center justify-center">
      <div
        class="sm:w-full md:w-[450px] shadow-lg flex flex-col py-[30px] bg-[#f8f9fa] px-2 justify-center items-center"
      >
        <div class="text-[22px] font-bold mb-6 text-[#344b9e]">Add Product</div>
        <div class="flex flex-col gap-10 justify-center">
          <div>
            <input
              type="text"
              name="name"
              v-model="product.name"
              placeholder="Enter Name"
              class="w-full border border-[#a3d0e4] rounded-md pl-4 py-3 focus:outline-none focus:border-[#344b9e] focus:ring-1 focus:ring-[#344b9e]"
            />
          </div>
          <div>
            <input
              type="file"
              name="image"
              @change="onImageSelected"
              class="w-full border border-[#a3d0e4] rounded-md pl-4 py-3 focus:outline-none focus:border-[#344b9e] focus:ring-1 focus:ring-[#344b9e]"
            />
          </div>
          <div
            v-if="showImage"
            class="h-[200px] flex justify-center items-center border-[1px] p-2"
          >
            <img
              :src="imageUrl"
              alt="Product_image"
              class="max-w-full max-h-full"
            />
          </div>
          <div class="">
            <button
              :class="
                disableButton
                  ? 'opacity-50 w-full bg-[#344b9e] p-3 text-white rounded'
                  : 'opacity-100 w-full bg-[#344b9e] p-3 text-white rounded'
              "
              v-on:click="open"
              :disabled="disableBtn()"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "../drawer/NavBar.vue";
import { defineComponent } from "vue";
import { http } from "@/axios/config";
import BreadCrumbs from "../breadCrumbs/BreadCrumbs.vue";
import SpinnerLoader from "../spinner/SpinnerLoader.vue";
import { useToast } from "primevue/usetoast";
import { ProductForm } from "@/interfaces/ProductInterface";

export default defineComponent({
  components: {
    NavBar,
    BreadCrumbs,
    SpinnerLoader,
  },
  setup() {
    const toast = useToast();
    function successToast(msg: string) {
      toast.add({
        severity: "success",
        summary: "Add Product",
        detail: msg,
        life: 2000,
      });
    }
    function errorToast(msg: string) {
      toast.add({
        severity: "error",
        summary: "Add Product",
        detail: msg,
        life: 2000,
      });
    }
    return {
      successToast,
      errorToast,
    };
  },
  data() {
    return {
      product: {
        name: "",
        image: "",
      } as ProductForm,
      imageUrl: "" as string,
      showImage: false as boolean,
      loading: false as boolean,
      showModal: false as boolean,
      disableButton: true as boolean,
    };
  },

  methods: {
    onImageSelected(event: any): void {
      const file = event.target.files[0];
      this.product.image = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result as string;
      };
      if (file !== undefined || file !== null) {
        reader.readAsDataURL(file);
      }
      this.showImage = true;
    },

    async addProduct(): Promise<void> {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("name", this.product.name);
        formData.append("image", this.product.image);
        const res = await http.post("/product/add-product", formData);
        this.successToast(res.data.msg);
        this.showModal = false;
        this.loading = false;
        this.$router.push("/");
      } catch (error: any) {
        console.log(error.response.data.msg);
        this.errorToast(error.response.data.msg);
        this.loading = false;
      }
    },
    close(): void {
      this.showModal = false;
    },
    open(): void {
      this.showModal = true;
    },
    disableBtn(): boolean {
      if (this.product.name === "" || this.product.image === "") {
        this.disableButton = true;
        return true;
      } else {
        this.disableButton = false;
        return false;
      }
    },
  },
});
</script>
