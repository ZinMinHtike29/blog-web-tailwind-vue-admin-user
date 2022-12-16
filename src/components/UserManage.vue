<template>
  <div>
    <div class="flex justify-end items-center">
      <div class="md:w-1/4">
        <input
          type="text"
          class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleFormControlInput1"
          placeholder="Search Here"
          v-model="searchKey"
        />
      </div>
      <div class="">
        <button
          type="button"
          class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          @click="search(current)"
        >
          Search
        </button>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <div
              class="bg-purple-100 rounded-lg py-5 px-6 mb-4 text-base text-purple-700"
              v-if="userList == 0 || searchValue == 0 || dataList == 0"
              role="alert"
            >
              No Admin Here!
            </div>
            <table
              class="min-w-full"
              v-if="
                userList != 0 && current == 'admin'
                  ? searchValue != 0
                  : dataList != 0
              "
            >
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
                    Profile
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
                    Email
                  </th>

                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Joined At
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
                <tr class="border-b" v-for="(l, i) in dataList" :key="l">
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ l.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <img
                      :src="
                        l.profile_photo_path == null
                          ? l.profile_photo_url
                          : 'http://127.0.0.1:8000/storage/' +
                            l.profile_photo_path
                      "
                      alt=""
                      class="rounded-full object-cover border border-white object-center w-14 h-14 mt-2"
                    />
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ l.name }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ l.email }}
                  </td>

                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ formatDate(l.created_at) }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    v-if="$store.state.loginUserData.id != l.id"
                  >
                    <button
                      type="button"
                      class="inline-block mr-2 px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      @click="
                        removeFrom(
                          l.id,
                          current == 'user' ? 'admin' : 'user',
                          i
                        )
                      "
                    >
                      {{
                        current == "admin"
                          ? "Remove from Admin"
                          : "Set Up Admin"
                      }}
                    </button>
                    <button
                      type="button"
                      class="inline-block px-4 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                      @click="deleteUser(l.id, i)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserManage",
  props: {
    List: {},
    current: "",
  },
  computed: {
    dataList() {
      if (this.searchStatus) {
        return this.searchValue;
      }
      return this.List;
    },
  },
  data() {
    return {
      userList: this.List,
      searchKey: "",
      searchStatus: false,
      searchValue: {},
    };
  },
  methods: {
    formatDate(dbDate) {
      let getDate = new Date(dbDate);
      let year = getDate.getFullYear();
      let month = getDate.getMonth();
      let day = getDate.getDay();
      let formatDate = `${day}-${month}-${year}`;
      return formatDate;
    },
    deleteUser(id, index) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .post(
                "http://127.0.0.1:8000/api/delete/admin",
                { id: id },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.$store.state.userToken}`,
                  },
                }
              )
              .then((res) => {
                if (res.data.success) {
                  this.List.splice(index, 1);
                  Toast.fire({
                    icon: "success",
                    title: "Deleted successfully",
                  });
                }
              });
          }
        });
    },
    removeFrom(id, role, index) {
      axios
        .post(
          "http://127.0.0.1:8000/api/remove/admin",
          { role: role, id: id },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$store.state.userToken}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            this.List.splice(index, 1);
            Toast.fire({
              icon: "success",
              title:
                this.current == "admin"
                  ? "Removed  successfully"
                  : "Set Up SuccessFully",
            });
          }
        });
    },
    search(c) {
      let link =
        c == "admin"
          ? "http://127.0.0.1:8000/api/get/admin/list"
          : "http://127.0.0.1:8000/api/get/user/list";

      this.searchAdmin(link, c);
    },
    searchAdmin(l, c) {
      axios
        .get(l, {
          params: { searchKey: this.searchKey },
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            if (c == "admin") {
              this.searchStatus = true;
              this.searchValue = res.data.adminList;
            } else {
              this.$emit("search", res.data);
            }
          }
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
