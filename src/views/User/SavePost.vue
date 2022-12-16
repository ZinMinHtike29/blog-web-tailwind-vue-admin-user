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
        <h1 class="font-bold text-2xl">Save Post</h1>
        <div class="w-full relative">
          <Loader v-if="fetchStatus"></Loader>
        </div>
        <div
          class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full"
          role="alert"
          v-if="this.postList.length == 0 && !this.fetchStatus"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times-circle"
            class="w-4 h-4 mr-2 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
            ></path>
          </svg>
          No Save Post Here
        </div>
        <div class="grid md:grid-cols-3 gap-10 mt-3">
          <div
            class="shadow-lg rounded-md relative"
            v-for="(l, i) in postList"
            :key="l"
          >
            <div class="">
              <img
                class="aspect-video object-cover object-top rounded-t-md w-full"
                :src="
                  'http://127.0.0.1:8000/storage/' +
                  l.posts.images[0].image_path
                "
                alt=""
              />
            </div>
            <div class="mt-3 px-3 pb-2">
              <h1 class="font-bold text-2xl mb-2">
                {{ l.posts.title }}
              </h1>
              <small>{{ l.posts.date }} | {{ l.posts.category.title }}</small>
              <p class="md:min-h-[150px] mt-2">
                {{ l.posts.description.slice(0, 260) }}...
              </p>
              <div
                class="mt-2 flex items-center justify-end text-sky-600 dark:text-sky-50"
              >
                <span @click="$router.push(`/news/details/${l.posts.id}`)">
                  <span>See more</span
                  ><i class="fa-solid fa-arrow-right-long ml-2"></i>
                </span>
              </div>
            </div>
            <div class="absolute right-5 top-3">
              <span
                class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full"
                @click="remove(l.post_id, i)"
                >Remove</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/User/layout/Master.vue";
import Loader from "@/components/loader.vue";
import axios from "axios";
export default {
  name: "ViewAll",
  components: {
    Master,
    Loader,
  },
  data() {
    return {
      fetchStatus: false,
      postList: [],
    };
  },
  methods: {
    getAllpost() {
      this.fetchStatus = true;
      axios
        .get("http://127.0.0.1:8000/api/user/get/savePost", {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.fetchStatus = false;
            this.postList = res.data.savePost;
          }
        });
    },
    remove(id, index) {
      let data = {
        postId: id,
      };
      axios
        .post("http://127.0.0.1:8000/api/user/delete/save/post", data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            Toast.fire({
              icon: "success",
              title: "Delete Success",
            });
            this.postList.splice(index, 1);
            this.$store.dispatch("reducePostCount");
          }
        });
    },
  },
  mounted() {
    this.getAllpost();
  },
};
</script>

<style lang="stylus" scoped></style>
