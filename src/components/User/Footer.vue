<template>
  <!-- Footer Start  -->
  <footer class="mt-2 md:mt-3 bg-sky-100 dark:bg-sky-900 dark:text-white">
    <div class="container mx-auto p-4 md:p-5">
      <div class="grid md:grid-cols-3 gap-7">
        <div class=" ">
          <h1 class="uppercase font-serif text-center text-xl font-bold">
            <div>The</div>
            <div>Guardian</div>
          </h1>
          <h2 class="text-center font-semibold my-2 text-lg">Follow In</h2>
          <div class="flex gap-4 justify-center mt-3">
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
          </div>
        </div>
        <div class="">
          <h1 class="uppercase font-serif text-center text-xl font-bold">
            News In Category
          </h1>
          <div
            class="flex gap-4 flex-col text-center justify-center mt-3 underline underline-offset-2"
          >
            <div class=" " @click="$router.push('/')">Home</div>
            <div
              class=" "
              @click="$router.push(`/filter/news/category=${c.id}`)"
              v-for="c in categoryList"
              :key="c"
            >
              {{ c.title }}
            </div>
          </div>
        </div>
        <div class=" ">
          <h1 class="uppercase font-serif text-center text-xl font-bold">
            Useful Link
          </h1>
          <div class="flex gap-4 justify-center mt-3">
            <div
              class="flex gap-4 flex-col text-center justify-center mt-3 underline underline-offset-2"
            >
              <div class="text-red-400">
                <i class="fa-solid fa-xmark"></i>Subscription
              </div>
              <div class=" " @click="$router.push('/contact')">Contact US</div>
              <div class="text-red-400">
                <i class="fa-solid fa-xmark"></i>Help
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer End -->
</template>

<script>
import axios from "axios";
export default {
  name: "Footer",
  data() {
    return {
      categoryList: "",
    };
  },
  methods: {
    getAllCategory() {
      axios.get("http://127.0.0.1:8000/api/get/all/category").then((res) => {
        this.categoryList = res.data.category;
      });
    },
  },
  mounted() {
    this.getAllCategory();
  },
};
</script>

<style lang="stylus" scoped></style>
