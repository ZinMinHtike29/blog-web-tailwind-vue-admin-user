<template>
  <div>
    <div class="font-Nunito box-border bg-sky-200 dark:bg-sky-800">
      <Navbar></Navbar>
      <slot></slot>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/User/Navbar.vue";
import Footer from "@/components/User/Footer.vue";
import axios from "axios";
export default {
  name: "Master",
  components: {
    Navbar,
    Footer,
  },
  methods: {
    addWebVisitCount() {
      axios.get("http://127.0.0.1:8000/api/add/website/view/count");
    },
  },
  mounted() {
    this.addWebVisitCount();
  },
};
</script>

<style lang="scss" scoped></style>
