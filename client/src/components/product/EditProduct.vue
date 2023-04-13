<template>
  <SpinnerLoader v-if="loading" />
  <transition name="modal-fade" v-if="showModal">
    <div class="modal-backdrop">
      <div class="modal">
        <div class="border-b-[2px] border-b-gray-400">
          <p class="text-[22px] font-bold">Confirm</p>
        </div>
        <div class="py-[20px]">
          <p>Are your sure to update this product?</p>
        </div>
        <div class="flex flex-row justify-start gap-3">
          <button
            @click="updateProduct"
            class="bg-blue-400 text-white px-[40px] py-[8px] rounded-[5px]"
          >
            Yes
          </button>
          <button
            @click="close"
            class="bg-red-500 text-white px-[40px] py-[8px] rounded-[5px]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </transition>
  <div class="flex flex-col items-center justify-center h-screen">
    <div
      class="sm:w-full md:w-[450px] shadow-lg flex flex-col py-[30px] bg-[#f8f9fa] px-2 justify-center items-center"
    >
      <div class="text-[22px] font-bold mb-6">Update Product</div>
      <div class="flex flex-col gap-10 justify-center">
        <div>
          <input
            type="text"
            name="name"
            v-model="product.name"
            placeholder="Enter Name"
            class="w-full border border-[#a3d0e4] rounded-md pl-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            @change="onImageSelected"
            class="w-full border border-[#a3d0e4] rounded-md pl-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
            class="w-full bg-[#5EA2EA] p-3 text-white rounded"
            v-on:click="open"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from "../spinner/SpinnerLoader.vue";
import { http } from "../../axios/config";

export default {
  components: {
    SpinnerLoader,
  },
  data() {
    return {
      product: {
        name: "",
        image: "",
      },
      imageUrl: null,
      showImage: false,
      loading: false,
      showModal: false,
    };
  },

  methods: {
    onImageSelected(event) {
      const file = event.target.files[0];
      this.product.image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.showImage = true;
    },

    async updateProduct() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("name", this.product.name);
        formData.append("image", this.product.image);

        const response = await http.put(
          "/product/update-product/" + this.$route.params.id,
          formData
        );
        this.$toast.success(response.data.msg);
        this.showModal = false;
        this.loading = false;
        this.$router.push("/");
      } catch (error) {
        console.log(error.response.data.msg);
        this.$toast.error(error.response.data.msg);
        this.loading = false;
      }
    },
    close() {
      this.showModal = false;
    },
    open() {
      this.showModal = true;
    },
  },
  async mounted() {
    try {
      const result = await http.get(
        "/product/get-product/" + this.$route.params.id
      );
      this.product = result.data;
      this.imageUrl = result.data.picture;
      this.showImage = true;
    } catch (error) {
      console.log(error.response.data.msg);
    }
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
