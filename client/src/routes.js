import HomePage from "./pages/HomePage.vue";
import AddProductPage from "./pages/AddProductPage.vue";
import EditProductPage from "./pages/EditProductPage.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
  },
  {
    name: "AddProductPage",
    component: AddProductPage,
    path: "/add-product",
  },
  {
    name: "EditProductPage",
    component: EditProductPage,
    path: "/edit-product/:id",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
