<template>
  <Master>
    <div class="block p-6 rounded-lg shadow-lg bg-white">
      <div class="md:grid grid-cols-12">
        <div class="col-span-4 md:pr-2">
          <h1 class="font-bold text-lg">Create Category</h1>
          <div class="my-3">
            <input
              type="text"
              class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Enter Category Title"
              v-model="categoryTitle"
            />
            <small class="text-red-400" v-if="validateCategory"
              >Need To Fill The Category Title..</small
            >
          </div>
          <div class="text-end">
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
              @click="createCategory"
              :disabled="createStatus"
            >
              <div
                class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                role="status"
                v-if="createStatus"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-if="createStatus">Loading</span>
              <span v-if="!createStatus">Create Category</span>
            </button>
          </div>
        </div>
        <div class="col-span-8 px-3">
          <div class="w-full relative">
            <Loader v-if="fetchStatus"></Loader>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-x-auto" v-if="!fetchStatus">
                  <div
                    class="flex justify-end w-full"
                    v-if="categoryList.length > 0"
                  >
                    <div class="mb-3">
                      <input
                        type="text"
                        class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="Search Here"
                        v-model="searchKey"
                      />
                    </div>
                    <div class="">
                      <button
                        @click="search"
                        type="button"
                        class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div
                    class="bg-purple-100 rounded-lg py-5 px-6 mb-4 text-base text-purple-700"
                    v-if="categoryList.length == 0"
                    role="alert"
                  >
                    No Category Here!
                  </div>

                  <table class="min-w-full" v-if="categoryList.length != 0">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b"
                        v-for="(c, i) in categoryList"
                        :key="c"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {{ c.id }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          <span v-if="c.id != currentUpdate">
                            {{ c.title }}</span
                          >

                          <div
                            v-if="c.id == currentUpdate"
                            class="flex flex-col"
                          >
                            <input
                              type="text"
                              class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Search Here"
                              v-model="updateTitle"
                            />
                            <small class="text-yellow-700"
                              >Press Again Update Button To update Your
                              Category</small
                            >
                          </div>
                        </td>

                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          {{ formatDate(c.created_at) }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          <button
                            @click="deleteCategory(c.id, i)"
                            type="button"
                            class="inline-block px-3 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                          <button
                            type="button"
                            class="inline-block px-3 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-2"
                            @click="updateCategory(c.id, c.title, i)"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <pagination
            :links="pagLinks"
            @data="getEmitData"
            v-if="categoryList.length != 0"
          ></pagination>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
import Loader from "@/components/loader.vue";
export default {
  name: "CategoryPage",
  components: {
    Master,
    Pagination,
    Loader,
  },

  data() {
    return {
      categoryTitle: "",
      validateCategory: false,
      createStatus: false,
      categoryList: [],
      pagLinks: [],
      fetchStatus: false,
      searchKey: "",
      currentUpdate: null,
      updateTitle: "",
    };
  },
  methods: {
    createCategory() {
      this.validateCategory = this.categoryTitle == "" ? true : false;
      if (!this.validateCategory) {
        this.createStatus = true;
        axios
          .post(
            "http://127.0.0.1:8000/api/create/category",
            { title: this.categoryTitle },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.userToken}`,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              this.categoryTitle = "";
              this.createStatus = false;
              this.getCategory();
            }
          });
      }
    },
    getAllCategory() {
      this.fetchStatus = true;
      this.getCategory();
    },
    getCategory() {
      axios
        .get("http://127.0.0.1:8000/api/get/category", {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          this.categoryList = res.data.category.data;
          this.pagLinks = res.data.category.links;
          this.fetchStatus = false;
        });
    },
    getEmitData(e) {
      this.categoryList = e.category.data;
      this.pagLinks = e.category.links;
    },
    formatDate(dbDate) {
      let getDate = new Date(dbDate);
      let year = getDate.getFullYear();
      let month = getDate.getMonth();
      let day = getDate.getDay();
      let formatDate = `${day}-${month}-${year}`;
      return formatDate;
    },
    deleteCategory(id, index) {
      let data = {
        id: id,
      };
      axios
        .post("http://127.0.0.1:8000/api/delete/category", data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            if (this.categoryList.length == 1) {
              this.getCategory();
            } else {
              this.categoryList.splice(index, 1);
            }

            Toast.fire({
              icon: "success",
              title: "Deleted Success",
            });
          }
        });
    },
    search() {
      axios
        .get("http://127.0.0.1:8000/api/get/category", {
          params: { searchKey: this.searchKey },
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          this.categoryList = res.data.category.data;
          this.pagLinks = res.data.category.links;
        });
    },
    updateCategory(id, title, index) {
      if (id == this.currentUpdate) {
        let data = {
          id: id,
        };
        data["title"] = this.updateTitle != "" ? this.updateTitle : title;
        axios
          .post("http://127.0.0.1:8000/api/update/category", data, {
            headers: {
              Authorization: `Bearer ${this.$store.state.userToken}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.categoryList[index].title =
                this.updateTitle != "" ? this.updateTitle : title;
              Toast.fire({
                icon: "success",
                title: "Update Success",
              });
              this.currentUpdate = null;
            }
          });
      } else {
        this.currentUpdate = id;
        this.updateTitle = title;
      }
    },
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.getAllCategory();
  },
};
</script>

<style lang="scss" scoped></style>
