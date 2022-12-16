<template>
  <Master>
    <div
      class="container bg-sky-100 mx-auto p-4 md:p-5 dark:bg-sky-900 dark:text-white min-h-screen"
    >
      <div class="flex flex-col items-center">
        <div class="mb-3 w-full xl:w-96">
          <input
            type="text"
            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput1"
            @keyup="search"
            v-model="searchKey"
            placeholder="Search Post Here"
          />
        </div>
        <div
          class="w-full xl:w-96 bg-sky-200 dark:bg-sky-700 p-3"
          v-if="postList.length != 0"
        >
          <div
            class="grid grid-cols-3 border-2 mb-2"
            v-for="p in postList"
            :key="p"
          >
            <div class="col-span-1">
              <img
                class="object-cover object-top w-full h-full"
                :src="'http://127.0.0.1:8000/storage/' + p.images[0].image_path"
                alt=""
              />
            </div>
            <div class="col-span-2 ml-2">
              <h1
                class="font-bold underline"
                @click="$router.push(`/news/details/${p.id}`)"
              >
                {{ p.title }}
              </h1>
              <p>{{ p.description.slice(0, 75) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/User/layout/Master.vue";
import axios from "axios";
export default {
  name: "SearchPage",
  components: {
    Master,
  },
  data() {
    return {
      searchKey: "",
      postList: [],
    };
  },
  methods: {
    search() {
      axios
        .get("http://127.0.0.1:8000/api/user/search/post", {
          params: { searchKey: this.searchKey },
        })
        .then((res) => {
          if (res.data.success) {
            this.postList = res.data.post;
          }
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
