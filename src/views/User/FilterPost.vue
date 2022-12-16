<template>
  <Master>
    <div class="min-h-screen">
      <div
        class="container bg-sky-100 mx-auto p-4 md:p-5 dark:bg-sky-900 dark:text-white"
      >
        <div class="mb-3">
          <i
            class="fa-solid fa-arrow-left-long fa-2x"
            onclick="history.back()"
          ></i>
        </div>
        <h1 class="font-bold text-2xl">Filtered News</h1>
        <div class="w-full relative">
          <Loader v-if="fetchStatus"></Loader>
        </div>
        <div class="" v-if="postList.length == 0 && !fetchStatus">
          <div
            class="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700"
            role="alert"
          >
            No Post Here !
          </div>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-3">
          <div class="shadow-lg rounded-md" v-for="l in postList" :key="l">
            <div class="">
              <img
                class="aspect-video object-cover object-top rounded-t-md w-full"
                :src="'http://127.0.0.1:8000/storage/' + l.images[0].image_path"
                alt=""
              />
            </div>
            <div class="mt-3 px-3 pb-2">
              <h1 class="font-bold text-2xl mb-2">
                {{ l.title }}
              </h1>
              <small>{{ l.date }} | {{ l.category.title }}</small>
              <p class="md:min-h-[150px] mt-2">
                {{ l.description.slice(0, 260) }}...
              </p>
              <div
                class="mt-2 flex items-center justify-end text-sky-600 dark:text-sky-50"
              >
                <span @click="$router.push(`/news/details/${l.id}`)">
                  <span>See more</span
                  ><i class="fa-solid fa-arrow-right-long ml-2"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <pagination
          class="my-3"
          :links="pagLinks"
          @data="getEmitData"
          v-if="postList.length != 0"
        ></pagination>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/User/layout/Master.vue";
import Loader from "@/components/loader.vue";
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "FilterPost",
  components: {
    Master,
    Loader,
    Pagination,
  },
  data() {
    return {
      fetchStatus: false,
      postList: [],
      pagLinks: [],
    };
  },
  methods: {
    getAllpost() {
      this.fetchStatus = true;
      axios
        .get("http://127.0.0.1:8000/api/user/get/all/post", {
          params: { categoryId: this.$route.params.id },
        })
        .then((res) => {
          if (res.data.success) {
            this.fetchStatus = false;
            this.postList = res.data.post.data;
            this.pagLinks = res.data.post.links;
          }
        });
    },
    getEmitData(e) {
      this.postList = e.post.data;
      this.pagLinks = e.post.links;
    },
  },
  mounted() {
    this.getAllpost();
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="scss" scoped></style>
