<template>
  <router-view />
</template>
<script>
import { useAttrs } from "@vue/runtime-core";
import axios from "axios";
export default {
  name: "App",
  methods: {
    setToast() {
      window.Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
    },
    setLoginData() {
      let token = localStorage.getItem("loginToken");
      let userData = localStorage.getItem("userData");
      if (token != null && userData != null) {
        userData = JSON.parse(userData);
        this.$store.dispatch("setUserData", userData);
        this.$store.dispatch("setToken", token);
        if (userData.role == "admin") {
          this.$router.push("/admin/home");
        } else {
          this.$router.push("/");
        }
      }
    },
  },

  mounted() {
    this.setToast();
    this.setLoginData();
  },
};
</script>
<style lang="scss"></style>
