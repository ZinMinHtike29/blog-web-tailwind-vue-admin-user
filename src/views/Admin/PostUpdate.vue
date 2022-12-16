<template>
  <master>
    <div class="block p-6 rounded-lg shadow-lg bg-white">
      <div class="w-full relative">
        <Loader v-if="postFetchStatus"></Loader>
      </div>
      <div class="md:flex items-start" v-if="!postFetchStatus">
        <ul
          class="nav nav-pills flex md:flex-col whitespace-nowrap sm:justify-center flex-wrap list-none pl-0 mr-4"
          id="pills-tabVertical"
          role="tablist"
        >
          <li class="nav-item flex-grow text-center mb-2" role="presentation">
            <a
              href="#pills-homeVertical"
              class="nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 focus:outline-none focus:ring-0 active"
              id="pills-home-tabVertical"
              data-bs-toggle="pill"
              data-bs-target="#pills-homeVertical"
              role="tab"
              aria-controls="pills-homeVertical"
              aria-selected="true"
              >Details</a
            >
          </li>
          <li class="nav-item flex-grow text-center mb-2" role="presentation">
            <a
              href="#pills-profileVertical"
              class="nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 focus:outline-none focus:ring-0"
              id="pills-profile-tabVertical"
              data-bs-toggle="pill"
              data-bs-target="#pills-profileVertical"
              role="tab"
              aria-controls="pills-profileVertical"
              aria-selected="false"
              >Update Post</a
            >
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContentVertical">
          <div
            class="tab-pane fade show active"
            id="pills-homeVertical"
            role="tabpanel"
            aria-labelledby="pills-home-tabVertical"
          >
            <div class="">
              <div class="">
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
                        :src="
                          'http://127.0.0.1:8000/storage/' + image.image_path
                        "
                        class="block h-80 object-cover w-[800px]"
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
              </div>
              <div class="my-4">
                <div class="">
                  <h1 class="text-2xl font-bold">
                    {{ post.title }}
                    <span v-if="post.category != null"
                      >({{ post.category.title }})</span
                    >
                  </h1>
                </div>
                <small class="text-muted">{{ post.date }}</small>
                <div class="">
                  <p>{{ post.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-profileVertical"
            role="tabpanel"
            aria-labelledby="pills-profile-tabVertical"
          >
            <div class="w-full md:grid grid-cols-5 md:w-[800px]">
              <div class="col-span-2">
                <div class="" v-for="(image, i) in post.images" :key="image">
                  <update-image
                    :image_path="image.image_path"
                    :index="i"
                    @emitData="updateImage"
                    :imageId="image.id"
                  ></update-image>
                </div>
              </div>
              <div class="col-span-3 ml-3">
                <h1 class="font-bold text-lg">Update Post</h1>

                <div class="my-3 w-full">
                  <input
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Enter Category Title"
                    v-model="updateData.title"
                  />
                  <small class="text-red-500" v-if="validateData.title"
                    >Post Title Is Required....</small
                  >
                </div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Post Description</label
                  >
                  <textarea
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlTextarea1"
                    v-model="updateData.description"
                    rows="6"
                    placeholder="Post Description"
                  ></textarea>
                  <small class="text-red-500" v-if="validateData.description"
                    >Post Description Is Required....</small
                  >
                </div>

                <div class="">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Choose Category</label
                  >
                  <div class="">
                    <div
                      class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                      role="status"
                      v-if="categoryFetctStatus"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div class="flex flex-wrap" v-if="!categoryFetctStatus">
                    <div
                      class="form-check border border-sky-400 px-3 py-1 mr-2 mb-2 rounded-sm"
                      v-for="c in categoryList"
                      :key="c"
                    >
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        :value="c.id"
                        :checked="c.id == post.category_id"
                        name="flexRadioDefault"
                        :id="c.id"
                        v-model="updateData.categoryId"
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        :for="c.id"
                      >
                        {{ c.title }}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="text-end">
                  <button
                    type="button"
                    class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                    @click="updatePost"
                    :disabled="updateStatus"
                  >
                    <div
                      class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                      role="status"
                      v-if="updateStatus"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <span v-if="updateStatus">Loading</span>
                    <span v-if="!updateStatus">Update Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import axios from "axios";
import Loader from "@/components/loader.vue";
import UpdateImage from "@/components/Admin/updateImage.vue";

export default {
  name: "PostUpdate",
  components: {
    Master,
    Loader,
    UpdateImage,
  },
  data() {
    return {
      post: {},
      postFetchStatus: false,
      categoryList: [],
      categoryFetctStatus: false,
      updateStatus: false,
      updateData: {
        title: "",
        description: "",
        categoryId: "",
      },
      validateData: {
        title: false,
        description: false,
      },
    };
  },
  methods: {
    getPost() {
      this.postFetchStatus = true;
      axios
        .get("http://127.0.0.1:8000/api/get/post", {
          params: { id: this.$route.params.id },
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.post = res.data.post;
            this.updateData.title = res.data.post.title;
            this.updateData.description = res.data.post.description;
            this.updateData.categoryId = res.data.post.category_id;
            this.postFetchStatus = false;
          }
        });
    },
    updateImage(e) {
      axios
        .post("http://127.0.0.1:8000/api/update/image", e, {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.post.images[e.index] = res.data.updateImage;
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message != null) {
            Toast.fire({
              icon: "error",
              title: " The image must be a file of type: jpg, png, jpeg, webp.",
            });
          }
        });
    },
    getAllCategory() {
      this.categoryFetctStatus = true;
      axios
        .get("http://127.0.0.1:8000/api/get/all/category", {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          this.categoryList = res.data.category;
          this.categoryFetctStatus = false;
        });
    },
    updatePost() {
      this.validateUpdateData();
      if (!this.validateData.title && !this.validateData.description) {
        this.updateStatus = true;
        let data = { id: this.post.id, ...this.updateData };
        axios
          .post("http://127.0.0.1:8000/api/update/post", data, {
            headers: {
              Authorization: `Bearer ${this.$store.state.userToken}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.updateStatus = false;
              Toast.fire({
                icon: "success",
                title: " Post Update Success..",
              });
              this.post = res.data.updatePost;
            }
          });
      }
    },
    validateUpdateData() {
      this.validateData.title = this.updateData.title == "" ? true : false;
      this.validateData.description =
        this.updateData.description == "" ? true : false;
    },
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.getPost();
    this.getAllCategory();
  },
};
</script>

<style lang="scss" scoped></style>
