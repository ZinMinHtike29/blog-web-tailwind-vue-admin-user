<template>
  <Master>
    <div class="min-h-screen">
      <div
        class="container bg-sky-100 mx-auto p-4 md:p-5 dark:bg-sky-900 dark:text-white"
      >
        <div class="flex justify-between text-2xl">
          <div class="">
            <i class="fa-solid fa-arrow-left-long" onclick="history.back()"></i>
          </div>
          <div class="">
            <span class="mr-2">
              <i class="fa-solid fa-eye"></i>{{ postCount }}
            </span>
            <i class="fa-solid fa-bookmark" v-if="isSaved"></i>
            <i
              class="fa-regular fa-bookmark"
              @click="savePost"
              v-if="!isSaved"
            ></i>
          </div>
        </div>
        <div class="w-full relative">
          <Loader v-if="fetchStatus"></Loader>
        </div>
        <div class="" v-if="!fetchStatus">
          <div class="my-3">
            <h1 class="font-bold text-3xl">{{ post.title }}</h1>
            <small>{{ post.date }}</small>
          </div>
          <div class="">
            <div class="relative">
              <div
                id="carouselExampleControls"
                class="carousel slide relative w-full"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner relative w-full overflow-hidden">
                  <div
                    class="carousel-item relative float-left w-full"
                    v-for="(image, i) in post.images"
                    :class="i == 0 ? 'active' : ''"
                    :key="image"
                  >
                    <img
                      :src="'http://127.0.0.1:8000/storage/' + image.image_path"
                      class="block object-cover min-w-full h-96"
                      alt="Wild Landscape"
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon inline-block bg-no-repeat"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon inline-block bg-no-repeat"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div class="text-end absolute left-5 top-3">
                <span
                  v-if="post.category != null"
                  class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
                  >{{ post.category.title }}</span
                >
              </div>
            </div>
          </div>

          <p>{{ post.description }}</p>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/User/layout/Master.vue";
import axios from "axios";
import Loader from "@/components/loader.vue";
export default {
  name: "NewsDetails",
  components: {
    Master,
    Loader,
  },
  data() {
    return {
      post: {},
      fetchStatus: false,
      isSaved: false,
      postCount: "",
    };
  },
  methods: {
    getPostData() {
      this.fetchStatus = true;
      axios
        .post("http://127.0.0.1:8000/api/get/onepost", {
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.data.success) {
            this.fetchStatus = false;
            this.post = res.data.post;
          }
        });
    },
    savePost() {
      if (this.$store.state.loginUserData) {
        let data = {
          user_id: this.$store.state.loginUserData.id,
          post_id: this.$route.params.id,
        };
        axios
          .post("http://127.0.0.1:8000/api/user/save/post", data, {
            headers: {
              Authorization: `Bearer ${this.$store.state.userToken}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.$store.dispatch("addPostCount");
              this.isSaved = true;
            }
          });
      } else {
        this.$swal
          .fire({
            title: "You Need To Login",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Go To Login Page",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/login");
            }
          });
      }
    },
    checkIsSave() {
      if (this.$store.state.loginUserData != null) {
        let data = {
          postId: this.$route.params.id,
        };
        axios
          .post("http://127.0.0.1:8000/api/user/check/isSave", data, {
            headers: {
              Authorization: `Bearer ${this.$store.state.userToken}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.isSaved = res.data.isSaved != null ? true : false;
            }
          });
      }
    },
    addPostCount() {
      let data = {
        postId: this.$route.params.id,
      };
      axios
        .post("http://127.0.0.1:8000/api/add/postviewcount", data)
        .then((res) => {
          this.postCount = res.data.count;
        });
    },
  },
  mounted() {
    this.getPostData();
    document.title = this.$route.meta.title;
    this.checkIsSave();
    this.addPostCount();
  },
};
</script>

<style lang="scss" scoped></style>
