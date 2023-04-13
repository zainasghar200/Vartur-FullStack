<template>
  <SpinnerLoader v-if="loading" />

  <div>
    <div class="p-6">
      <router-link
        class="bg-[#5EA2EA] p-2 text-white rounded"
        to="/add-product"
      >
        Add Product
      </router-link>
    </div>
    <div v-if="!showTable()" class="p-5">
      No Products are available. Please add new product.
    </div>
    <DataTable
      v-if="showTable()"
      v-model:filters="filters"
      :value="products"
      :paginator="true"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :rows="5"
      :globalFilterFields="['id', 'name', 'image', 'created_at']"
      :filters="true"
    >
      <template #header>
        <div class="flex justify-start">
          <span class="p-input-icon-left pl-5">
            <input
              type="text"
              placeholder="Filter"
              class="w-96 border border-[#a3d0e4] rounded-md pl-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </span>
        </div>
      </template>
      <template>
        <Column header="ID" style="width: 140px">
          <template #body="rowData">
            <p v-tooltip="rowData.data.id">
              {{ shortenAddress(rowData.data.id) }}
            </p>
          </template>
        </Column>
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
        <Column header="Created at">
          <template #body="rowData">
            <p>
              {{ setCreatedDate(rowData.data.createdAt) }}
            </p>
          </template>
        </Column>

        <Column header="Image">
          <template #body="rowData">
            <div class="h-[70px] w-[100px] flex justify-center items-center">
              <img
                :src="rowData.data.picture"
                alt="hello"
                class="max-w-full max-h-full rounded-[3px]"
              />
            </div>
          </template>
        </Column>
        <Column header="Action">
          <template #body="rowData">
            <div class="flex flex-row gap-2">
              <div class="hover:bg-[#3489e5] p-2 rounded-[2px] bg-[#5EA2EA]">
                <RouterLink
                  :to="'/edit-product/' + rowData.data.id"
                  class="text-white rounded"
                >
                  <i class="pi pi-pencil" />
                </RouterLink>
              </div>
              <div
                class="hover:bg-[#dc3545] p-2 rounded-[2px] bg-[#f86c6b]"
                @click="openModal(rowData.data.id)"
              >
                <button class="text-white rounded">
                  <i class="pi pi-trash" />
                </button>
              </div>
            </div>
          </template>
        </Column>
      </template>
    </DataTable>
    <transition name="modal-fade">
      <div class="modal-backdrop" v-if="showModal">
        <div class="modal">
          <div class="border-b-[2px] border-b-gray-400">
            <p class="text-[22px] font-bold">Confirm</p>
          </div>
          <div class="py-[20px]">
            <p>Are your sure to delete this product?</p>
          </div>
          <div class="flex flex-row justify-start gap-3">
            <button
              @click="deleteProduct"
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
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { http } from "../../axios/config";
import SpinnerLoader from "../spinner/SpinnerLoader.vue";

export default {
  data() {
    return {
      name: "",
      products: [],
      columns: [
        { field: "name", header: "Name" },
        // { field: "createdAt", header: "Created at" },
      ],
      rows: 5, // number of rows per page
      imageUrl: null,
      loading: false,
      showModal: false,
      productId: null,
    };
  },
  components: {
    DataTable,
    Column,
    SpinnerLoader,
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        let result = await http.get("/product/get-products");
        this.products = result.data;
        this.imageUrl;
        this.loading = false;
      } catch (error) {
        console.log(error.response.data.msg);
        this.loading = false;
      }
    },
    onBtnClick(id) {
      console.log(id);
    },
    close() {
      this.showModal = false;
    },
    openModal(id) {
      this.showModal = true;
      this.productId = id;
    },
    async deleteProduct() {
      this.loading = true;
      try {
        let result = await http.delete(
          "/product/delete-product/" + this.productId
        );
        if (result.status == 200) {
          this.$toast.success(result.data.msg);
          this.loadData();
          this.loading = false;
          this.showModal = false;
        }
      } catch (error) {
        console.log(error.response.data.msg);
        this.$toast.error(error.response.data.msg);
        this.loading = false;
        this.showModal = false;
      }
    },
    shortenAddress(id) {
      return `${id.slice(0, 5)}...${id.slice(id.length - 4)}`;
    },
    setCreatedDate(date) {
      const createdAt = new Date(date);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Karachi",
        hour12: true,
      };
      const formattedDate = createdAt
        .toLocaleDateString("en-US", options)
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      return formattedDate;
    },
    showTable() {
      if (this.products.length !== 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.modal-backdrop {
  position: absolute;
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
