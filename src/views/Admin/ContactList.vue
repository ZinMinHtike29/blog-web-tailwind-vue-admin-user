<template>
  <Master>
    <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
      <div class="w-full relative">
        <Loader v-if="fetchStatus"></Loader>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-x-auto" v-if="!fetchStatus">
              <h1 class="my-3 font-bold text-3xl">Contact List</h1>
              <div
                class="bg-purple-100 rounded-lg py-5 px-6 mb-4 text-base text-purple-700"
                role="alert"
                v-if="ContactList.length == 0"
              >
                No Contact Here!
              </div>

              <table class="min-w-full" v-if="ContactList.length > 0">
                <thead class="border-b">
                  <tr>
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
                      Message
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Time
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
                  <tr class="border-b" v-for="c in ContactList" :key="c">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ c.name }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ c.email }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ c.message.slice(0, 30) }}..
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ c.date }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <button
                        type="button"
                        class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        @click="$router.push(`/admin/contact/details/${c.id}`)"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <pagination
                :links="pagLinks"
                @data="getEmitData"
                v-if="ContactList.length != 0"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import Pagination from "@/components/Pagination.vue";
import Loader from "@/components/loader.vue";
import axios from "axios";

export default {
  name: "ContactList",
  components: {
    Master,
    Pagination,
    Loader,
  },
  data() {
    return {
      fetchStatus: false,
      ContactList: [],
      pagLinks: [],
    };
  },
  methods: {
    getContactList() {
      this.fetchStatus = true;
      axios
        .get("http://127.0.0.1:8000/api/get/contact", {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          this.ContactList = res.data.contact.data;
          this.pagLinks = res.data.contact.links;
          this.fetchStatus = false;
          console.log(this.ContactList);
        });
    },
    getEmitData(e) {
      this.categoryList = e.contact.data;
      this.pagLinks = e.contact.links;
    },
  },
  mounted() {
    this.getContactList();
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="scss" scoped></style>
