<template>
  <div
    class="md:col-span-1 z-50 bg-sky-100 p-2 md:p-3 shadow min-h-screen fixed md:static transition-all duration-300 ease-in-out -left-full"
    id="sideBar"
  >
    <div class="my-3 text-end text-red-400 md:hidden">
      <i class="fa-solid fa-xmark fa-2x" @click="hideSideBar"></i>
    </div>

    <h1 class="uppercase mt-3 mb-8 text-xl font-extrabold">
      The Guardian Admin
    </h1>
    <div
      class="flex w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      v-if="loginUserData != null"
      @click="$router.push('/admin/profile')"
    >
      <div class="mr-3">
        <img
          :src="
            loginUserData.profile_photo_path == null
              ? loginUserData.profile_photo_url
              : 'http://127.0.0.1:8000/storage/' +
                loginUserData.profile_photo_path
          "
          alt=""
          class="w-11 h-11 rounded-full object-cover object-center"
        />
      </div>
      <div class="flex flex-col">
        <div class="col-span-4 text-sky-800 font-bold">
          {{ loginUserData.name }}
        </div>
        <small class="text-slate-400">View & Edit Profile</small>
      </div>
    </div>
    <div
      class="flex flex-col justify-center items-center uppercase font-semibold"
    >
      <div
        class="grid grid-cols-5 w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      >
        <div class="col-span-1">
          <i class="fa-regular fa-rectangle-list text-sky-500"></i>
        </div>
        <div
          class="col-span-4 text-sky-800"
          @click="$router.push('/admin/home')"
        >
          Dashboard
        </div>
      </div>
      <div
        class="grid grid-cols-5 w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      >
        <div class="col-span-1">
          <i class="fa-solid fa-users-gear text-sky-500"> </i>
        </div>
        <div
          class="col-span-4 text-sky-800"
          @click="$router.push('/admin/list')"
        >
          Admin List
        </div>
      </div>
      <div
        class="grid grid-cols-5 w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      >
        <div class="col-span-1">
          <i class="fa-solid fa-users text-sky-500"></i>
        </div>
        <div
          class="col-span-4 text-sky-800"
          @click="$router.push('/admin/userlist')"
        >
          User List
        </div>
      </div>
      <div
        class="grid grid-cols-5 w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      >
        <div class="col-span-1">
          <i class="fa-solid fa-clipboard text-sky-500"></i>
        </div>
        <div
          class="col-span-4 text-sky-800"
          @click="$router.push('/admin/category')"
        >
          Category
        </div>
      </div>
      <div
        class="grid grid-cols-5 w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      >
        <div class="col-span-1">
          <i class="fa-regular fa-newspaper text-sky-500"></i>
        </div>
        <div
          class="col-span-4 text-sky-800"
          @click="$router.push('/admin/post')"
        >
          Post
        </div>
      </div>
      <div
        class="grid grid-cols-5 w-full py-2 px-3 border rounded-lg shadow-lg border-sky-500 my-2"
      >
        <div class="col-span-1">
          <i class="fa-solid fa-envelope text-sky-500"></i>
        </div>
        <div
          class="col-span-4 text-sky-800"
          @click="$router.push('/admin/contact')"
        >
          Contact List
        </div>
      </div>

      <div
        v-if="loginUserData != null"
        class="w-full py-2 px-3 border rounded-lg shadow-lg my-2 bg-red-500 text-center text-white"
      >
        <span class="mt-3" @click="logout"
          >Log Out <i class="fa-solid fa-right-to-bracket ml-1"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "sideBar",
  computed: {
    ...mapState(["loginUserData"]),
  },
  methods: {
    hideSideBar() {
      const sideBar = document.getElementById("sideBar");
      sideBar.classList.add("-left-full");
      sideBar.classList.remove("left-0");
    },
    logout() {
      this.$store.dispatch("deleteLoginData");
      localStorage.removeItem("loginToken");
      localStorage.removeItem("userData");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="stylus" scoped></style>
