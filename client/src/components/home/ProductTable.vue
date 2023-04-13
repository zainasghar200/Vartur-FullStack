<template>
  <SpinnerLoader v-if="loading" />
  <div>
    <NavBar />
    <BreadCrumbs parent="Home" path="/" active="Products" />
    <DataTable
      v-model:filters="filters"
      :value="products"
      :paginator="true"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :rows="5"
      :globalFilterFields="['id', 'name', 'image', 'created_at']"
      :filters="true"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <div
            class="flex justify-center items-center p-3 rounded-full bg-[#25377B] cursor-pointer"
            @click="goToProduct"
            v-tooltip="'Add Product'"
          >
            <i class="pi pi-plus text-white"></i>
          </div>
          <span class="p-input-icon-left pl-5">
            <input
              v-model="searchTerm"
              @input="filterData"
              type="text"
              placeholder="Filter"
              class="w-[300px] border border-[#a3d0e4] rounded-md pl-2 md:pl-4 py-2 md:py-3 focus:outline-none focus:border-[#25377B] focus:ring-1 focus:ring-[#25377B] placeholder:text-[14px]"
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
              <div class="hover:bg-[#344b9e] p-2 rounded-[2px] bg-[#25377B]">
                <RouterLink
                  :to="'/edit-product/' + rowData.data.id"
                  class="text-white rounded"
                >
                  <i class="pi pi-pencil" />
                </RouterLink>
              </div>
              <div
                class="hover:bg-[#f86c6b] p-2 rounded-[2px] bg-[#dc3545]"
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
        <div class="bg-white w-[400px] rounded-[4px]">
          <div
            class="border-b-[1px] rounded-tl-[4px] rounded-tr-[4px] h-[40px] px-[10px] bg-gray-100 flex items-center border-b-gray-200"
          >
            <p class="text-[18px] font-semibold">Confirm</p>
          </div>
          <div class="py-[20px] px-[10px]">
            <p>Are your sure to delete this product?</p>
          </div>
          <div
            class="flex border-t-[1px] px-[10px] h-[50px] items-center flex-row justify-end border-t-gray-200 gap-3"
          >
            <button
              @click="deleteProduct"
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
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { http } from "../../axios/config";
import SpinnerLoader from "../spinner/SpinnerLoader.vue";
import BreadCrumbs from "../breadCrumbs/BreadCrumbs.vue";
import NavBar from "../navbar/NavBar.vue";

export default {
  data() {
    return {
      name: "",
      products: [],
      defaultProducts: [],
      columns: [
        { field: "name", header: "Name" },
        // { field: "createdAt", header: "Created at" },
      ],
      rows: 5, // number of rows per page
      imageUrl: null,
      loading: false,
      showModal: false,
      productId: null,
      searchTerm: "",
    };
  },
  components: {
    DataTable,
    Column,
    SpinnerLoader,
    BreadCrumbs,
    NavBar,
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        let result = await http.get("/product/get-products");
        this.products = result.data;
        this.defaultProducts = result.data;
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
    goToProduct() {
      this.$router.push("/add-product");
    },
    filterData() {
      if (this.searchTerm !== "") {
        this.products = this.products.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      } else {
        return (this.products = this.defaultProducts);
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
